package com.github.kmu_wink.wink_official_page.domain.recruit.schema;

import com.github.kmu_wink.wink_official_page.global.infra.mongo.BaseSchema;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document
public class Recruit extends BaseSchema {

    int year;
    int semester;

    LocalDate recruitStartDate;
    LocalDate recruitEndDate;

    LocalDate interviewStartDate;
    LocalDate interviewEndDate;

    Step step;

    public enum Step {
        PRE,
        PAPER_END,
        INTERVIEW_END
    }
}
