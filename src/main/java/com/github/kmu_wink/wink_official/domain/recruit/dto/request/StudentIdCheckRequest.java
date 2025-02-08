package com.github.kmu_wink.wink_official.domain.recruit.dto.request;

import com.github.kmu_wink.wink_official.common.validation.Validation;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record StudentIdCheckRequest(

        @NotBlank
        @Size(min=8, max=8, message = Validation.STUDENT_ID_MESSAGE)
        String studentId
) {
}
