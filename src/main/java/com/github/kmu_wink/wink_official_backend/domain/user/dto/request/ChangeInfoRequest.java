package com.github.kmu_wink.wink_official_backend.domain.user.dto.request;

import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;

public record ChangeInfoRequest(

        @Length(min = 1, max = 20)
        String description,

        @Pattern(regexp = "^[a-zA-Z\\d](?:[a-zA-Z\\d]|-(?=[a-zA-Z\\d])){0,38}$")
        String github,

        @Pattern(regexp = "^(?!.*\\.\\.)(?!.*\\.$)\\w[\\w.]{0,29}$")
        String instagram,

        @Pattern(regexp = "https?://(www\\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)")
        String blog
) {
}
