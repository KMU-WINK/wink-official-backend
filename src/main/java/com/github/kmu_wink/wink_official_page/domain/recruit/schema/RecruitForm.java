package com.github.kmu_wink.wink_official_page.domain.recruit.schema;

import com.github.kmu_wink.wink_official_page.domain.recruit.constant.BackendTechStack;
import com.github.kmu_wink.wink_official_page.domain.recruit.constant.DesignTechStack;
import com.github.kmu_wink.wink_official_page.domain.recruit.constant.DevOpsTechStack;
import com.github.kmu_wink.wink_official_page.domain.recruit.constant.FrontendTechStack;
import com.github.kmu_wink.wink_official_page.global.infra.mongo.BaseSchema;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document
public class RecruitForm extends BaseSchema {

    @DBRef
    Recruit recruit;

    String name;
    String studentId;
    String department;
    String email;
    String phoneNumber;

    String jiwonDonggi;
    String selfIntroduce;

    List<String> outings;
    List<LocalDate> interviewDates;
    String whyCannotInterview;

    String github;
    List<FrontendTechStack> frontendTechStacks;
    List<BackendTechStack> backendTechStacks;
    List<DevOpsTechStack> devOpsTechStacks;
    List<DesignTechStack> designTechStacks;

    String favoriteProject;

    Boolean paperPass;
    Boolean interviewPass;
}
