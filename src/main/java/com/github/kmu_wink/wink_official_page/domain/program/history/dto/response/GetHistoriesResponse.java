package com.github.kmu_wink.wink_official_page.domain.program.history.dto.response;

import java.util.List;

import com.github.kmu_wink.wink_official_page.domain.program.history.schema.History;

import lombok.Builder;

@Builder
public record GetHistoriesResponse(

	List<History> histories
) {
}
