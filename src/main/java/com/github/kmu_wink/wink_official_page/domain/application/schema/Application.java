package com.github.kmu_wink.wink_official_page.domain.application.schema;

import com.github.kmu_wink.wink_official_page.domain.user.schema.User;
import com.github.kmu_wink.wink_official_page.global.infra.mongo.BaseSchema;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document
public class Application extends BaseSchema {

    String name;
    String img;

    String secret;

    @DBRef
    User user;

    Login login;

    @Data
    @Builder
    public static class Login {

        boolean enable;
        List<String> urls;
        List<Scope> scopes;

        public static Login empty() {

            return Login.builder().enable(false).urls(List.of()).scopes(List.of(Scope.UUID)).build();
        }

        public enum Scope {

            UUID,
            EMAIL,
            NAME,
            STUDENT_ID,
            DEPARTMENT,
            PHONE_NUMBER,
            AVATAR,
            DESCRIPTION,
            SOCIAL,
            ROLE,
            FEE
        }
    }
}

