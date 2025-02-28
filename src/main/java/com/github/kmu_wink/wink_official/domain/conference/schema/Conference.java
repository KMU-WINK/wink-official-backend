package com.github.kmu_wink.wink_official.domain.conference.schema;

import java.time.LocalDateTime;
import java.util.Set;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.github.kmu_wink.wink_official.common.database.mongo.BaseSchema;
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
public class Conference extends BaseSchema {

	String location;

	LocalDateTime date;

	@DBRef
	Set<User> surveyPresent;

	@DBRef
	Set<User> surveyAbsent;

	@DBRef
	Set<User> present;

	@DBRef
	Set<User> absent;
}
