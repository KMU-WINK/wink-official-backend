package com.github.kmu_wink.wink_official.domain.application.repository;

import java.util.Optional;

import org.springframework.data.keyvalue.repository.KeyValueRepository;
import org.springframework.stereotype.Repository;

import com.github.kmu_wink.wink_official.domain.application.schema.OauthLogin;

@Repository
public interface OauthLoginRedisRepository extends KeyValueRepository<OauthLogin, Long> {
    
    Optional<OauthLogin> findByToken(String token);
}
