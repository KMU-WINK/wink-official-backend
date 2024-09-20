package com.github.kmu_wink.wink_official_backend.common.security.util;

import com.github.kmu_wink.wink_official_backend.common.security.authentication.UserAuthentication;
import com.github.kmu_wink.wink_official_backend.domain.user.schema.User;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

public class UserContext {

    public static User getUser() {
        SecurityContext context = SecurityContextHolder.getContext();
        UserAuthentication authentication = (UserAuthentication) context.getAuthentication();

        return authentication.getPrincipal();
    }
}
