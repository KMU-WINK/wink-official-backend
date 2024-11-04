package com.github.kmu_wink.wink_official.domain.custom.recruit_qna.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record CreateQnaRequest(

	@NotBlank
	String question,

	@NotBlank
	String answer
) {
}
