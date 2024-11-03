package com.github.kmu_wink.wink_official.domain.custom.schema;

import com.github.kmu_wink.wink_official.common.schema.BaseSchema;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class RecruitQnA extends BaseSchema {

    List<Item> items;

    @Data
    @Builder
    public static class Item {

        String question;
        String answer;
    }
}
