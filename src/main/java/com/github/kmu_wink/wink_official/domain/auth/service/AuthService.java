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

        String email = dto.email();
        String password = dto.password();

        User user = userRepository.findByEmail(email)
                .orElseThrow(AuthenticationFailException::new);

        UserAuthentication authentication = new UserAuthentication(user, password);
        authenticationManager.authenticate(authentication);

        String accessToken = jwtUtil.generateAccessToken(user);
        String refreshToken = jwtUtil.generateRefreshToken(user);

        return LoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public CheckRegisterResponse checkRegister(CheckRegisterRequest dto) {

        String token = dto.token();

        Optional<PreUser> preUser = preUserRepository.findByToken(token);

        return CheckRegisterResponse.builder()
                .isValid(preUser.isPresent())
                .user(preUser.orElse(null))
                .build();
    }

    public void register(RegisterRequest dto) {

        String token = dto.token();
        String password = dto.password();
        String description = dto.description();
        String github = dto.github();
        String instagram = dto.instagram();
        String blog = dto.blog();

        PreUser preUser = preUserRepository.findByToken(token).orElseThrow(InvalidRegisterTokenException::new);
        preUserRepository.delete(preUser);

        User user = User.builder()
                .email(preUser.getEmail())
                .name(preUser.getName())
                .studentId(preUser.getStudentId())
                .password(encoder.encode(password))
                .description(description)
                .social(
                        User.Social.builder()
                                .github(github)
                                .instagram(instagram)
                                .blog(blog)
                                .build()
                )
                .role(User.Role.MEMBER)
                .fee(false)
                .build();
        userRepository.save(user);
    }

    public LoginResponse refresh(RefreshRequest dto) {

        String token = dto.token();

        RefreshToken refreshToken = refreshTokenRepository
                .findByToken(token)
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

        String email = dto.email();

        User user = userRepository.findByEmail(email)
                .orElseThrow(UserNotFoundException::new);

        String passwordResetTokenRaw = UUID.randomUUID().toString();

        PasswordResetToken passwordResetToken = PasswordResetToken.builder()
                .token(passwordResetTokenRaw)
                .userId(user.getId())
                .build();

        passwordResetTokenRepository.save(passwordResetToken);

        emailSender.send(email, PasswordResetTokenTemplate.of(user, passwordResetToken));
    }

    public CheckResetPasswordResponse checkResetPassword(CheckResetPasswordRequest dto) {

        String token = dto.token();

        boolean isVerified = passwordResetTokenRepository.existsByToken(token);

        return CheckResetPasswordResponse.builder()
                .isValid(isVerified)
                .build();
    }

    public void resetPassword(ResetPasswordRequest request) {

        String token = request.token();
        String newPassword = request.newPassword();

        PasswordResetToken passwordResetTokenEntity = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(InvalidPasswordResetTokenException::new);

        passwordResetTokenRepository.delete(passwordResetTokenEntity);

        String userId = passwordResetTokenEntity.userId();

        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        user.setPassword(encoder.encode(newPassword));

        userRepository.save(user);
    }

    public UserResponse me(User user) {

        return UserResponse.builder()
                .user(user)
                .build();
    }
}
