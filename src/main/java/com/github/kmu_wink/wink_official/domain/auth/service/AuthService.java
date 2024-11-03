package com.github.kmu_wink.wink_official.domain.auth.service;

import com.github.kmu_wink.wink_official.common.email.EmailSender;
import com.github.kmu_wink.wink_official.common.security.authentication.UserAuthentication;
import com.github.kmu_wink.wink_official.common.security.jwt.JwtUtil;
import com.github.kmu_wink.wink_official.domain.auth.dto.request.*;
import com.github.kmu_wink.wink_official.domain.auth.dto.response.CheckRegisterResponse;
import com.github.kmu_wink.wink_official.domain.auth.dto.response.CheckResetPasswordResponse;
import com.github.kmu_wink.wink_official.domain.auth.dto.response.LoginResponse;
import com.github.kmu_wink.wink_official.domain.auth.email.PasswordResetTokenTemplate;
import com.github.kmu_wink.wink_official.domain.auth.exception.AuthenticationFailException;
import com.github.kmu_wink.wink_official.domain.auth.exception.InvalidPasswordResetTokenException;
import com.github.kmu_wink.wink_official.domain.auth.exception.InvalidRefreshTokenException;
import com.github.kmu_wink.wink_official.domain.auth.exception.InvalidRegisterTokenException;
import com.github.kmu_wink.wink_official.domain.auth.repository.PasswordResetTokenRepository;
import com.github.kmu_wink.wink_official.domain.auth.repository.RefreshTokenRepository;
import com.github.kmu_wink.wink_official.domain.auth.schema.PasswordResetToken;
import com.github.kmu_wink.wink_official.domain.auth.schema.RefreshToken;
import com.github.kmu_wink.wink_official.domain.user.dto.response.UserResponse;
import com.github.kmu_wink.wink_official.domain.user.exception.UserNotFoundException;
import com.github.kmu_wink.wink_official.domain.user.repository.PreUserRepository;
import com.github.kmu_wink.wink_official.domain.user.repository.UserRepository;
import com.github.kmu_wink.wink_official.domain.user.schema.PreUser;
import com.github.kmu_wink.wink_official.domain.user.schema.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PreUserRepository preUserRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    private final EmailSender emailSender;

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

    public CheckRegisterResponse checkRegister(CheckRegisterRequest dto) {

        Optional<PreUser> preUser = preUserRepository.findByToken(dto.token());

        return CheckRegisterResponse.builder()
                .isValid(preUser.isPresent())
                .user(preUser.orElse(null))
                .build();
    }

    public void register(RegisterRequest dto) {

        PreUser preUser = preUserRepository.findByToken(dto.token()).orElseThrow(InvalidRegisterTokenException::new);

        preUserRepository.delete(preUser);

        User user = User.builder()
                .email(preUser.getEmail())
                .name(preUser.getName())
                .studentId(preUser.getStudentId())
                .phoneNumber(preUser.getPhoneNumber())
                .password(encoder.encode(dto.password()))
                .description(dto.description())
                .social(
                        User.Social.builder()
                                .github(dto.github())
                                .instagram(dto.instagram())
                                .blog(dto.blog())
                                .build()
                )
                .role(User.Role.MEMBER)
                .fee(false)
                .build();

        userRepository.save(user);
    }

    public LoginResponse refresh(RefreshRequest dto) {

        RefreshToken refreshToken = refreshTokenRepository
                .findByToken(dto.token())
                .orElseThrow(InvalidRefreshTokenException::new);

        refreshTokenRepository.delete(refreshToken);

        String userId = refreshToken.userId();

        String accessToken = jwtUtil.generateAccessToken(userId);
        String newRefreshToken = jwtUtil.generateRefreshToken(userId);

        return LoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(newRefreshToken)
                .build();
    }

    public void requestResetPassword(RequestResetPasswordRequest dto) {

        User user = userRepository.findByEmail(dto.email())
                .orElseThrow(UserNotFoundException::new);

        String passwordResetTokenRaw = UUID.randomUUID().toString();

        PasswordResetToken passwordResetToken = PasswordResetToken.builder()
                .token(passwordResetTokenRaw)
                .userId(user.getId())
                .build();

        passwordResetTokenRepository.save(passwordResetToken);

        emailSender.send(dto.email(), PasswordResetTokenTemplate.of(user, passwordResetToken));
    }

    public CheckResetPasswordResponse checkResetPassword(CheckResetPasswordRequest dto) {

        boolean isVerified = passwordResetTokenRepository.existsByToken(dto.token());

        return CheckResetPasswordResponse.builder()
                .isValid(isVerified)
                .build();
    }

    public void resetPassword(ResetPasswordRequest request) {

        PasswordResetToken passwordResetTokenEntity = passwordResetTokenRepository.findByToken(request.token())
                .orElseThrow(InvalidPasswordResetTokenException::new);

        passwordResetTokenRepository.delete(passwordResetTokenEntity);

        String userId = passwordResetTokenEntity.userId();

        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        user.setPassword(encoder.encode(request.newPassword()));

        userRepository.save(user);
    }

    public UserResponse me(User user) {

        return UserResponse.builder()
                .user(user)
                .build();
    }
}
