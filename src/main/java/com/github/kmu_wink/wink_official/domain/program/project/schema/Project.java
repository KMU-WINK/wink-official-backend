package com.github.kmu_wink.wink_official.domain.program.project.schema;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.github.kmu_wink.wink_official.common.database.mongo.schema.BaseSchema;
import com.github.kmu_wink.wink_official.domain.user.schema.User;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document
public class Project extends BaseSchema {

	String title;
	String content;
	List<String> tags;
	List<String> githubLinks;

	@DBRef
	List<User> users;
}
