package com.github.kmu_wink.wink_official_page.domain.conference.__admin__.dto.response;

import com.github.kmu_wink.wink_official_page.domain.conference.schema.Conference;
import lombok.Builder;

import java.util.List;

@Builder
public record GetConferencesResponse(

        List<Conference> conferences
) {

}
