package com.github.kmu_wink.wink_official.domain.recruit.repository;

import com.github.kmu_wink.wink_official.domain.recruit.schema.Application;
import com.github.kmu_wink.wink_official.domain.recruit.schema.Recruit;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ApplicationRepository extends MongoRepository<Application, String> {

    Optional<Application> findByRecruitAndStudentId(Recruit recruit, String studentId);
    Optional<Application> findByRecruitAndEmail(Recruit recruit, String email);
    Optional<Application> findByRecruitAndPhoneNumber(Recruit recruit, String phoneNumber);
}
