package com.github.kmu_wink.wink_official_page.domain.program.activity.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.github.kmu_wink.wink_official_page.domain.program.activity.dto.response.GetActivitiesResponse;
import com.github.kmu_wink.wink_official_page.domain.program.activity.repository.ActivityRepository;
import com.github.kmu_wink.wink_official_page.domain.program.activity.schema.Activity;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ActivityService {

	private final ActivityRepository activityRepository;

	public GetActivitiesResponse getActivities() {

		List<Activity> histories = activityRepository.findAllPinned();

		return GetActivitiesResponse.builder()
			.activities(histories)
			.build();
	}
}
