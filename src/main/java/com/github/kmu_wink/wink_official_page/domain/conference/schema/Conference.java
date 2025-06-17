package com.github.kmu_wink.wink_official_page.domain.conference.schema;

import com.github.kmu_wink.wink_official_page.domain.user.schema.User;
import com.github.kmu_wink.wink_official_page.global.infra.mongo.BaseSchema;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Set;

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
