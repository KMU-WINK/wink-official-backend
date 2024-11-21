package com.github.kmu_wink.wink_official.domain.auth.email;

import com.github.kmu_wink.wink_official.common.email.EmailTemplate;
import com.github.kmu_wink.wink_official.domain.auth.schema.PasswordResetToken;
import com.github.kmu_wink.wink_official.domain.user.schema.User;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor(staticName = "of")
public class PasswordResetTokenTemplate implements EmailTemplate {

    private final User user;
    private final PasswordResetToken token;

    @Override
    public String getTitle() {
        return "[WINK] 비밀번호 재설정";
    }

    @Override
    public String getHtml() {
        return container(""" 
            <h1 class="title">비밀번호 초기화</h1>
            <p class="text">안녕하세요, %s님</p>
            <p class="text">비밀번호를 초기화하려면 아래 버튼을 클릭하세요.</p>
            <p class="text">만약 비밀번호 초기화 요청을 하지 않았다면 이 이메일을 무시해주세요.</p>
            <button onclick="window.location.href='http://wink.daehyeon.cloud:3000/auth/reset-password?token=%s'" class="button">비밀번호 재설정</button>
            """).formatted(user.getName(),token.token());
    }
}
