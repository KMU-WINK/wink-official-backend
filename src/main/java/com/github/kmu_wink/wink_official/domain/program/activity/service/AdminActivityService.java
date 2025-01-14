package com.github.kmu_wink.wink_official.domain.program.activity.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.github.kmu_wink.wink_official.common.external.aws.s3.S3Service;
import com.github.kmu_wink.wink_official.domain.program.activity.dto.request.CreateActivityRequest;
import com.github.kmu_wink.wink_official.domain.program.activity.dto.response.GetActivitiesPageableResponse;
import com.github.kmu_wink.wink_official.domain.program.activity.dto.response.GetActivityResponse;
import com.github.kmu_wink.wink_official.domain.program.activity.exception.ActivityNotFoundException;
import com.github.kmu_wink.wink_official.domain.program.activity.repository.ActivityRepository;
import com.github.kmu_wink.wink_official.domain.program.activity.schema.Activity;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminActivityService {

	private final ActivityRepository activityRepository;
	private final S3Service s3Service;

	public GetActivitiesPageableResponse getActivities(int page, String query) {

		PageRequest pageRequest = PageRequest.of(page, 20, Sort.by(Sort.Order.desc("pinned"), Sort.Order.desc("createdAt")));
		Page<Activity> activities = activityRepository.findAllSearch(query, pageRequest);

		return GetActivitiesPageableResponse.builder()
			.activities(activities)
			.build();
	}

	public GetActivityResponse createActivity(CreateActivityRequest dto) {

		Activity activity = Activity.builder()
			.title(dto.title())
			.description(dto.description())
			.images(dto.images())
			.pinned(false)
			.build();

		activity = activityRepository.save(activity);

		return GetActivityResponse.builder()
			.activity(activity)
			.build();
	}

	public GetActivityResponse updateActivity(String id, CreateActivityRequest dto) {

		Activity activity = activityRepository.findById(id).orElseThrow(ActivityNotFoundException::new);

		activity.setTitle(dto.title());
		activity.setDescription(dto.description());
		activity.setImages(dto.images());
		activity = activityRepository.save(activity);

		return GetActivityResponse.builder()
			.activity(activity)
			.build();
	}

	public void deleteActivity(String id) {

		Activity activity = activityRepository.findById(id).orElseThrow(ActivityNotFoundException::new);

		activity.getImages().forEach(image -> s3Service.urlToKey(image).ifPresent(s3Service::deleteFile));

		activityRepository.delete(activity);
	}

	public GetActivityResponse pinActivity(String id) {

		Activity activity = activityRepository.findById(id).orElseThrow(ActivityNotFoundException::new);

		activity.setPinned(true);

		activity = activityRepository.save(activity);

		return GetActivityResponse.builder()
			.activity(activity)
			.build();
	}

	public GetActivityResponse unpinActivity(String id) {

		Activity activity = activityRepository.findById(id).orElseThrow(ActivityNotFoundException::new);

		activity.setPinned(false);

		activity = activityRepository.save(activity);

		return GetActivityResponse.builder()
			.activity(activity)
			.build();
	}
}
