package com.github.kmu_wink.wink_official.domain.program.history.schema;

import java.time.LocalDate;

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
public class History extends BaseSchema {

	String title;
	String description;
	String image;
	LocalDate date;
}
