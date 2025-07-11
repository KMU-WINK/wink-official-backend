package com.github.kmu_wink.wink_official_page.global.security.jwt;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.kmu_wink.wink_official_page.domain.auth.exception.AuthExceptionCode;
import com.github.kmu_wink.wink_official_page.domain.user.repository.UserRepository;
import com.github.kmu_wink.wink_official_page.domain.user.schema.User;
import com.github.kmu_wink.wink_official_page.global.exception.ApiException;
import com.github.kmu_wink.wink_official_page.global.response.ApiResponse;
import com.github.kmu_wink.wink_official_page.global.security.authentication.UserAuthentication;
import jakarta.annotation.Nonnull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Objects;
import java.util.stream.Stream;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserRepository repository;

    @Override
    public void doFilterInternal(
            @Nonnull HttpServletRequest request,
            @Nonnull HttpServletResponse response,
            @Nonnull FilterChain filterChain
    ) throws ServletException, IOException {

        String accessToken = extractToken(request);

        try {
            if (Objects.nonNull(accessToken) && jwtUtil.validateToken(accessToken)) {

                String id = jwtUtil.extractToken(accessToken);
                User user = repository.findById(id).orElseThrow(AuthExceptionCode.AUTHENTICATION_FAILED::toException);

                UserAuthentication authentication = new UserAuthentication(user);
                authentication.setAuthenticated(true);

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (TokenExpiredException e) {
            handleException(response, AuthExceptionCode.ACCESS_TOKEN_EXPIRED.toException());
            return;
        } catch (ApiException e) {
            handleException(response, e);
            return;
        }

        filterChain.doFilter(request, response);
    }

    private String extractToken(HttpServletRequest request) {

        String authorization = request.getHeader("Authorization");

        return (authorization != null && authorization.startsWith("Bearer ")) ? authorization.substring(7) : null;
    }

    private void handleException(HttpServletResponse response, ApiException e) throws IOException {

        ApiResponse<?> apiResponse = ApiResponse.error(e.getMessage());

        String content = new ObjectMapper().writeValueAsString(apiResponse);

        response.addHeader("Content-Type", "application/json");
        response.getWriter().write(content);
        response.getWriter().flush();
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {

        String uri = request.getRequestURI();

        return Stream.of("/api/auth/refresh-token").anyMatch(uri::equalsIgnoreCase);
    }
}
