package com.github.kmu_wink.wink_official_backend.domain.user.schema;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.kmu_wink.wink_official_backend.common.schema.BaseSchema;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@EqualsAndHashCode(callSuper = true)
public class User extends BaseSchema {

    @Indexed(unique = true)
    private String email;

    @JsonIgnore
    private String password;

    private String name;

    @Indexed(unique = true)
    private String studentId;

    private String avatar;

    private String description;

    private Social social;

    private Role role;

    private boolean fee;

    private boolean approved;

    @Data
    @Builder
    public static class Social {

        private String github;
        private String instagram;
        private String blog;

        public static Social empty() {
            return Social.builder().build();
        }
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

