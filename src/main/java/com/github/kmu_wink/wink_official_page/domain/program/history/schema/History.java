package com.github.kmu_wink.wink_official_page.domain.program.history.schema;

import com.github.kmu_wink.wink_official_page.global.infra.mongo.BaseSchema;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document
public class History extends BaseSchema {

    String title;
    String image;
    LocalDate date;
}
