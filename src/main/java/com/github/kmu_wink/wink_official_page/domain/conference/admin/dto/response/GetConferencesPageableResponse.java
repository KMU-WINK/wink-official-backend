package com.github.kmu_wink.wink_official_page.domain.conference.admin.dto.response;

import com.github.kmu_wink.wink_official_page.domain.conference.schema.Conference;
import lombok.Builder;
import org.springframework.data.domain.Page;

@Builder
public record GetConferencesPageableResponse(

        Page<Conference> conferences
) {

}
