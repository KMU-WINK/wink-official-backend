package com.github.kmu_wink.wink_official.domain.meeting.schema;

import java.time.LocalDate;

import org.springframework.data.mongodb.core.mapping.Document;

import com.github.kmu_wink.wink_official.common.database.mongo.BaseSchema;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document
public class Meeting extends BaseSchema {

    LocalDate date;
}
