package com.github.kmu_wink.wink_official.domain.user.email;

import com.github.kmu_wink.wink_official.common.email.EmailTemplate;
import com.github.kmu_wink.wink_official.domain.user.schema.PreUser;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor(staticName = "of")
public class InviteTemplate implements EmailTemplate {

    private final PreUser preUser;

    @Override
    public String getTitle() {
        return "[WINK] 부원 초대";
    }

    @Override
    public String getHtml() {
        return """
            <h1 class="title">부원 초대</h1>
            <p class="text">안녕하세요, %s님</p>
            <p class="text">WINK에 가입하기 위해, 아래 버튼을 눌러주세요.</p>
            <button onclick="window.location.href='http://wink.daehyeon.cloud:3000/auth/register?token=%s'" class="button">비밀번호 재설정</button>
            """.formatted(preUser.getName(), preUser.getToken());
    }
}
