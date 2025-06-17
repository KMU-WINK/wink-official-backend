package com.github.kmu_wink.wink_official_page.global.exception;

import com.github.kmu_wink.wink_official_page.domain.user.schema.User;
import com.github.kmu_wink.wink_official_page.global.response.ApiResponse;
import com.github.kmu_wink.wink_official_page.global.security.authentication.UserAuthentication;
import io.sentry.Sentry;
import io.sentry.protocol.Request;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.io.IOException;
import java.util.Objects;

@Slf4j
@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler({ NoResourceFoundException.class, HttpRequestMethodNotSupportedException.class })
    public ApiResponse<?> noResourceFoundException(Exception ignored) {

        return ApiResponse.error("요청하신 리소스를 찾을 수 없습니다.");
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ApiResponse<?> httpMessageNotReadableException(HttpMessageNotReadableException ignored) {

        return ApiResponse.error("요청 데이터가 올바르지 않습니다.");
    }

    @ExceptionHandler(AuthorizationDeniedException.class)
    public ApiResponse<?> authorizationDeniedException(AuthorizationDeniedException ignored) {

        return ApiResponse.error("권한이 없습니다.");
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ApiResponse<?> methodArgumentNotValidException(MethodArgumentNotValidException e, HttpServletRequest request) {

        if (Objects.isNull(e.getBindingResult().getFieldError())) {

            return ApiResponse.error(e.getMessage());
        }

        String field = e.getBindingResult().getFieldError().getField();
        String message = e.getBindingResult().getFieldError().getDefaultMessage();
        String errorMessage = String.format("%s은(는) %s", field, message);

        sentry(e, request);
        return ApiResponse.error(errorMessage);
    }

    @ExceptionHandler(ApiException.class)
    public ApiResponse<?> apiException(ApiException e, HttpServletRequest request) {

        sentry(e, request);
        return ApiResponse.error(e.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ApiResponse<?> exception(Exception e, HttpServletRequest request) {

        sentry(e, request);
        return ApiResponse.error("알 수 없는 오류가 발생했습니다.");
    }

    private void sentry(Throwable throwable, HttpServletRequest request) {

        Sentry.captureException(
                throwable, (scope) -> {
                    if (request.getUserPrincipal() instanceof UserAuthentication authentication) {
                        User user = authentication.getPrincipal();
                        io.sentry.protocol.User sentryUser = new io.sentry.protocol.User();

                        sentryUser.setId(user.getId());
                        sentryUser.setEmail(user.getEmail());
                        sentryUser.setName(user.getName());
                        sentryUser.setIpAddress(request.getRemoteAddr());

                        scope.setUser(sentryUser);
                    }

                    Request sentryRequest = scope.getRequest();
                    if (sentryRequest != null) {
                        try {
                            String body = new String(
                                    request.getInputStream().readAllBytes(),
                                    request.getCharacterEncoding()
                            );

                            sentryRequest.setBodySize((long) body.length());
                            sentryRequest.setData(body);

                            scope.setRequest(sentryRequest);
                        } catch (IOException ignored) {
                        }
                    }
                }
        );
    }
}
