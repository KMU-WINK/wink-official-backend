package com.github.kmu_wink.wink_official_page.domain.application.repository;

import com.github.kmu_wink.wink_official_page.domain.application.schema.Application;
import com.github.kmu_wink.wink_official_page.domain.user.schema.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ApplicationRepository extends MongoRepository<Application, String> {

    List<Application> findAllByUser(User user);
}
