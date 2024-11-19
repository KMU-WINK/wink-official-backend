package com.github.kmu_wink.wink_official.domain.user.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.github.kmu_wink.wink_official.domain.user.schema.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    @Query(value = "{}", fields = "{ 'fee': 0 }")
    List<User> findAllWithMask();

    @Query("{ $or: [ {'name': { $regex: ?0 }}, {'studentId': { $regex: ?0 }}, {'email': { $regex: ?0 }}, {'phoneNumber': { $regex: ?0 }} ]}")
    Page<User> findAllSearch(String query, Pageable pageable);

    Optional<User> findByStudentId(String studentId);
    Optional<User> findByEmail(String email);
    Optional<User> findByPhoneNumber(String phoneNumber);
}
