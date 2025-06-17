package com.github.kmu_wink.wink_official_page.domain.program.history.service;

import com.github.kmu_wink.wink_official_page.domain.program.history.dto.response.GetHistoriesResponse;
import com.github.kmu_wink.wink_official_page.domain.program.history.repository.HistoryRepository;
import com.github.kmu_wink.wink_official_page.domain.program.history.schema.History;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HistoryService {

    private final HistoryRepository historyRepository;

    public GetHistoriesResponse getHistories() {

        List<History> histories = historyRepository.findAllWithSort();

        return GetHistoriesResponse.builder().histories(histories).build();
    }
}
