package com.github.kmu_wink.wink_official_page.domain.program.study.dto.response;

import com.github.kmu_wink.wink_official_page.domain.program.study.schema.Study;
import lombok.Builder;
import org.springframework.data.domain.Page;

@Builder
public record GetStudiesResponse(

        Page<Study> studies
) {

}
