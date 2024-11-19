package com.github.kmu_wink.wink_official.domain.program.history.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Service;

import com.github.kmu_wink.wink_official.domain.program.history.dto.request.CreateHistoryRequest;
import com.github.kmu_wink.wink_official.domain.program.history.dto.response.GetHistoryResponse;
import com.github.kmu_wink.wink_official.domain.program.history.exception.HistoryNotFoundException;
import com.github.kmu_wink.wink_official.domain.program.history.repository.HistoryRepository;
import com.github.kmu_wink.wink_official.domain.program.history.schema.History;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminHistoryService {

	private final HistoryRepository historyRepository;

	private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

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

		historyRepository.delete(history);
	}
}
