package com.github.kmu_wink.wink_official.domain.user.schema;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document
public class User extends BaseUser {

    @JsonIgnore
    String password;

    String avatar;

    String description;

    Social social;

    Role role;

    boolean fee;

    @Data
    @Builder
    public static class Social {

        String github;
        String instagram;
        String blog;
    }

    public enum Role {

        MEMBER,
        GRADUATED(MEMBER),
        ADMIN(MEMBER),
        PLANNING_ASSISTANT(ADMIN, MEMBER),
        PLANNING_HEAD(PLANNING_ASSISTANT),
        PUBLIC_RELATIONS_ASSISTANT(ADMIN, MEMBER),
        PUBLIC_RELATIONS_HEAD(PUBLIC_RELATIONS_ASSISTANT),
        TECH_ASSISTANT(ADMIN, MEMBER),
        TECH_HEAD(TECH_ASSISTANT),
        TREASURY_ASSISTANT(ADMIN, MEMBER),
        TREASURY_HEAD(TREASURY_ASSISTANT),
        VICE_PRESIDENT(PLANNING_HEAD, PUBLIC_RELATIONS_HEAD, TREASURY_HEAD),
        PRESIDENT(VICE_PRESIDENT),
        ;

        private final Role[] inheritedRoles;

        Role(Role... inheritedRoles) {
            this.inheritedRoles = inheritedRoles;
        }

        public Collection<SimpleGrantedAuthority> getAuthorization() {

            Set<Role> authorization = new HashSet<>();

            collectAuthorization(this, authorization);

            return authorization.stream().map(role -> "ROLE_" + role.name()).map(SimpleGrantedAuthority::new).toList();
        }

        private void collectAuthorization(Role role, Set<Role> roles) {

            roles.add(role);

            for (Role inheritedRole : role.inheritedRoles) {
                collectAuthorization(inheritedRole, roles);
            }
        }

        public static Role fromKorean(String role) {

            return switch (role) {
                case "회장" -> PRESIDENT;
                case "부회장" -> VICE_PRESIDENT;
                case "총무부 부장" -> TREASURY_HEAD;
                case "총무부 차장" -> TREASURY_ASSISTANT;
                case "학술부 부장" -> TECH_HEAD;
                case "학술부 차장" -> TECH_ASSISTANT;
                case "홍보부 부장" -> PUBLIC_RELATIONS_HEAD;
                case "홍보부 차장" -> PUBLIC_RELATIONS_ASSISTANT;
                case "기획부 부장" -> PLANNING_HEAD;
                case "기획부 차장" -> PLANNING_ASSISTANT;
                case "졸업생" -> GRADUATED;
                case "부원" -> MEMBER;
                default -> throw new IllegalStateException("Unexpected value: " + role);
            };
        }

        public String toKorean() {

            return switch (this) {
                case PRESIDENT -> "회장";
                case VICE_PRESIDENT -> "부회장";
                case TREASURY_HEAD -> "총무부 부장";
                case TREASURY_ASSISTANT -> "총무부 차장";
                case TECH_HEAD -> "학술부 부장";
                case TECH_ASSISTANT -> "학술부 차장";
                case PUBLIC_RELATIONS_HEAD -> "홍보부 부장";
                case PUBLIC_RELATIONS_ASSISTANT -> "홍보부 차장";
                case PLANNING_HEAD -> "기획부 부장";
                case PLANNING_ASSISTANT -> "기획부 차장";
                case GRADUATED -> "졸업생";
                case MEMBER -> "부원";
                default -> throw new IllegalStateException("Unexpected value: " + this);
            };
        }
    }
}

