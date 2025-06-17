package com.github.kmu_wink.wink_official_page.domain.program.project.service;

import com.github.kmu_wink.wink_official_page.domain.program.project.dto.request.CreateProjectRequest;
import com.github.kmu_wink.wink_official_page.domain.program.project.dto.response.GetProjectResponse;
import com.github.kmu_wink.wink_official_page.domain.program.project.dto.response.GetProjectsPageableResponse;
import com.github.kmu_wink.wink_official_page.domain.program.project.exception.ProjectExceptionCode;
import com.github.kmu_wink.wink_official_page.domain.program.project.repository.ProjectRepository;
import com.github.kmu_wink.wink_official_page.domain.program.project.schema.Project;
import com.github.kmu_wink.wink_official_page.domain.user.schema.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    public GetProjectsPageableResponse getProjects(int page, String query) {

        PageRequest pageRequest = PageRequest.of(page, 15, Sort.by("createdAt").descending());
        Page<Project> projects = projectRepository.findAllSearch(query, pageRequest);

        return GetProjectsPageableResponse.builder().projects(projects).build();
    }

    public GetProjectResponse createProject(User user, CreateProjectRequest dto) {

        Project project = Project.builder()
                .author(user)
                .title(dto.title())
                .description(dto.description())
                .image(dto.image())
                .link(dto.link())
                .build();

        project = projectRepository.save(project);

        return GetProjectResponse.builder().project(project).build();
    }

    public GetProjectResponse updateProject(User user, String id, CreateProjectRequest dto) {

        Project project = projectRepository.findById(id).orElseThrow(ProjectExceptionCode.NOT_FOUND::toException);

        if (!project.getAuthor().equals(user)) {

            throw ProjectExceptionCode.NOT_OWNER.toException();
        }

        project.setTitle(dto.title());
        project.setDescription(dto.description());
        project.setImage(dto.image());
        project.setLink(dto.link());

        project = projectRepository.save(project);

        return GetProjectResponse.builder().project(project).build();
    }

    public void deleteProject(User user, String id) {

        Project project = projectRepository.findById(id).orElseThrow(ProjectExceptionCode.NOT_FOUND::toException);

        if (!project.getAuthor().equals(user)) {

            throw ProjectExceptionCode.NOT_OWNER.toException();
        }

        projectRepository.delete(project);
    }
}
