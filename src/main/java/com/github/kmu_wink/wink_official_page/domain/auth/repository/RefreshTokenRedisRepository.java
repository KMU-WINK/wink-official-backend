package com.github.kmu_wink.wink_official_page.domain.auth.repository;

import java.util.Optional;

import org.springframework.data.keyvalue.repository.KeyValueRepository;
import org.springframework.stereotype.Repository;

import com.github.kmu_wink.wink_official_page.domain.auth.schema.RefreshToken;

@Repository
public interface RefreshTokenRedisRepository extends KeyValueRepository<RefreshToken, Long> {
    
    Optional<RefreshToken> findByToken(String token);
}
