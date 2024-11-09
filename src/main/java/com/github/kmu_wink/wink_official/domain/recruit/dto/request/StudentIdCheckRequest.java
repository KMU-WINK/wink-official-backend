package com.github.kmu_wink.wink_official.domain.recruit.dto.request;

import org.hibernate.validator.constraints.Length;

import com.github.kmu_wink.wink_official.common.validation.Validation;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record StudentIdCheckRequest(

        @NotBlank
        @Length(min=8, max=8, message = Validation.STUDENT_ID_MESSAGE)
        String studentId
) {
}
