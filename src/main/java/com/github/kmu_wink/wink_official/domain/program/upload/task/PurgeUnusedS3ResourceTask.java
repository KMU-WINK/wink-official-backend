package com.github.kmu_wink.wink_official.domain.program.upload.task;

import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.github.kmu_wink.wink_official.common.external.aws.s3.S3Service;
import com.github.kmu_wink.wink_official.domain.program.activity.repository.ActivityRepository;
import com.github.kmu_wink.wink_official.domain.program.history.repository.HistoryRepository;
import com.github.kmu_wink.wink_official.domain.program.history.schema.History;
import com.github.kmu_wink.wink_official.domain.program.project.repository.ProjectRepository;
import com.github.kmu_wink.wink_official.domain.program.project.schema.Project;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class PurgeUnusedS3ResourceTask {

	private final ActivityRepository activityRepository;
	private final HistoryRepository historyRepository;
	private final ProjectRepository projectRepository;

	private final S3Service s3Service;

	@PostConstruct
	@Scheduled(cron = "0 0 0 * * *")
	private void run() {

		List<String> list1 = activityRepository.findAll()
			.stream()
			.flatMap(activity -> activity.getImages().stream())
			.toList();

		List<String> list2 = historyRepository.findAll()
			.stream()
			.map(History::getImage)
			.toList();

		List<String> list3 = projectRepository.findAll()
			.stream()
			.map(Project::getImage)
			.toList();

		List<String> targets = s3Service.files("program").stream()
			.filter(file -> System.currentTimeMillis() - file.getLastModified().getTime() > 1000 * 60 * 30)
			.map(S3ObjectSummary::getKey)
			.filter(file -> !list1.contains(file) && !list2.contains(file) && !list3.contains(file))
			.map(s3Service::urlToKey)
			.toList();

		targets.forEach(s3Service::deleteFile);

		log.info("Purge Unused S3 Resource. (amount: {})", targets.size());
	}
}
