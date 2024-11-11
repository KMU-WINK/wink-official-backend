package com.github.kmu_wink.wink_official.domain.program.project.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.github.kmu_wink.wink_official.domain.program.project.dto.request.CreateProjectRequest;
import com.github.kmu_wink.wink_official.domain.program.project.dto.response.GetProjectResponse;
import com.github.kmu_wink.wink_official.domain.program.project.dto.response.GetProjectsPageableResponse;
import com.github.kmu_wink.wink_official.domain.program.project.exception.NotOwnedProjectException;
import com.github.kmu_wink.wink_official.domain.program.project.exception.ProjectNotFoundException;
import com.github.kmu_wink.wink_official.domain.program.project.repository.ProjectRepository;
import com.github.kmu_wink.wink_official.domain.program.project.schema.Project;
import com.github.kmu_wink.wink_official.domain.user.exception.UserNotFoundException;
import com.github.kmu_wink.wink_official.domain.user.repository.UserRepository;
import com.github.kmu_wink.wink_official.domain.user.schema.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProjectService {

	private final ProjectRepository projectRepository;
	private final UserRepository userRepository;

	public GetProjectsPageableResponse getProjects(int page, String query) {

		PageRequest pageRequest = PageRequest.of(page, 20, Sort.by("createdAt").descending());
		Page<Project> projects = projectRepository.findAllSearch(query, pageRequest);

		return GetProjectsPageableResponse.builder()
			.projects(projects)
			.build();
	}

	public GetProjectResponse getProject(String id) {

		Project project = projectRepository.findById(id).orElseThrow(ProjectNotFoundException::new);

		return GetProjectResponse.builder()
			.project(project)
			.build();
	}

	public GetProjectResponse createProject(User user, CreateProjectRequest dto) {

		List<User> users = dto.users().stream()
			.map(userId -> userRepository.findById(userId).orElseThrow(UserNotFoundException::new))
			.collect(Collectors.toList());

		if (!users.contains(user)) {
			users.add(user);
		}

		Project project = Project.builder()
			.title(dto.title())
			.content(dto.content())
			.tags(dto.tags())
			.githubLinks(dto.githubLinks())
			.users(users)
			.build();

		project = projectRepository.save(project);

		return GetProjectResponse.builder()
			.project(project)
			.build();
	}

	public GetProjectResponse updateProject(User user, String id, CreateProjectRequest dto) {

		Project project = projectRepository.findById(id).orElseThrow(ProjectNotFoundException::new);

		if (!project.getUsers().contains(user)) {

			throw new NotOwnedProjectException();
		}

		List<User> users = dto.users().stream()
				.map(userId -> userRepository.findById(userId).orElseThrow(UserNotFoundException::new))
				.collect(Collectors.toList());

		if (!users.contains(user)) {
			users.add(user);
		}

		project.setTitle(dto.title());
		project.setContent(dto.content());
		project.setTags(dto.tags());
		project.setGithubLinks(dto.githubLinks());
		project.setUsers(users);

		project = projectRepository.save(project);

		return GetProjectResponse.builder()
			.project(project)
			.build();
	}

	public void deleteProject(User user, String id) {

		Project project = projectRepository.findById(id).orElseThrow(ProjectNotFoundException::new);

		if (!project.getUsers().contains(user)) {

			throw new NotOwnedProjectException();
		}

		projectRepository.delete(project);
	}
}
