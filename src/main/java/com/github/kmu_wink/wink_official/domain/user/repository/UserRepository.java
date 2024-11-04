package com.github.kmu_wink.wink_official.domain.user.repository;

import com.github.kmu_wink.wink_official.domain.user.schema.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    @Query(value = "{ 'active': true }", fields = "{ 'fee': 0 }")
    List<User> findAllActiveIsTrueAndExcludingFee();
    Page<User> findAllByNameRegexOrStudentIdRegexOrEmailRegexOrPhoneNumberRegex(String nameRegex, String studentIdRegex, String emailRegex, String phoneNumberRegex, Pageable pageable);

    Optional<User> findByStudentId(String studentId);
    Optional<User> findByEmail(String email);
    Optional<User> findByPhoneNumber(String phoneNumber);
}
