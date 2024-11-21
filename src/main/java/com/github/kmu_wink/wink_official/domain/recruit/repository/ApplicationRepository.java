package com.github.kmu_wink.wink_official.domain.recruit.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.github.kmu_wink.wink_official.domain.recruit.schema.Application;
import com.github.kmu_wink.wink_official.domain.recruit.schema.Recruit;

public interface ApplicationRepository extends MongoRepository<Application, String> {

    List<Application> findAllByRecruitOrderByCreatedAtDesc(Recruit recruit);

    List<Application> findAllByRecruit(Recruit recruit);

    Optional<Application> findByIdAndRecruit(String id, Recruit recruit);
    Optional<Application> findByRecruitAndStudentId(Recruit recruit, String studentId);
    Optional<Application> findByRecruitAndEmail(Recruit recruit, String email);
    Optional<Application> findByRecruitAndPhoneNumber(Recruit recruit, String phoneNumber);
}
