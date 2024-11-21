package com.github.kmu_wink.wink_official.domain.recruit.email;

import com.github.kmu_wink.wink_official.common.email.EmailTemplate;
import com.github.kmu_wink.wink_official.domain.recruit.schema.Application;
import com.github.kmu_wink.wink_official.domain.user.schema.PreUser;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor(staticName = "of")
public class ApplicationPassTemplate implements EmailTemplate {

    private final Application application;
    private final PreUser preUser;

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
            <p class="text">%s님은 이번 모집을 통해 신규 부원으로 합격하셨습니다.</p>
            <p class="text">아래 가입하기 버튼을 눌러 저희 홈페이지에 가입해주세요.</p>
            <p class="text">감사합니다.</p>
            <button onclick="window.location.href='http://wink.daehyeon.cloud:3000/auth/register?token=%s'" class="button">가입하기</button>
            """).formatted(application.getName(), application.getRecruit().getYear(), application.getRecruit().getSemester(), application.getName(), preUser.getToken());
    }
}
