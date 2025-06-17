package com.github.kmu_wink.wink_official_page.domain.program.history.__admin__.dto.response;

import com.github.kmu_wink.wink_official_page.domain.program.history.schema.History;
import lombok.Builder;

@Builder
public record GetHistoryResponse(

        History history
) {

}
