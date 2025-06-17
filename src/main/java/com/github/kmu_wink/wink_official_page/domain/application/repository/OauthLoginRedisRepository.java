package com.github.kmu_wink.wink_official_page.domain.application.repository;

import com.github.kmu_wink.wink_official_page.domain.application.schema.OauthLogin;
import org.springframework.data.keyvalue.repository.KeyValueRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OauthLoginRedisRepository extends KeyValueRepository<OauthLogin, Long> {

    Optional<OauthLogin> findByToken(String token);
}
