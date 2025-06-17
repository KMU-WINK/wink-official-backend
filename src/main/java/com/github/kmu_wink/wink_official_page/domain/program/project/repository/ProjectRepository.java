package com.github.kmu_wink.wink_official_page.domain.program.project.repository;

import com.github.kmu_wink.wink_official_page.domain.program.project.schema.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {

    @Query(value = "{ $or: [ {'title': { $regex: ?0 }} ]}", fields = "{ 'content': 0 }")
    Page<Project> findAllSearch(String query, Pageable pageable);
}
