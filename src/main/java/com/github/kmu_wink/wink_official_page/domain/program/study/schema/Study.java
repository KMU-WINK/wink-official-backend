package com.github.kmu_wink.wink_official_page.domain.program.study.schema;

import com.github.kmu_wink.wink_official_page.global.infra.mongo.BaseSchema;
import jakarta.annotation.Nullable;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document
public class Study extends BaseSchema {

    @Indexed(unique = true)
    int index;

    String category;
    String title;
    String author;
    String content;

    @Nullable
    String image;
}
