package com.github.kmu_wink.wink_official.domain.program.history.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.github.kmu_wink.wink_official.domain.program.history.schema.History;

@Repository
public interface HistoryRepository extends MongoRepository<History, String> {

	@Query("{ $or: [ {'title': { $regex: ?0 }}, {'description': { $regex: ?0 }} ]}")
	Page<History> findAllSearch(String query, Pageable pageable);

	@Query(value = "{}", sort = "{ date: -1 }")
	List<History> findAllWithSort();
}
