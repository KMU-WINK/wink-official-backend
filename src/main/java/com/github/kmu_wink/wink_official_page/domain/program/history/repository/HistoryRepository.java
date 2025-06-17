package com.github.kmu_wink.wink_official_page.domain.program.history.repository;

import com.github.kmu_wink.wink_official_page.domain.program.history.schema.History;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRepository extends MongoRepository<History, String> {

    @Query(value = "{}", sort = "{ date: -1 }")
    List<History> findAllWithSort();
}
