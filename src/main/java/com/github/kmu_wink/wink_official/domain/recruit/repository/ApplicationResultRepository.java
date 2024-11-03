package com.github.kmu_wink.wink_official.domain.recruit.repository;

import com.github.kmu_wink.wink_official.domain.recruit.schema.ApplicationResult;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ApplicationResultRepository extends MongoRepository<ApplicationResult, String> {
}
