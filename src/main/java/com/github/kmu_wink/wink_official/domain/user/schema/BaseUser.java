package com.github.kmu_wink.wink_official.domain.user.schema;

import org.springframework.data.mongodb.core.index.Indexed;

import com.github.kmu_wink.wink_official.common.database.mongo.BaseSchema;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public abstract class BaseUser extends BaseSchema {

    @Indexed(unique = true)
    String email;

    String name;

    @Indexed(unique = true)
    String studentId;

    String department;

    @Indexed(unique = true)
    String phoneNumber;
}

