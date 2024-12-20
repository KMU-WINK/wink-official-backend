package com.github.kmu_wink.wink_official.domain.program.study.dto.response;

import org.springframework.data.domain.Page;

import com.github.kmu_wink.wink_official.domain.program.study.schema.Study;

import lombok.Builder;

@Builder
public record GetStudiesResponse(

	Page<Study> studies
) {
}
