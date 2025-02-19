package com.github.kmu_wink.wink_official.domain.recruit.admin.sms.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.github.kmu_wink.wink_official.domain.recruit.admin.sms.schema.RecruitSms;
import com.github.kmu_wink.wink_official.domain.recruit.schema.Recruit;

@Repository
public interface RecruitSmsRepository extends MongoRepository<RecruitSms, String> {

    RecruitSms findByRecruit(Recruit recruit);
}
