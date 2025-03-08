package com.github.son_daehyeon.domain.user.repository;

import com.github.son_daehyeon.domain.user.schema.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
