package com.github.kmu_wink.wink_official.domain.user.repository;

import com.github.kmu_wink.wink_official.domain.user.schema.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    @Query(value = "{}", fields = "{ 'fee': 0 }")
    List<User> findAllExcludingFee();

    Optional<User> findByEmail(String email);
}
