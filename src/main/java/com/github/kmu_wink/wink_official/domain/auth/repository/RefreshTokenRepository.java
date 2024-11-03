package com.github.kmu_wink.wink_official.domain.auth.repository;

import com.github.kmu_wink.wink_official.domain.auth.schema.RefreshToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends CrudRepository<RefreshToken, Long> {
    
    Optional<RefreshToken> findByToken(String token);
}
