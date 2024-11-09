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

    boolean active;

    @Data
    @Builder
    public static class Social {

        String github;
        String instagram;
        String blog;
    }

    public enum Role {

        MEMBER,
        ADMIN(MEMBER),
        PLANNING_ASSISTANT(ADMIN, MEMBER),
        PLANNING_HEAD(PLANNING_ASSISTANT),
        PUBLIC_RELATIONS_ASSISTANT(ADMIN, MEMBER),
        PUBLIC_RELATIONS_HEAD(PUBLIC_RELATIONS_ASSISTANT),
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
    }
}

