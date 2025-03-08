package com.github.son_daehyeon.domain.auth.dto.request;

import com.github.son_daehyeon.common.validation.RegExp;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record RegisterRequest(

    @NotBlank
    @Email
    String email,

    @NotBlank
    @Pattern(regexp = RegExp.PASSWORD_EXPRESSION, message = RegExp.PASSWORD_MESSAGE)
    String password
) {
}
