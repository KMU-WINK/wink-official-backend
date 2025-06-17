package com.github.kmu_wink.wink_official_page.domain.auth.service;

import com.github.kmu_wink.wink_official_page.domain.application.util.RandomString;
import com.github.kmu_wink.wink_official_page.domain.auth.dto.request.CheckRegisterRequest;
import com.github.kmu_wink.wink_official_page.domain.auth.dto.request.CheckResetPasswordRequest;
import com.github.kmu_wink.wink_official_page.domain.auth.dto.request.LoginRequest;
import com.github.kmu_wink.wink_official_page.domain.auth.dto.request.RefreshRequest;
import com.github.kmu_wink.wink_official_page.domain.auth.dto.request.RegisterRequest;
import com.github.kmu_wink.wink_official_page.domain.auth.dto.request.RequestResetPasswordRequest;
import com.github.kmu_wink.wink_official_page.domain.auth.dto.request.ResetPasswordRequest;
import com.github.kmu_wink.wink_official_page.domain.auth.dto.response.CheckRegisterResponse;
import com.github.kmu_wink.wink_official_page.domain.auth.dto.response.CheckResetPasswordResponse;
import com.github.kmu_wink.wink_official_page.domain.auth.dto.response.LoginResponse;
import com.github.kmu_wink.wink_official_page.domain.auth.exception.AlreadyRegisteredException;
import com.github.kmu_wink.wink_official_page.domain.auth.exception.AuthenticationFailException;
import com.github.kmu_wink.wink_official_page.domain.auth.exception.InvalidPasswordResetTokenException;
import com.github.kmu_wink.wink_official_page.domain.auth.exception.InvalidRefreshTokenException;
import com.github.kmu_wink.wink_official_page.domain.auth.exception.InvalidRegisterTokenException;
import com.github.kmu_wink.wink_official_page.domain.auth.exception.TestUserCannotRealRegisterException;
import com.github.kmu_wink.wink_official_page.domain.auth.repository.PasswordResetTokenRedisRepository;
import com.github.kmu_wink.wink_official_page.domain.auth.repository.RefreshTokenRedisRepository;
import com.github.kmu_wink.wink_official_page.domain.auth.schema.PasswordResetToken;
import com.github.kmu_wink.wink_official_page.domain.auth.schema.RefreshToken;
import com.github.kmu_wink.wink_official_page.domain.auth.util.email.PasswordResetTokenTemplate;
import com.github.kmu_wink.wink_official_page.domain.user.dto.response.UserResponse;
import com.github.kmu_wink.wink_official_page.domain.user.exception.UserNotFoundException;
import com.github.kmu_wink.wink_official_page.domain.user.repository.PreUserRepository;
import com.github.kmu_wink.wink_official_page.domain.user.repository.UserRepository;
import com.github.kmu_wink.wink_official_page.domain.user.schema.PreUser;
import com.github.kmu_wink.wink_official_page.domain.user.schema.User;
import com.github.kmu_wink.wink_official_page.global.module.email.EmailSender;
import com.github.kmu_wink.wink_official_page.global.security.authentication.UserAuthentication;
import com.github.kmu_wink.wink_official_page.global.security.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PreUserRepository preUserRepository;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;
    private final PasswordResetTokenRedisRepository passwordResetTokenRedisRepository;

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    private final EmailSender emailSender;

    private final RandomString randomString;

    public LoginResponse login(LoginRequest dto) {

        User user = userRepository.findByEmail(dto.email()).orElseThrow(AuthenticationFailException::new);

        UserAuthentication authentication = new UserAuthentication(user, dto.password());
        authenticationManager.authenticate(authentication);

        String accessToken = jwtUtil.generateAccessToken(user);
        String refreshToken = jwtUtil.generateRefreshToken(user);

        return LoginResponse.builder().accessToken(accessToken).refreshToken(refreshToken).build();
    }

    public CheckRegisterResponse checkRegister(CheckRegisterRequest dto) {

        Optional<PreUser> preUser = preUserRepository.findByToken(dto.token());

        return CheckRegisterResponse.builder().isValid(preUser.isPresent()).user(preUser.orElse(null)).build();
    }

    public void register(RegisterRequest dto) {

        PreUser preUser = preUserRepository.findByToken(dto.token()).orElseThrow(InvalidRegisterTokenException::new);

        preUserRepository.delete(preUser);

        if (preUser.isTest()) {

            throw new TestUserCannotRealRegisterException();
        }

        if (userRepository.findByEmail(preUser.getEmail()).isPresent() ||
                userRepository.findByStudentId(preUser.getStudentId()).isPresent() ||
                userRepository.findByPhoneNumber(preUser.getPhoneNumber()).isPresent()) {

            throw new AlreadyRegisteredException();
        }

        User user = User.builder()
                .email(preUser.getEmail())
                .name(preUser.getName())
                .studentId(preUser.getStudentId())
                .department(preUser.getDepartment())
                .phoneNumber(preUser.getPhoneNumber())
                .password(encoder.encode(dto.password()))
                .social(User.Social.builder().build())
                .role(User.Role.MEMBER)
                .fee(false)
                .build();

        userRepository.save(user);
    }

    public LoginResponse refresh(RefreshRequest dto) {

        RefreshToken refreshToken = refreshTokenRedisRepository.findByToken(dto.token())
                .orElseThrow(InvalidRefreshTokenException::new);

        refreshTokenRedisRepository.delete(refreshToken);

        String userId = refreshToken.userId();

        String accessToken = jwtUtil.generateAccessToken(userId);
        String newRefreshToken = jwtUtil.generateRefreshToken(userId);

        return LoginResponse.builder().accessToken(accessToken).refreshToken(newRefreshToken).build();
    }

    public void requestResetPassword(RequestResetPasswordRequest dto) {

        userRepository.findByEmail(dto.email()).ifPresent((user) -> {
            String passwordResetTokenRaw = randomString.generate(128);

            PasswordResetToken passwordResetToken = PasswordResetToken.builder()
                    .token(passwordResetTokenRaw)
                    .userId(user.getId())
                    .build();

            passwordResetTokenRedisRepository.save(passwordResetToken);

            emailSender.send(dto.email(), PasswordResetTokenTemplate.of(user, passwordResetToken));
        });
    }

    public CheckResetPasswordResponse checkResetPassword(CheckResetPasswordRequest dto) {

        boolean isVerified = passwordResetTokenRedisRepository.findByToken(dto.token()).isPresent();

        return CheckResetPasswordResponse.builder().isValid(isVerified).build();
    }

    public void resetPassword(ResetPasswordRequest request) {

        PasswordResetToken passwordResetTokenEntity = passwordResetTokenRedisRepository.findByToken(request.token())
                .orElseThrow(InvalidPasswordResetTokenException::new);

        passwordResetTokenRedisRepository.delete(passwordResetTokenEntity);

        String userId = passwordResetTokenEntity.userId();

        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        user.setPassword(encoder.encode(request.newPassword()));

        userRepository.save(user);
    }

    public UserResponse me(User user) {

        return UserResponse.builder().user(user).build();
    }
}
