package com.github.kmu_wink.wink_official.common.log;

import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.google.common.base.Strings;

import jakarta.annotation.Nonnull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class LoggerFilter extends OncePerRequestFilter {

    @Override
    public void doFilterInternal(
            @Nonnull HttpServletRequest request,
            @Nonnull HttpServletResponse response,
            @Nonnull FilterChain filterChain
    ) throws ServletException, IOException {

        long start = System.currentTimeMillis();

        filterChain.doFilter(request, response);

        long end = System.currentTimeMillis();
        long elapsed = end - start;

        log.info("{} {} {} {} {}ms",
                request.getMethod(),
                request.getRequestURI(),
                getIp(request),
                response.getStatus(),
                elapsed
        );
    }

    private String getIp(HttpServletRequest request) {

        String xfHeader = request.getHeader("X-Forwarded-For");

        return Strings.isNullOrEmpty(xfHeader) ? request.getRemoteAddr() : xfHeader.split(",")[0];
    }
}
