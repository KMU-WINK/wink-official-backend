package com.github.kmu_wink.wink_official_backend.domain.user.repository;

import com.github.kmu_wink.wink_official_backend.domain.user.schema.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    List<User> findAllByApprovedTrue(Sort sort);

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByStudentId(String studentId);
}
