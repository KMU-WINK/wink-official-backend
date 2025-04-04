package com.github.kmu_wink.wink_official.domain.recruit.schema;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.github.kmu_wink.wink_official.common.database.mongo.BaseSchema;
import com.github.kmu_wink.wink_official.domain.recruit.constant.techStack.BackendTechStack;
import com.github.kmu_wink.wink_official.domain.recruit.constant.techStack.DesignTechStack;
import com.github.kmu_wink.wink_official.domain.recruit.constant.techStack.DevOpsTechStack;
import com.github.kmu_wink.wink_official.domain.recruit.constant.techStack.FrontendTechStack;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

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
