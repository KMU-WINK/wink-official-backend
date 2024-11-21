package com.github.kmu_wink.wink_official.domain.recruit.email;

import com.github.kmu_wink.wink_official.common.email.EmailTemplate;
import com.github.kmu_wink.wink_official.domain.recruit.schema.Application;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor(staticName = "of")
public class ApplicationFailTemplate implements EmailTemplate {

    private final Application application;

    @Override
    public String getTitle() {
        return "[WINK] %d년 %d학기 모집 결과 안내".formatted(application.getRecruit().getYear(), application.getRecruit().getSemester());
    }

    @Override
    public String getHtml() {
        return container("""
            <h1 class="title">모집 결과 안내</h1>
            <p class="text">안녕하세요, %s님</p>
            <p class="text">이번 %d년 %d학기 WINK 신입 부원 모집에 지원해주셔서 진심으로 감사드립니다.</p>
            <p class="text">안타깝게 이번 모집에서 함께하지 못하게 되었습니다.</p>
            <p class="text">감사합니다.</p>
            """).formatted(application.getName(), application.getRecruit().getYear(), application.getRecruit().getSemester());
    }
}
