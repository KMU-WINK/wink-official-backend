package com.github.kmu_wink.wink_official.domain.custom.recruit_qna.dto.response;

import com.github.kmu_wink.wink_official.domain.custom.recruit_qna.schema.RecruitQna;

import lombok.Builder;

@Builder
public record GetRecruitQnaResponse(

	RecruitQna qna
) {
}
