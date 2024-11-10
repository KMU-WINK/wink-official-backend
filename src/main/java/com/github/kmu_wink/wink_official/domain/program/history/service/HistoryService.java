package com.github.kmu_wink.wink_official.domain.program.history.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.github.kmu_wink.wink_official.domain.program.history.dto.response.GetHistoriesResponse;
import com.github.kmu_wink.wink_official.domain.program.history.repository.HistoryRepository;
import com.github.kmu_wink.wink_official.domain.program.history.schema.History;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HistoryService {

	private final HistoryRepository historyRepository;

	public GetHistoriesResponse getHistories() {

		List<History> histories = historyRepository.findAllWithSort();

		return GetHistoriesResponse.builder()
			.histories(histories)
			.build();
	}
}
