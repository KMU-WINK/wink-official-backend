package com.github.kmu_wink.wink_official.domain.program.activity.schema;

import java.util.List;

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
public class Activity extends BaseSchema {

	String title;
	String description;
	List<String> images;
	boolean pinned;
}
