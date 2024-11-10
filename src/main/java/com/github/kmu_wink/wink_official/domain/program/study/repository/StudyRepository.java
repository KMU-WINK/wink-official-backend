package com.github.kmu_wink.wink_official.domain.program.study.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.github.kmu_wink.wink_official.domain.program.study.schema.Study;

@Repository
public interface StudyRepository extends MongoRepository<Study, String> {

	@Query("{ $or: [ {'title': { $regex: ?0 }}, {'author': { $regex: ?0 }} ]}")
	Page<Study> findAllSearch(String query, Pageable pageable);

	@Query("{ 'category': ?0, $or: [ {'title': { $regex: ?1 }}, {'author': { $regex: ?1 }} ]}")
	Page<Study> findAllByCategoryAndSearch(String category, String query, Pageable pageable);

	Optional<Study> findTopByOrderByIndexDesc();
}
