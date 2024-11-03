package com.github.kmu_wink.wink_official.domain.recruit.schema;

import com.github.kmu_wink.wink_official.common.schema.BaseSchema;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ApplicationResult extends BaseSchema {

    @DBRef
    Application application;

    String comment;
    boolean heart;
    boolean passed;
}
