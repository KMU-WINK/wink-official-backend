package com.github.kmu_wink.wink_official_page.domain.program.activity.repository;

import com.github.kmu_wink.wink_official_page.domain.program.activity.schema.Activity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityRepository extends MongoRepository<Activity, String> {

    @Query("{ $or: [ {'title': { $regex: ?0 }}, {'description': { $regex: ?0 }} ]}")
    Page<Activity> findAllSearch(String query, Pageable pageable);

    @Query("{ 'pinned': true }")
    List<Activity> findAllPinned();
}
