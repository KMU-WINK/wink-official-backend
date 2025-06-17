package com.github.kmu_wink.wink_official_page.domain.program.history.__admin__.service;

import com.github.kmu_wink.wink_official_page.domain.program.history.__admin__.dto.request.CreateHistoryRequest;
import com.github.kmu_wink.wink_official_page.domain.program.history.__admin__.dto.response.GetHistoryResponse;
import com.github.kmu_wink.wink_official_page.domain.program.history.__admin__.exception.HistoryAdminExceptionCode;
import com.github.kmu_wink.wink_official_page.domain.program.history.repository.HistoryRepository;
import com.github.kmu_wink.wink_official_page.domain.program.history.schema.History;
import com.github.kmu_wink.wink_official_page.global.infra.s3.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AdminHistoryService {

    private final HistoryRepository historyRepository;

    private final S3Service s3Service;

    public GetHistoryResponse createHistory(CreateHistoryRequest dto) {

        History history = History.builder().title(dto.title()).image(dto.image()).date(dto.date()).build();

        history = historyRepository.save(history);

        return GetHistoryResponse.builder().history(history).build();
    }

    public GetHistoryResponse updateHistory(String id, CreateHistoryRequest dto) {

        History history = historyRepository.findById(id).orElseThrow(HistoryAdminExceptionCode.NOT_FOUND::toException);

        history.setTitle(dto.title());
        history.setImage(dto.image());
        history.setDate(dto.date());
        history = historyRepository.save(history);

        return GetHistoryResponse.builder().history(history).build();
    }

    public void deleteHistory(String id) {

        History history = historyRepository.findById(id).orElseThrow(HistoryAdminExceptionCode.NOT_FOUND::toException);

        if (Objects.nonNull(history.getImage())) {
            s3Service.urlToKey(history.getImage()).ifPresent(s3Service::delete);
        }

        historyRepository.delete(history);
    }
}
