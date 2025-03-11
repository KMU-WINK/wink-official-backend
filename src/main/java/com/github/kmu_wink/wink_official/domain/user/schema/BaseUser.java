package com.github.kmu_wink.wink_official.domain.user.schema;

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

    String email;
    String name;
    String studentId;
    String department;
    String phoneNumber;
}

