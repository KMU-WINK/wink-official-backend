package com.github.kmu_wink.wink_official.domain.user.schema;

import com.github.kmu_wink.wink_official.common.schema.BaseSchema;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.index.Indexed;

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

    @Indexed(unique = true)
    String phoneNumber;
}

