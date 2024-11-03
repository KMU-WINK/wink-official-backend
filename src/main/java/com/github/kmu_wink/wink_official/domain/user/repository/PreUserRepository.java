package com.github.kmu_wink.wink_official.domain.user.repository;

import com.github.kmu_wink.wink_official.domain.user.schema.PreUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PreUserRepository extends MongoRepository<PreUser, String> {

    Optional<PreUser> findByToken(String token);
}
