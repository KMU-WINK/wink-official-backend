package com.github.kmu_wink.wink_official.domain.user.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.github.kmu_wink.wink_official.domain.user.schema.PreUser;

@Repository
public interface PreUserRepository extends MongoRepository<PreUser, String> {

    @Query("{ $or: [ {'name': { $regex: ?0 }}, {'studentId': { $regex: ?0 }}, {'email': { $regex: ?0 }}, {'phoneNumber': { $regex: ?0 }} ]}")
    Page<PreUser> findAllSearch(String query, Pageable pageable);

    Optional<PreUser> findByToken(String token);
    Optional<PreUser> findByStudentId(String studentId);
    Optional<PreUser> findByEmail(String email);
    Optional<PreUser> findByPhoneNumber(String phoneNumber);
}
