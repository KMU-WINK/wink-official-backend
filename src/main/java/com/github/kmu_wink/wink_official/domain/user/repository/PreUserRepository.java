package com.github.kmu_wink.wink_official.domain.user.repository;

import com.github.kmu_wink.wink_official.domain.user.schema.PreUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PreUserRepository extends MongoRepository<PreUser, String> {

    Page<PreUser> findAllByNameRegexOrStudentIdRegexOrEmailRegexOrPhoneNumberRegex(String nameRegex, String studentIdRegex, String emailRegex, String phoneNumberRegex, Pageable pageable);

    Optional<PreUser> findByToken(String token);
    Optional<PreUser> findByStudentId(String studentId);
    Optional<PreUser> findByEmail(String email);
    Optional<PreUser> findByPhoneNumber(String phoneNumber);
}
