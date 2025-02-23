package com.github.kmu_wink.wink_official.domain.survey.schema;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import com.github.kmu_wink.wink_official.common.database.mongo.BaseSchema;
import com.github.kmu_wink.wink_official.domain.survey.admin.dto.request.CreateSurveyRequest;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document
public class Survey extends BaseSchema {

    String title;
    String description;

    LocalDate start;
    LocalDate end;

    List<CreateSurveyRequest.FormItem> items;
}
