package com.github.kmu_wink.wink_official.domain.program.project.admin.service;

import org.springframework.stereotype.Service;

import com.github.kmu_wink.wink_official.common.external.aws.s3.S3Service;
import com.github.kmu_wink.wink_official.domain.program.project.exception.ProjectNotFoundException;
import com.github.kmu_wink.wink_official.domain.program.project.repository.ProjectRepository;
import com.github.kmu_wink.wink_official.domain.program.project.schema.Project;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminProjectService {

	private final ProjectRepository projectRepository;
	private final S3Service s3Service;

	public void deleteProject(String id) {

		Project project = projectRepository.findById(id).orElseThrow(ProjectNotFoundException::new);

		if (project.getImage() != null) {
			s3Service.urlToKey(project.getImage()).ifPresent(s3Service::deleteFile);
		}

		projectRepository.delete(project);
	}
}
