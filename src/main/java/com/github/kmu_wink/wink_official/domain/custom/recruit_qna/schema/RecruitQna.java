package com.github.kmu_wink.wink_official.domain.custom.recruit_qna.schema;

import org.springframework.data.mongodb.core.mapping.Document;

import com.github.kmu_wink.wink_official.common.database.mongo.schema.BaseSchema;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document
public class RecruitQna extends BaseSchema {

    String question;
    String answer;
}
