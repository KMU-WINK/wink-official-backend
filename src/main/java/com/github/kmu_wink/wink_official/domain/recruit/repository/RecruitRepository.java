package com.github.kmu_wink.wink_official.domain.recruit.repository;

import com.github.kmu_wink.wink_official.domain.recruit.schema.Recruit;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RecruitRepository extends MongoRepository<Recruit, String> {

    Optional<Recruit> findFirstByOrderByYearDescSemesterDesc();
}
