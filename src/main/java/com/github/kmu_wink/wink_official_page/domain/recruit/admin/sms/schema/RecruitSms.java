package com.github.kmu_wink.wink_official_page.domain.recruit.admin.sms.schema;

import com.github.kmu_wink.wink_official_page.domain.recruit.schema.Recruit;
import com.github.kmu_wink.wink_official_page.domain.recruit.schema.RecruitForm;
import com.github.kmu_wink.wink_official_page.domain.user.schema.PreUser;
import com.github.kmu_wink.wink_official_page.global.infra.mongo.BaseSchema;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document
public class RecruitSms extends BaseSchema {

    @DBRef
    Recruit recruit;

    String paperFail;
    String paperPass;

    String finalFail;
    String finalPass;

    public static String transform(String content, RecruitForm form) {

        return content.replace("{NAME}", form.getName())
                .replace("{STUDENT_ID}", form.getStudentId())
                .replace("{DEPARTMENT}", form.getDepartment())
                .replace("{EMAIL}", form.getEmail())
                .replace("{PHONE_NUMBER}", form.getPhoneNumber());
    }

    public static String transform(String content, PreUser preUser) {

        return content.replace("{NAME}", preUser.getName())
                .replace("{STUDENT_ID}", preUser.getStudentId())
                .replace("{DEPARTMENT}", preUser.getDepartment())
                .replace("{EMAIL}", preUser.getEmail())
                .replace("{PHONE_NUMBER}", preUser.getPhoneNumber())
                .replace("{TOKEN}", preUser.getToken());
    }
}
