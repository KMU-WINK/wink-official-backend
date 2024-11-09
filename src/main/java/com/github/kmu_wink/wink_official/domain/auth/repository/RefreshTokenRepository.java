package com.github.kmu_wink.wink_official.domain.auth.repository;

import java.util.Optional;

import org.springframework.data.keyvalue.repository.KeyValueRepository;
import org.springframework.stereotype.Repository;

import com.github.kmu_wink.wink_official.domain.auth.schema.RefreshToken;

@Repository
public interface RefreshTokenRepository extends KeyValueRepository<RefreshToken, Long> {
    
    Optional<RefreshToken> findByToken(String token);
}
