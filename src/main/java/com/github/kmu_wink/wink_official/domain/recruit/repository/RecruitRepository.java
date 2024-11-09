package com.github.kmu_wink.wink_official.domain.recruit.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.github.kmu_wink.wink_official.domain.recruit.schema.Recruit;

public interface RecruitRepository extends MongoRepository<Recruit, String> {

    List<Recruit> findAllByOrderByYearDescSemesterDesc();

    Optional<Recruit> findFirstByOrderByYearDescSemesterDesc();
}
