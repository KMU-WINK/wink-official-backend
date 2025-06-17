package com.github.kmu_wink.wink_official_page.domain.program.history.controller;

import com.github.kmu_wink.wink_official_page.domain.program.history.dto.response.GetHistoriesResponse;
import com.github.kmu_wink.wink_official_page.domain.program.history.service.HistoryService;
import com.github.kmu_wink.wink_official_page.global.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/program/history")
@RequiredArgsConstructor
@Tag(name = "[Program] [History] Index")
public class HistoryController {

    private final HistoryService historyService;

    @GetMapping
    @Operation(summary = "연혁 목록")
    public ApiResponse<GetHistoriesResponse> getHistories() {

        return ApiResponse.ok(historyService.getHistories());
    }
}
