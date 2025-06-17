package com.github.kmu_wink.wink_official_page.global.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.github.kmu_wink.wink_official_page.domain.auth.repository.RefreshTokenRedisRepository;
import com.github.kmu_wink.wink_official_page.domain.auth.schema.RefreshToken;
import com.github.kmu_wink.wink_official_page.domain.user.schema.User;
import com.github.kmu_wink.wink_official_page.global.property.JwtProperty;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Objects;

@Configuration
@RequiredArgsConstructor
public class JwtUtil {

    private final JwtProperty jwtProperty;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;

    @Bean
    public Algorithm algorithm() {

        return Algorithm.HMAC256(jwtProperty.getKey());
    }

    public String generateAccessToken(User user) {

        return generateAccessToken(user.getId());
    }

    public String generateAccessToken(String userId) {

        return JWT.create()
                .withIssuer("WINK")
                .withSubject("access-token")
                .withAudience("wink-official-page")
                .withExpiresAt(Instant.now().plus(jwtProperty.getAccessTokenExpirationHours(), ChronoUnit.HOURS))
                .withNotBefore(Instant.now())
                .withIssuedAt(Instant.now())
                .withClaim("id", userId)
                .sign(algorithm());
    }

    public String generateRefreshToken(User user) {

        return generateRefreshToken(user.getId());
    }

    public String generateRefreshToken(String userId) {

        String token = JWT.create()
                .withIssuer("WINK")
                .withSubject("refresh-token")
                .withAudience("wink-official-page")
                .withExpiresAt(Instant.now().plus(jwtProperty.getRefreshTokenExpirationHours(), ChronoUnit.HOURS))
                .withNotBefore(Instant.now())
                .withIssuedAt(Instant.now())
                .sign(algorithm());

        RefreshToken refreshToken = RefreshToken.builder()
                .userId(userId)
                .token(token)
                .ttl(jwtProperty.getRefreshTokenExpirationHours())
                .build();

        refreshTokenRedisRepository.save(refreshToken);

        return token;
    }

    public String extractToken(String token) {

        return JWT.require(algorithm()).build().verify(token).getClaim("id").asString();
    }

    public boolean validateToken(String token) throws TokenExpiredException {

        if (Objects.isNull(token)) {

            return false;
        }

        try {
            JWT.require(algorithm())
                    .withIssuer("WINK")
                    .withSubject("access-token")
                    .withAudience("wink-official-page")
                    .build()
                    .verify(token);
        } catch (TokenExpiredException e) {
            throw e;
        } catch (Exception e) {
            return false;
        }

        return true;
    }
}
