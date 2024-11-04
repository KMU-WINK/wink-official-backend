package com.github.kmu_wink.wink_official.domain.custom.recruit_qna.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.github.kmu_wink.wink_official.domain.custom.recruit_qna.schema.RecruitQna;

public interface RecruitQnaRepository extends MongoRepository<RecruitQna, String> {
}
