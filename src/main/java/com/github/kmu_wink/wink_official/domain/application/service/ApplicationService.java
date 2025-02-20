package com.github.kmu_wink.wink_official.domain.application.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Stream;

import org.apache.batik.transcoder.TranscoderException;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.github.atomfrede.jadenticon.Jadenticon;
import com.github.kmu_wink.wink_official.common.external.aws.s3.S3Service;
import com.github.kmu_wink.wink_official.domain.application.dto.request.CreateApplicationRequest;
import com.github.kmu_wink.wink_official.domain.application.dto.request.OauthTokenRequest;
import com.github.kmu_wink.wink_official.domain.application.dto.request.UpdateApplicationLoginRequest;
import com.github.kmu_wink.wink_official.domain.application.dto.request.UpdateApplicationRequest;
import com.github.kmu_wink.wink_official.domain.application.dto.response.GetApplicationResponse;
import com.github.kmu_wink.wink_official.domain.application.dto.response.GetApplicationsResponse;
import com.github.kmu_wink.wink_official.domain.application.dto.response.OauthLoginResponse;
import com.github.kmu_wink.wink_official.domain.application.dto.response.OauthTokenResponse;
import com.github.kmu_wink.wink_official.domain.application.exception.ApplicationNotFoundException;
import com.github.kmu_wink.wink_official.domain.application.exception.ApplicationSecretWrongException;
import com.github.kmu_wink.wink_official.domain.application.exception.OauthIsNotSupportedException;
import com.github.kmu_wink.wink_official.domain.application.exception.OauthTokenNotFoundException;
import com.github.kmu_wink.wink_official.domain.application.repository.ApplicationRepository;
import com.github.kmu_wink.wink_official.domain.application.repository.OauthLoginRedisRepository;
import com.github.kmu_wink.wink_official.domain.application.schema.Application;
import com.github.kmu_wink.wink_official.domain.application.schema.OauthLogin;
import com.github.kmu_wink.wink_official.domain.application.util.RandomString;
import com.github.kmu_wink.wink_official.domain.program.upload.dto.response.UploadImageResponse;
import com.github.kmu_wink.wink_official.domain.user.exception.UserNotFoundException;
import com.github.kmu_wink.wink_official.domain.user.repository.UserRepository;
import com.github.kmu_wink.wink_official.domain.user.schema.User;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final OauthLoginRedisRepository oauthLoginRedisRepository;

    private final S3Service s3Service;
    private final RandomString randomString;
    private final UserRepository userRepository;

    public GetApplicationsResponse getApplications(User user) {

        List<Application> applications = applicationRepository.findAllByUser(user);

        return GetApplicationsResponse.builder()
            .applications(applications)
            .build();
    }

    public GetApplicationResponse getApplication(User user, String id) {

        Application application = applicationRepository.findById(id).orElseThrow(ApplicationNotFoundException::new);

        if (!application.getUser().equals(user)) {

            application.setSecret(null);
            application.setUser(null);
        }

        return GetApplicationResponse.builder()
            .application(application)
            .build();
    }

    @SneakyThrows({IOException.class, TranscoderException.class})
    public GetApplicationResponse createApplication(User user, CreateApplicationRequest dto) {

        String id = ObjectId.get().toHexString();

        Application application = Application.builder()
            .id(id)
            .createdAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .name(dto.name())
            .img(s3Service.upload("application/%s.png".formatted(id), Jadenticon.from(id).png()))
            .secret(randomString.generate(96))
            .user(user)
            .login(Application.Login.empty())
            .build();

        application = applicationRepository.save(application);

        return GetApplicationResponse.builder()
            .application(application)
            .build();
    }

    public UploadImageResponse uploadImg() {

        String url = s3Service.generatePresignedUrl("application/%s".formatted(UUID.randomUUID().toString()));

        return UploadImageResponse.builder()
            .url(url)
            .build();
    }

    public GetApplicationResponse updateApplication(User user, String id, UpdateApplicationRequest dto) {

        Application application = applicationRepository.findById(id).orElseThrow(ApplicationNotFoundException::new);

        if (!application.getUser().equals(user)) throw new ApplicationNotFoundException();

        if (!application.getImg().equals(dto.img())) {

            s3Service.urlToKey(application.getImg()).ifPresent(s3Service::deleteFile);
        }

        application.setName(dto.name());
        application.setImg(dto.img());

        application = applicationRepository.save(application);

        return GetApplicationResponse.builder()
            .application(application)
            .build();
    }

    public GetApplicationResponse resetSecret(User user, String id) {

        Application application = applicationRepository.findById(id).orElseThrow(ApplicationNotFoundException::new);

        if (!application.getUser().equals(user)) throw new ApplicationNotFoundException();

        application.setSecret(randomString.generate(96));

        application = applicationRepository.save(application);

        return GetApplicationResponse.builder()
            .application(application)
            .build();
    }

    public GetApplicationResponse updateApplicationLogin(User user, String id, UpdateApplicationLoginRequest dto) {

        Application application = applicationRepository.findById(id).orElseThrow(ApplicationNotFoundException::new);

        if (!application.getUser().equals(user)) throw new ApplicationNotFoundException();

        application.getLogin().setEnable(dto.enable());
        application.getLogin().setUrls(dto.urls());
        application.getLogin().setScopes(
            Stream.concat(dto.scopes().stream(), Stream.of("UUID"))
                .map(Application.Login.Scope::valueOf)
                .distinct()
                .sorted(Comparator.comparingInt(Enum::ordinal))
                .toList());

        application = applicationRepository.save(application);

        return GetApplicationResponse.builder()
            .application(application)
            .build();
    }

    public void deleteApplication(User user, String id) {

        Application application = applicationRepository.findById(id).orElseThrow(ApplicationNotFoundException::new);

        if (!application.getUser().equals(user)) throw new ApplicationNotFoundException();

        s3Service.urlToKey(application.getImg()).ifPresent(s3Service::deleteFile);

        applicationRepository.delete(application);
    }

    public OauthLoginResponse oauthLogin(User user, String id) {

        Application application = applicationRepository.findById(id).orElseThrow(ApplicationNotFoundException::new);

        if (!application.getLogin().isEnable()) throw new OauthIsNotSupportedException();

        OauthLogin oauthLogin = OauthLogin.builder()
            .token(randomString.generate(128))
            .clientId(application.getId())
            .userId(user.getId())
            .scopes(application.getLogin().getScopes())
            .build();

        oauthLoginRedisRepository.save(oauthLogin);

        return OauthLoginResponse.builder()
            .token(oauthLogin.token())
            .build();
    }

    public OauthTokenResponse oauthToken(OauthTokenRequest dto) {

        Application application = applicationRepository.findById(dto.clientId()).orElseThrow(ApplicationNotFoundException::new);

        if (!application.getSecret().equals(dto.clientSecret())) throw new ApplicationSecretWrongException();

        OauthLogin oauthLogin = oauthLoginRedisRepository.findByToken(dto.token()).orElseThrow(OauthTokenNotFoundException::new);

        if (!oauthLogin.clientId().equals(dto.clientId())) throw new OauthTokenNotFoundException();

        oauthLoginRedisRepository.delete(oauthLogin);

        User raw = userRepository.findById(oauthLogin.userId()).orElseThrow(UserNotFoundException::new);

        Map<String, Object> user = new HashMap<>();

        if (oauthLogin.scopes().contains(Application.Login.Scope.UUID)) user.put("id", raw.getId());
        if (oauthLogin.scopes().contains(Application.Login.Scope.EMAIL)) user.put("email", raw.getEmail());
        if (oauthLogin.scopes().contains(Application.Login.Scope.NAME)) user.put("name", raw.getName());
        if (oauthLogin.scopes().contains(Application.Login.Scope.STUDENT_ID)) user.put("studentId", raw.getStudentId());
        if (oauthLogin.scopes().contains(Application.Login.Scope.DEPARTMENT)) user.put("department", raw.getDescription());
        if (oauthLogin.scopes().contains(Application.Login.Scope.PHONE_NUMBER)) user.put("phoneNumber", raw.getPassword());
        if (oauthLogin.scopes().contains(Application.Login.Scope.AVATAR)) user.put("avatar", raw.getAvatar());
        if (oauthLogin.scopes().contains(Application.Login.Scope.DESCRIPTION)) user.put("description", raw.getDescription());
        if (oauthLogin.scopes().contains(Application.Login.Scope.SOCIAL)) user.put("social", raw.getStudentId());
        if (oauthLogin.scopes().contains(Application.Login.Scope.ROLE)) user.put("role", raw.getRole());
        if (oauthLogin.scopes().contains(Application.Login.Scope.FEE)) user.put("fee", raw.isFee());

        return OauthTokenResponse.builder()
            .user(user)
            .scopes(oauthLogin.scopes())
            .build();
    }
}
