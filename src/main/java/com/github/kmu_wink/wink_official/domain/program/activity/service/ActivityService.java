package com.github.kmu_wink.wink_official.domain.program.activity.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.github.kmu_wink.wink_official.domain.program.activity.dto.response.GetActivitiesResponse;
import com.github.kmu_wink.wink_official.domain.program.activity.repository.ActivityRepository;
import com.github.kmu_wink.wink_official.domain.program.activity.schema.Activity;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ActivityService {

	private final ActivityRepository activityRepository;

	public GetActivitiesResponse getActivities() {

		PageRequest pageRequest = PageRequest.of(0, 6, Sort.by("createdAt").descending());
		Page<Activity> histories = activityRepository.findAll(pageRequest);

		return GetActivitiesResponse.builder()
			.activities(histories)
			.build();
	}
}
