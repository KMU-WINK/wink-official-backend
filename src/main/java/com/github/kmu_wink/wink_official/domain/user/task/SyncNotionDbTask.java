package com.github.kmu_wink.wink_official.domain.user.task;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RestController;

import com.github.kmu_wink.wink_official.common.property.NotionProperty;
import com.github.kmu_wink.wink_official.domain.user.dto.internal.NotionDbUser;
import com.github.kmu_wink.wink_official.domain.user.repository.UserRepository;
import com.github.kmu_wink.wink_official.domain.user.schema.User;

import kong.unirest.core.HttpResponse;
import kong.unirest.core.JsonNode;
import kong.unirest.core.Unirest;
import kong.unirest.core.UnirestInstance;
import kong.unirest.core.json.JSONObject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
@RestController
public class SyncNotionDbTask {

	private final NotionProperty notionProperty;

	private final UserRepository userRepository;

	@Scheduled(fixedDelay = 1000 * 60 * 5)
	private void run() {

		getNotionDb().ifPresent(notionDbUsers -> {

			Map<String, User> userMap = userRepository.findAll().stream()
				.collect(Collectors.toMap(User::getId, Function.identity()));

			Set<String> notionSet = notionDbUsers.stream()
				.map(NotionDbUser::id)
				.collect(Collectors.toSet());

			notionDbUsers.stream()
				.filter(x -> !userMap.containsKey(x.id()))
				.forEach(this::deletePage);

			notionDbUsers.stream()
				.filter(x -> userMap.containsKey(x.id()))
				.filter(x -> checkPageIsDiffer(x, userMap.get(x.id())))
				.filter(this::checkUpdatedTime)
				.forEach(x -> updatePage(x, userMap.get(x.id())));

			userMap.entrySet().stream()
				.filter(x -> !notionSet.contains(x.getKey()))
				.map(Map.Entry::getValue)
				.forEach(this::createPage);
		});
	}

	public void manual(User user) {

		getNotionDb()
			.flatMap(notionDbUsers -> notionDbUsers.stream()
				.filter(x -> x.id().equals(user.getId()))
				.findFirst()
			)
			.ifPresent(notionDbUser -> updatePage(notionDbUser, user));
	}

	private void setUnirestHeader(UnirestInstance instance) {

		instance.config()
			.addDefaultHeader("Authorization", "Bearer %s".formatted(notionProperty.getSecret()))
			.addDefaultHeader("Notion-Version", "2022-06-28")
			.addDefaultHeader("Content-Type", "application/json");
	}

	private Optional<List<NotionDbUser>> getNotionDb() {

		try (UnirestInstance instance = Unirest.spawnInstance()) {

			setUnirestHeader(instance);

			String url = "https://api.notion.com/v1/databases/%s/query".formatted(notionProperty.getDatabaseId());
			HttpResponse<JsonNode> response = instance.post(url).asJson();

			if (!response.isSuccess()) return Optional.empty();

			//noinspection unchecked
			return Optional.of(((List<JSONObject>)(response.getBody()
				.getObject()
				.getJSONArray("results")
				.toList()))
				.stream()
				.filter(x -> !x.getBoolean("archived"))
				.map(NotionDbUser::from)
				.filter(Optional::isPresent)
				.map(Optional::get)
				.toList());
		}
	}

	private void createPage(User user) {

		try (UnirestInstance instance = Unirest.spawnInstance()) {

			setUnirestHeader(instance);

			instance.post("https://api.notion.com/v1/pages")
				.body(Map.ofEntries(
					Map.entry("parent", Map.of("database_id", notionProperty.getDatabaseId())),
					Map.entry("properties", Map.ofEntries(
						Map.entry("UUID", Map.of("rich_text", List.of(Map.of("text", Map.of("content", user.getId()))))),
						Map.entry("이름", Map.of("title", List.of(Map.of("text", Map.of("content", user.getName()))))),
						Map.entry("학번", Map.of("rich_text", List.of(Map.of("text", Map.of("content", user.getStudentId()))))),
						Map.entry("이메일", Map.of("rich_text", List.of(Map.of("text", Map.of("content", user.getEmail()))))),
						Map.entry("전화번호", Map.of("rich_text", List.of(Map.of("text", Map.of("content", user.getPhoneNumber()))))),
						Map.entry("역할", Map.of("select", Map.of("name", user.getRole().toKorean()))),
						Map.entry("회비 납부", Map.of("checkbox", user.isFee()))
					))
				))
				.asEmpty();

			log.info("Create user page. ({} {})", user.getStudentId(), user.getName());
		}
	}

	private void updatePage(NotionDbUser notionDbUser, User user) {

		try (UnirestInstance instance = Unirest.spawnInstance()) {

			setUnirestHeader(instance);

			String url = "https://api.notion.com/v1/pages/%s".formatted(notionDbUser.notion());
			instance.patch(url)
				.body(Map.of("properties", Map.ofEntries(
					Map.entry("이름", Map.of("title", List.of(Map.of("text", Map.of("content", user.getName()))))),
					Map.entry("학번", Map.of("rich_text", List.of(Map.of("text", Map.of("content", user.getStudentId()))))),
					Map.entry("이메일", Map.of("rich_text", List.of(Map.of("text", Map.of("content", user.getEmail()))))),
					Map.entry("전화번호", Map.of("rich_text", List.of(Map.of("text", Map.of("content", user.getPhoneNumber()))))),
					Map.entry("역할", Map.of("select", Map.of("name", user.getRole().toKorean()))),
					Map.entry("회비 납부", Map.of("checkbox", user.isFee()))
				)))
				.asEmpty();

			log.info("Update user page. ({} {})", user.getStudentId(), user.getName());
		}
	}

	private boolean checkPageIsDiffer(NotionDbUser notionDbUser, User user) {

		return !user.getName().equals(notionDbUser.name())
			|| !user.getStudentId().equals(notionDbUser.studentId())
			|| !user.getEmail().equals(notionDbUser.email())
			|| !user.getPhoneNumber().equals(notionDbUser.phoneNumber())
			|| !user.getRole().equals(notionDbUser.role())
			|| user.isFee() != notionDbUser.fee();
	}

	private boolean checkUpdatedTime(NotionDbUser notionDbUser) {

		LocalDateTime updatedAt = notionDbUser.updatedAt();
		LocalDateTime now = LocalDateTime.now();

		Duration duration = Duration.between(updatedAt, now);

		return duration.getSeconds() > 90;
	}

	private void deletePage(NotionDbUser notionDbUser) {

		try (UnirestInstance instance = Unirest.spawnInstance()) {

			setUnirestHeader(instance);

			String url = "https://api.notion.com/v1/pages/%s".formatted(notionDbUser.notion());
			instance.patch(url).body(Map.ofEntries(Map.entry("archived", true))).asEmpty();

			log.info("Delete user page. ({})", notionDbUser.notion());
		}
	}
}
