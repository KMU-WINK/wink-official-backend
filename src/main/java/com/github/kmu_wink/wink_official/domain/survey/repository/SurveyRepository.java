package com.github.kmu_wink.wink_official.domain.survey.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.github.kmu_wink.wink_official.domain.survey.schema.Survey;

@Repository
public interface SurveyRepository extends MongoRepository<Survey, String> {
}
