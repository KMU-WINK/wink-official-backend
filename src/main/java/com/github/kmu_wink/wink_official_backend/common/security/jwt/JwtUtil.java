package com.github.kmu_wink.wink_official_backend.common.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.github.kmu_wink.wink_official_backend.common.property.JwtProperty;
import com.github.kmu_wink.wink_official_backend.domain.auth.repository.RefreshTokenRepository;
import com.github.kmu_wink.wink_official_backend.domain.auth.schema.RefreshToken;
import com.github.kmu_wink.wink_official_backend.domain.user.schema.User;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Component
@RequiredArgsConstructor
public class JwtUtil {

    private final JwtProperty jwtProperty;
    private final RefreshTokenRepository refreshTokenRepository;

    private Algorithm algorithm;

    @PostConstruct
    public void init() {

        algorithm = Algorithm.HMAC256(jwtProperty.getSecretKey());
    }

    public String generateAccessToken(User user) {

        return JWT.create()
                .withIssuedAt(Instant.now())
                .withExpiresAt(Instant.now().plus(jwtProperty.getAccessTokenExpirationHours(), ChronoUnit.HOURS))
                .withClaim("id", user.getId())
                .sign(algorithm);
    }

    public String generateRefreshToken(User user) {

        String token = JWT.create()
                .withIssuedAt(Instant.now())
                .withExpiresAt(Instant.now().plus(jwtProperty.getRefreshTokenExpirationHours(), ChronoUnit.HOURS))
                .sign(algorithm);

        RefreshToken refreshToken = RefreshToken.builder()
                .user(user)
                .token(token)
                .ttl(jwtProperty.getRefreshTokenExpirationHours())
                .build();

        refreshTokenRepository.save(refreshToken);

        return token;
    }

    public String extractToken(String token) {

        return JWT.require(algorithm)
                .build()
                .verify(token)
                .getClaim("id")
                .asString();
    }

    public boolean validateToken(String token) throws TokenExpiredException {

        if (token == null) {

            return false;
        }

        JWT.require(algorithm).build().verify(token);

        return true;
    }
}
