package com.github.kmu_wink.wink_official_page.domain.recruit.constant.techStack;

import com.github.kmu_wink.wink_official_page.domain.recruit.constant.FormCheckbox;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum DevOpsTechStack implements FormCheckbox {
    // 클라우드
    AWS("Amazon Web Service"),
    GCP("Google Cloud Platform"),
    AZURE("Microsoft Azure"),

    // 컨테이너
    DOCKER("Docker"),
    KUBERNETES("Kubernetes"),
    DOCKER_COMPOSE("Docker Compose"),

    // CI/CD
    JENKINS("Jenkins"),
    GITHUB_ACTIONS("GitHub Actions"),
    GITLAB_CI("GitLab CI"),
    CIRCLE_CI("CircleCI"),

    // IaC
    TERRAFORM("Terraform"),
    ANSIBLE("Ansible"),

    // 모니터링/로깅
    PROMETHEUS("Prometheus"),
    GRAFANA("Grafana"),
    ELK_STACK("ELK Stack"),

    // 네트워킹
    NGINX("NGINX"),
    APACHE("Apache");

    private final String displayName;
}