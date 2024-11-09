package com.github.kmu_wink.wink_official.domain.custom.recruit_qna.dto.response;

import java.util.List;

import com.github.kmu_wink.wink_official.domain.custom.recruit_qna.schema.RecruitQna;

import lombok.Builder;

@Builder
public record GetRecruitQnasResponse(

	List<RecruitQna> qnas
) {
}
