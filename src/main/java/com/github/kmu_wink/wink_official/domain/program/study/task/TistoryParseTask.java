package com.github.kmu_wink.wink_official.domain.program.study.task;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;
import java.util.Optional;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.github.kmu_wink.wink_official.domain.program.study.repository.StudyRepository;
import com.github.kmu_wink.wink_official.domain.program.study.schema.Study;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class TistoryParseTask {

	private final StudyRepository studyRepository;

	private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy. M. d. HH:mm");

	@PostConstruct
	@Scheduled(cron = "0 0 0 * * *")
	private void run() {

		int remoteLatestIndex = getRemoteLatestIndex();
		int localLatestIndex = getLocalLatestIndex();

		for (int index = localLatestIndex + 1; index <= remoteLatestIndex; ++index) {
			try {
				Document document = Jsoup.connect("https://cs-kookmin-club.tistory.com/" + index).get();

				Optional<String> optionalCategory = transferWinkCategory(document);
				if (optionalCategory.isEmpty()) continue;

				String title = text(document, "#content > div > div.hgroup > h1");
				String author = text(document, "#content > div > div.hgroup > div.post-meta > span.author");
				String _date = text(document, "#content > div > div.hgroup > div.post-meta > span.date");
				LocalDateTime date = LocalDateTime.parse(_date, formatter);
				String content = text(document, "#content > div > div.entry-content > div.tt_article_useless_p_margin.contents_style");
				Optional<String> image = firstImage(document, "#content > div > div.entry-content > div.tt_article_useless_p_margin.contents_style");
				content = content.replaceAll("[\\s\\n\\t]+", " ")
					.trim()
					.substring(0, Math.min(content.length(), 300));

				Study study = Study.builder()
					.createdAt(date)
					.updatedAt(date)
					.index(index)
					.category(optionalCategory.get())
					.title(title)
					.author(author)
					.content(content)
					.image(image.orElse(null))
					.build();

				studyRepository.save(study);

				log.info("New post saved. (index={}, title={})", index, title);
			} catch (IOException ignored) {
			}
		}
	}

	@SneakyThrows(IOException.class)
	private int getRemoteLatestIndex() {

		Document latestDocument = Jsoup.connect("https://cs-kookmin-club.tistory.com/category/WINK-%28Web%20%26%20App%29").get();
		Element latestElement = latestDocument.selectFirst("#content > div.inner > div:nth-child(1) > a");
		String latestUrl = Objects.requireNonNull(latestElement).attr("href");

		return Integer.parseInt(latestUrl.substring(latestUrl.lastIndexOf("/") + 1));
	}

	private int getLocalLatestIndex() {

		return studyRepository.findTopByOrderByIndexDesc()
			.orElseGet(() -> Study.builder().index(0).build())
			.getIndex();
	}

	private Optional<String> transferWinkCategory(Document document) {

		String category = Objects.requireNonNull(document.selectFirst("#content > div > div.hgroup > div.category")).text();
		if (!category.startsWith("WINK-(Web & App)/")) {
			return Optional.empty();
		}

		return Optional.of(category.substring("WINK-(Web & App)/".length()));
	}

	private String text(Document document, String selector) {
		return Objects.requireNonNull(document.selectFirst(selector)).text().trim();
	}

	private Optional<String> firstImage(Document document, String selector) {

		return Objects.requireNonNull(document.selectFirst(selector))
			.select("img")
			.stream()
			.map(element -> element.attr("src"))
			.filter(src -> !src.isBlank())
			.filter(src -> src.startsWith("http"))
			.findFirst();
	}
}