package com.github.kmu_wink.wink_official_page.domain.auth.repository;

import com.github.kmu_wink.wink_official_page.domain.auth.schema.PasswordResetToken;
import org.springframework.data.keyvalue.repository.KeyValueRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PasswordResetTokenRedisRepository extends KeyValueRepository<PasswordResetToken, Long> {

    Optional<PasswordResetToken> findByToken(String token);
}
