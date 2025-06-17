package com.github.kmu_wink.wink_official_page.domain.program.study.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public record GetCategoriesResponse(

        List<String> categories
) {

}
