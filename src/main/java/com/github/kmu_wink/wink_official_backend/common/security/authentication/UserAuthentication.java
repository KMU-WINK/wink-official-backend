package com.github.kmu_wink.wink_official_backend.common.security.authentication;

import com.github.kmu_wink.wink_official_backend.domain.user.schema.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.List;

@RequiredArgsConstructor
public class UserAuthentication implements Authentication {

    private final User user;
    private final String password;

    @Getter
    @Setter
    private boolean authenticated = false;

    public UserAuthentication(User user) {
        this(user, null);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getCredentials() {

        return password;
    }

    @Override
    public Object getDetails() {

        return null;
    }

    @Override
    public User getPrincipal() {

        return user;
    }

    @Override
    public String getName() {

        return user.getId();
    }
}