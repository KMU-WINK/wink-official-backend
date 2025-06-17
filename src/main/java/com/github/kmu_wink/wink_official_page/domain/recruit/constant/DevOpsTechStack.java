package com.github.kmu_wink.wink_official_page.domain.recruit.constant;

public enum DevOpsTechStack implements TechStack {
    // 클라우드
    AWS,
    GCP,
    AZURE,

    // 컨테이너
    DOCKER,
    KUBERNETES,
    DOCKER_COMPOSE,

    // CI/CD
    JENKINS,
    GITHUB_ACTIONS,
    GITLAB_CI,
    CIRCLE_CI,

    // IaC
    TERRAFORM,
    ANSIBLE,

    // 모니터링/로깅
    PROMETHEUS,
    GRAFANA,
    ELK_STACK,

    // 네트워킹
    NGINX,
    APACHE
}