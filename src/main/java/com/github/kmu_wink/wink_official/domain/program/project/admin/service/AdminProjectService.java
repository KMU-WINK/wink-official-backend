package com.github.kmu_wink.wink_official.domain.program.project.admin.service;

import java.util.Objects;

import org.springframework.stereotype.Service;

import com.github.kmu_wink.wink_official.common.external.aws.s3.S3Service;
import com.github.kmu_wink.wink_official.domain.program.project.dto.request.CreateProjectRequest;
import com.github.kmu_wink.wink_official.domain.program.project.dto.response.GetProjectResponse;
import com.github.kmu_wink.wink_official.domain.program.project.exception.ProjectNotFoundException;
import com.github.kmu_wink.wink_official.domain.program.project.repository.ProjectRepository;
import com.github.kmu_wink.wink_official.domain.program.project.schema.Project;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminProjectService {

	private final ProjectRepository projectRepository;
	private final S3Service s3Service;

	public GetProjectResponse updateProject(String id, CreateProjectRequest dto) {

		Project project = projectRepository.findById(id).orElseThrow(ProjectNotFoundException::new);

		project.setTitle(dto.title());
		project.setDescription(dto.description());
		project.setImage(dto.image());
		project.setLink(dto.link());

		project = projectRepository.save(project);

		return GetProjectResponse.builder()
			.project(project)
			.build();
	}

	public void deleteProject(String id) {

		Project project = projectRepository.findById(id).orElseThrow(ProjectNotFoundException::new);

		if (Objects.nonNull(project.getImage())) {
			s3Service.urlToKey(project.getImage()).ifPresent(s3Service::deleteFile);
		}

		projectRepository.delete(project);
	}
}
