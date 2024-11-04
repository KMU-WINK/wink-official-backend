package com.github.kmu_wink.wink_official.domain.custom.recruit_qna.schema;

import com.github.kmu_wink.wink_official.common.schema.BaseSchema;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class RecruitQna extends BaseSchema {

    String question;
    String answer;
}
