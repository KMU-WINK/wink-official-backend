package com.github.kmu_wink.wink_official.domain.recruit.schema;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.github.kmu_wink.wink_official.common.database.mongo.schema.BaseSchema;
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
public class Application extends BaseSchema {

    @DBRef
    Recruit recruit;

    String name;
    String studentId;
    String email;
    String phoneNumber;

    String jiwonDonggi;
    String baeugoSipeunJeom;

    List<LocalDate> canInterviewDates;

    String github;
    List<FrontendTechStack> frontendTechStacks;
    List<BackendTechStack> backendTechStacks;
    List<DevOpsTechStack> devOpsTechStacks;
    List<DesignTechStack> designTechStacks;

    String favoriteProject;

    String lastComment;
}
