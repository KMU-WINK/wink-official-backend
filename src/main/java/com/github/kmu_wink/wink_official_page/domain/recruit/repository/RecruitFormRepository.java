package com.github.kmu_wink.wink_official_page.domain.recruit.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.github.kmu_wink.wink_official_page.domain.recruit.schema.RecruitForm;
import com.github.kmu_wink.wink_official_page.domain.recruit.schema.Recruit;

public interface RecruitFormRepository extends MongoRepository<RecruitForm, String> {

    List<RecruitForm> findAllByRecruitOrderByCreatedAtDesc(Recruit recruit);

    List<RecruitForm> findAllByRecruit(Recruit recruit);

    Optional<RecruitForm> findByIdAndRecruit(String id, Recruit recruit);
    Optional<RecruitForm> findByRecruitAndStudentId(Recruit recruit, String studentId);
    Optional<RecruitForm> findByRecruitAndEmail(Recruit recruit, String email);
    Optional<RecruitForm> findByRecruitAndPhoneNumber(Recruit recruit, String phoneNumber);
}
