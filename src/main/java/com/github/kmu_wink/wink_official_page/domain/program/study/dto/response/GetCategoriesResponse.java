package com.github.kmu_wink.wink_official_page.domain.program.study.dto.response;

import java.util.List;

import lombok.Builder;

@Builder
public record GetCategoriesResponse(

		List<String> categories
) {
}
