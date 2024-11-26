package com.github.kmu_wink.wink_official.common.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.github.kmu_wink.wink_official.common.property.JwtProperty;
import com.github.kmu_wink.wink_official.domain.auth.repository.RefreshTokenRepository;
import com.github.kmu_wink.wink_official.domain.auth.schema.RefreshToken;
import com.github.kmu_wink.wink_official.domain.user.schema.User;
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

        algorithm = Algorithm.HMAC256(jwtProperty.getKey());
    }

    public String generateAccessToken(User user) {

        return generateAccessToken(user.getId());
    }

    public String generateAccessToken(String userId) {

        return JWT.create()
                .withIssuedAt(Instant.now())
                .withExpiresAt(Instant.now().plus(jwtProperty.getAccessTokenExpirationHours(), ChronoUnit.HOURS))
                .withClaim("id", userId)
                .sign(algorithm);
    }

    public String generateRefreshToken(User user) {

        return generateRefreshToken(user.getId());
    }

    public String generateRefreshToken(String userId) {

        String token = JWT.create()
                .withIssuedAt(Instant.now())
                .withExpiresAt(Instant.now().plus(jwtProperty.getRefreshTokenExpirationHours(), ChronoUnit.HOURS))
                .sign(algorithm);

        RefreshToken refreshToken = RefreshToken.builder()
                .userId(userId)
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