package com.github.kmu_wink.wink_official_page.domain.program.history.dto.response;

import com.github.kmu_wink.wink_official_page.domain.program.history.schema.History;
import lombok.Builder;

import java.util.List;

@Builder
public record GetHistoriesResponse(

        List<History> histories
) {

}
