package com.github.kmu_wink.wink_official_page.global.security.authentication;

import com.github.kmu_wink.wink_official_page.domain.auth.exception.AuthenticationFailException;
import com.github.kmu_wink.wink_official_page.domain.user.schema.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Objects;

@Configuration
public class UserAuthenticationProvider implements AuthenticationProvider {

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }

    @Override
    public Authentication authenticate(Authentication authentication) {

        UserAuthentication userAuthentication = (UserAuthentication) authentication;

        String credentials = userAuthentication.getCredentials();
        User principal = userAuthentication.getPrincipal();

        if (Objects.isNull(principal) || Objects.isNull(credentials)) {

            throw new AuthenticationFailException();
        }

        if (!passwordEncoder().matches(credentials, principal.getPassword())) {

            throw new AuthenticationFailException();
        }

        userAuthentication.setAuthenticated(true);

        return userAuthentication;
    }

    @Override
    public boolean supports(Class<?> authentication) {

        return authentication.equals(UserAuthentication.class);
    }
}
