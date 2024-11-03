package com.github.kmu_wink.wink_official.domain.auth.repository;

import com.github.kmu_wink.wink_official.domain.auth.schema.PasswordResetToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PasswordResetTokenRepository extends CrudRepository<PasswordResetToken, Long> {

    Optional<PasswordResetToken> findByToken(String token);

    boolean existsByToken(String token);
}
