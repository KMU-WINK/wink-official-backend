package com.github.son_daehyeon.domain.auth.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.github.son_daehyeon.common.security.authentication.UserAuthentication;
import com.github.son_daehyeon.common.security.jwt.JwtUtil;
import com.github.son_daehyeon.domain.auth.dto.request.LoginRequest;
import com.github.son_daehyeon.domain.auth.dto.request.RefreshTokenRequest;
import com.github.son_daehyeon.domain.auth.dto.request.RegisterRequest;
import com.github.son_daehyeon.domain.auth.dto.response.LoginResponse;
import com.github.son_daehyeon.domain.auth.exception.AlreadyRegisteredEmailException;
import com.github.son_daehyeon.domain.auth.exception.AuthenticationFailException;
import com.github.son_daehyeon.domain.auth.exception.InvalidRefreshTokenException;
import com.github.son_daehyeon.domain.auth.repository.RefreshTokenRedisRepository;
import com.github.son_daehyeon.domain.auth.schema.RefreshToken;
import com.github.son_daehyeon.domain.user.dto.response.UserResponse;
import com.github.son_daehyeon.domain.user.repository.UserRepository;
import com.github.son_daehyeon.domain.user.schema.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest dto) {

        User user = userRepository.findByEmail(dto.email())
            .orElseThrow(AuthenticationFailException::new);

        UserAuthentication authentication = new UserAuthentication(user, dto.password());
        authenticationManager.authenticate(authentication);

        String accessToken = jwtUtil.generateAccessToken(user);
        String refreshToken = jwtUtil.generateRefreshToken(user);

        return LoginResponse.builder()
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .build();
    }

    public Void register(RegisterRequest dto) {

        if (userRepository.existsByEmail(dto.email())) {
            throw new AlreadyRegisteredEmailException();
        }

        User user = User.builder()
                .email(dto.email())
                .password(encoder.encode(dto.password()))
                .role(User.Role.MEMBER)
                .build();

        userRepository.save(user);

        return null;
    }

    public LoginResponse refreshToken(RefreshTokenRequest dto) {

        RefreshToken token = refreshTokenRedisRepository.findByToken(dto.token()).orElseThrow(InvalidRefreshTokenException::new);
        refreshTokenRedisRepository.delete(token);

        User user = userRepository.findById(token.userId()).orElseThrow(AuthenticationFailException::new);

        String accessToken = jwtUtil.generateAccessToken(user);
        String newRefreshToken = jwtUtil.generateRefreshToken(user);

        return LoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(newRefreshToken)
                .build();
    }

    public UserResponse me(User user) {

        return UserResponse.builder()
            .user(user)
            .build();
    }
}
