package com.github.kmu_wink.wink_official.domain.program.history.dto.response;

import org.springframework.data.domain.Page;

import com.github.kmu_wink.wink_official.domain.program.history.schema.History;

import lombok.Builder;

@Builder
public record GetHistoriesPageableResponse(

	Page<History> histories
) {
}
