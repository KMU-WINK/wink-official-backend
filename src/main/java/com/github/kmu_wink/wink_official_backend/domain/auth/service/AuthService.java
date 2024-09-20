package com.github.kmu_wink.wink_official_backend.domain.auth.service;

import com.github.kmu_wink.wink_official_backend.common.email.EmailSender;
import com.github.kmu_wink.wink_official_backend.common.security.authentication.UserAuthentication;
import com.github.kmu_wink.wink_official_backend.common.security.jwt.JwtUtil;
import com.github.kmu_wink.wink_official_backend.domain.auth.dto.request.*;
import com.github.kmu_wink.wink_official_backend.domain.auth.dto.response.CheckVerifyCodeResponse;
import com.github.kmu_wink.wink_official_backend.domain.auth.dto.response.LoginResponse;
import com.github.kmu_wink.wink_official_backend.domain.auth.dto.response.VerifyResetPasswordResponse;
import com.github.kmu_wink.wink_official_backend.domain.auth.email.PasswordResetTokenTemplate;
import com.github.kmu_wink.wink_official_backend.domain.auth.email.VerifyCodeTemplate;
import com.github.kmu_wink.wink_official_backend.domain.auth.exception.*;
import com.github.kmu_wink.wink_official_backend.domain.auth.repository.PasswordResetTokenRepository;
import com.github.kmu_wink.wink_official_backend.domain.auth.repository.RefreshTokenRepository;
import com.github.kmu_wink.wink_official_backend.domain.auth.repository.VerifyCodeRepository;
import com.github.kmu_wink.wink_official_backend.domain.auth.schema.PasswordResetToken;
import com.github.kmu_wink.wink_official_backend.domain.auth.schema.RefreshToken;
import com.github.kmu_wink.wink_official_backend.domain.auth.schema.VerifyCode;
import com.github.kmu_wink.wink_official_backend.domain.user.dto.response.UserResponse;
import com.github.kmu_wink.wink_official_backend.domain.user.exception.NotApprovedUserException;
import com.github.kmu_wink.wink_official_backend.domain.user.exception.UserNotFoundException;
import com.github.kmu_wink.wink_official_backend.domain.user.repository.UserRepository;
import com.github.kmu_wink.wink_official_backend.domain.user.schema.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final VerifyCodeRepository verifyCodeRepository;
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
        Authentication authenticate = authenticationManager.authenticate(authentication);

        assert authenticate.isAuthenticated();

        if (!user.isApproved()) {

            throw new NotApprovedUserException();
        }

        String accessToken = jwtUtil.generateAccessToken(user);
        String refreshToken = jwtUtil.generateRefreshToken(user);

        return LoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public void register(RegisterRequest dto) {

        String email = dto.email();
        String password = dto.password();
        String name = dto.name();
        String studentId = dto.studentId();
        String verifyCodeRaw = dto.verifyCode();

        if (userRepository.existsByEmail(email)) {

            throw new AlreadyRegisteredEmailException();
        }

        if (userRepository.existsByStudentId(studentId)) {

            throw new AlreadyRegisteredStudentIdException();
        }

        VerifyCode verifyCode = verifyCodeRepository.findByEmail(email)
                .orElseThrow(InvalidVerifyCodeException::new);

        if (!verifyCode.code().equals(verifyCodeRaw)) {

            throw new InvalidVerifyCodeException();
        }

        verifyCodeRepository.delete(verifyCode);

        User user = User.builder()
                .email(email)
                .password(encoder.encode(password))
                .name(name)
                .studentId(studentId)
                .social(User.Social.empty())
                .build();

        userRepository.save(user);
    }

    public void sendVerifyCode(SendVerifyCodeRequest dto) {

        String email = dto.email();

        if (userRepository.existsByEmail(email)) {

            throw new AlreadyRegisteredEmailException();
        }

        VerifyCode verifyCode = verifyCodeRepository.findByEmail(email)
                .orElseGet(() -> {
                    String verifyCodeRaw = IntStream.range(0, 6)
                            .mapToObj(i -> String.valueOf("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt((int) (Math.random() * 36))))
                            .collect(java.util.stream.Collectors.joining());

                    VerifyCode internalVerifyCode = VerifyCode.builder()
                            .email(email)
                            .code(verifyCodeRaw)
                            .build();

                    verifyCodeRepository.save(internalVerifyCode);

                    return internalVerifyCode;
                });

        emailSender.send(email, VerifyCodeTemplate.of(email, verifyCode.code()));
    }

    public CheckVerifyCodeResponse checkVerifyCode(CheckVerifyCodeRequest dto) {

        String email = dto.email();
        String verifyCodeRaw = dto.verifyCode();

        boolean isVerified = verifyCodeRepository.findByEmail(email)
                .map(verifyCode -> verifyCode.code().equals(verifyCodeRaw))
                .orElse(false);

        return CheckVerifyCodeResponse.builder()
                .isVerified(isVerified)
                .build();
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

        emailSender.send(email, PasswordResetTokenTemplate.of(email, passwordResetTokenRaw));
    }

    public VerifyResetPasswordResponse verifyResetPassword(VerifyResetPasswordRequest dto) {

        String passwordResetToken = dto.passwordResetToken();

        boolean isVerified = passwordResetTokenRepository.existsByToken(passwordResetToken);

        return VerifyResetPasswordResponse.builder()
                .isVerified(isVerified)
                .build();
    }

    public void confirmResetPassword(ConfirmResetPasswordRequest request) {

        String passwordResetToken = request.passwordResetToken();
        String newPassword = request.newPassword();

        PasswordResetToken passwordResetTokenEntity = passwordResetTokenRepository.findByToken(passwordResetToken)
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
