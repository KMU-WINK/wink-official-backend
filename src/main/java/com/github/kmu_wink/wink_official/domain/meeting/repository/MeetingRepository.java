package com.github.kmu_wink.wink_official.domain.meeting.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.github.kmu_wink.wink_official.domain.meeting.schema.Meeting;

@Repository
public interface MeetingRepository extends MongoRepository<Meeting, String> {
}
