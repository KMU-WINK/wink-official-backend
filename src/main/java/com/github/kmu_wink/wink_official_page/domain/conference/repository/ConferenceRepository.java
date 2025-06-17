package com.github.kmu_wink.wink_official_page.domain.conference.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.github.kmu_wink.wink_official_page.domain.conference.schema.Conference;

public interface ConferenceRepository extends MongoRepository<Conference, String> {

	@Query("{'date': {'$gte': ?0, '$lt': ?1}}")
	List<Conference> findAllByDateBetween(LocalDateTime startOfYear, LocalDateTime startOfNextYear, Sort sort);
}
