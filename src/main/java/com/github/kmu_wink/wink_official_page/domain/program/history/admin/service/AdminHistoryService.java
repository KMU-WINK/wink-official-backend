package com.github.kmu_wink.wink_official_page.domain.program.history.admin.service;

import com.github.kmu_wink.wink_official_page.domain.program.history.admin.dto.request.CreateHistoryRequest;
import com.github.kmu_wink.wink_official_page.domain.program.history.admin.dto.response.GetHistoryResponse;
import com.github.kmu_wink.wink_official_page.domain.program.history.admin.exception.HistoryNotFoundException;
import com.github.kmu_wink.wink_official_page.domain.program.history.repository.HistoryRepository;
import com.github.kmu_wink.wink_official_page.domain.program.history.schema.History;
import com.github.kmu_wink.wink_official_page.global.infra.s3.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AdminHistoryService {

	private final HistoryRepository historyRepository;

	private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	private final S3Service s3Service;

	public GetHistoryResponse createHistory(CreateHistoryRequest dto) {

		History history = History.builder()
			.title(dto.title())
			.image(dto.image())
			.date(LocalDate.parse(dto.date(), formatter))
			.build();

		history = historyRepository.save(history);

		return GetHistoryResponse.builder()
			.history(history)
			.build();
	}

	public GetHistoryResponse updateHistory(String id, CreateHistoryRequest dto) {

		History history = historyRepository.findById(id).orElseThrow(HistoryNotFoundException::new);

		history.setTitle(dto.title());
		history.setImage(dto.image());
		history.setDate(LocalDate.parse(dto.date(), formatter));
		history = historyRepository.save(history);

		return GetHistoryResponse.builder()
			.history(history)
			.build();
	}

	public void deleteHistory(String id) {

		History history = historyRepository.findById(id).orElseThrow(HistoryNotFoundException::new);

		if (Objects.nonNull(history.getImage())) {
			s3Service.urlToKey(history.getImage()).ifPresent(s3Service::deleteFile);
		}

		historyRepository.delete(history);
	}
}
