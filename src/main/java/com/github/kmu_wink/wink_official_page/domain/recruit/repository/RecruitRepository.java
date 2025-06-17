package com.github.kmu_wink.wink_official_page.domain.recruit.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.github.kmu_wink.wink_official_page.domain.recruit.schema.Recruit;

@Repository
public interface RecruitRepository extends MongoRepository<Recruit, String> {

    @Query(value = "{}", sort = "{ year: -1, semester: -1 }")
    List<Recruit> findAllWithSort();

    @Aggregation(pipeline = {
        "{ $sort: { year: -1, semester: -1 } }",
        "{ $limit: 1 }"
    })
    Optional<Recruit> findLatestRecruit();

    boolean existsRecruitByYearAndSemester(int year, int semester);
}
