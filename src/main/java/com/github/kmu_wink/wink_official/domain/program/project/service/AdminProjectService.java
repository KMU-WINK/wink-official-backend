package com.github.kmu_wink.wink_official.domain.program.project.service;

import org.springframework.stereotype.Service;

import com.github.kmu_wink.wink_official.domain.program.project.exception.ProjectNotFoundException;
import com.github.kmu_wink.wink_official.domain.program.project.repository.ProjectRepository;
import com.github.kmu_wink.wink_official.domain.program.project.schema.Project;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminProjectService {

	private final ProjectRepository projectRepository;

	public void deleteProject(String id) {

		Project project = projectRepository.findById(id).orElseThrow(ProjectNotFoundException::new);

		projectRepository.delete(project);
	}
}
