package com.github.kmu_wink.wink_official_page.domain.recruit.admin.sms.repository;

import com.github.kmu_wink.wink_official_page.domain.recruit.admin.sms.schema.RecruitSms;
import com.github.kmu_wink.wink_official_page.domain.recruit.schema.Recruit;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruitSmsRepository extends MongoRepository<RecruitSms, String> {

    RecruitSms findByRecruit(Recruit recruit);
}
