package com.github.kmu_wink.wink_official.domain.recruit.schema;

import com.github.kmu_wink.wink_official.common.schema.BaseSchema;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.time.LocalDate;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
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

    Domain domain;

    String github;
    List<FrontendTechStack> frontendTechStacks;
    List<BackendTechStack> backendTechStacks;
    List<DatabaseTechStack> databaseTechStacks;
    List<DevOpsTechStack> devOpsTechStacks;
    List<DesignTools> designTools;

    String favoriteProject;

    String lastComment;

    @Getter
    @RequiredArgsConstructor
    public enum Domain {
        FRONTEND("프론트엔드"),
        BACKEND("백엔드"),
        DESIGN("디자이너"),
        PM("기획자");

        private final String displayName;
    }

    @Getter
    @RequiredArgsConstructor
    public enum FrontendTechStack {
        HTML("HTML"),
        CSS("CSS"),
        SCSS("SCSS"),
        SASS("SASS"),
        JAVASCRIPT("JavaScript"),
        TYPESCRIPT("TypeScript"),
        REACT("React"),
        VUE("Vue.js"),
        ANGULAR("Angular"),
        SVELTE("Svelte"),
        NEXT_JS("Next.js"),
        NUXT_JS("Nuxt.js"),
        JQUERY("jQuery"),
        TAILWIND_CSS("Tailwind CSS"),
        BOOTSTRAP("Bootstrap"),
        MATERIAL_UI("Material-UI"),
        REDUX("Redux"),
        MOBX("MobX"),
        ZUSTAND("Zustand");

        private final String displayName;
    }

    @Getter
    @RequiredArgsConstructor
    public enum BackendTechStack {
        NODE_JS("Node.js"),
        EXPRESS("Express"),
        DJANGO("Django"),
        FLASK("Flask"),
        SPRING("Spring"),
        SPRING_BOOT("Spring Boot"),
        RUBY_ON_RAILS("Ruby on Rails"),
        LARAVEL("Laravel"),
        ASP_NET("ASP.NET"),
        GRAPHQL("GraphQL"),
        REST_API("REST API");

        private final String displayName;
    }

    @Getter
    @RequiredArgsConstructor
    public enum DatabaseTechStack {
        MYSQL("MySQL"),
        POSTGRESQL("PostgreSQL"),
        MONGODB("MongoDB"),
        FIREBASE("Firebase"),
        REDIS("Redis"),
        SQLITE("SQLite"),
        ORACLE("Oracle");

        private final String displayName;
    }

    @Getter
    @RequiredArgsConstructor
    public enum DevOpsTechStack {
        DOCKER("Docker"),
        KUBERNETES("Kubernetes"),
        AWS("AWS"),
        GCP("Google Cloud Platform"),
        AZURE("Azure"),
        CI_CD("CI/CD");

        private final String displayName;
    }

    @Getter
    @RequiredArgsConstructor
    public enum DesignTools {
        FIGMA("Figma"),
        ADOBE_XD("Adobe XD"),
        SKETCH("Sketch"),
        INVISION("InVision"),
        AXURE("Axure"),
        FRAMER("Framer");

        private final String displayName;
    }
}
