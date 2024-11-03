package com.github.kmu_wink.wink_official.domain.recruit.schema;

import com.github.kmu_wink.wink_official.common.schema.BaseSchema;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Recruit extends BaseSchema {

    int year;
    int semester;

    LocalDate recruitStartDate;
    LocalDate recruitEndDate;

    LocalDate interviewStartDate;
    LocalDate interviewEndDate;
}
