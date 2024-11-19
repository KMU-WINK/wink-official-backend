package com.github.kmu_wink.wink_official.domain.program.study.schema;

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.github.kmu_wink.wink_official.common.database.mongo.schema.BaseSchema;

import jakarta.annotation.Nullable;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

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
