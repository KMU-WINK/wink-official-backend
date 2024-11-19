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
        return """
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; font-family: Arial, sans-serif;">
                    <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #dddddd;">
                        <img src="https://i.imgur.com/qXRRE56.png" alt="Wink Logo" style="max-width: 150px;">
                    </div>
                    <div style="padding: 20px; text-align: center;">
                        <h1 style="color: #333333;">비밀번호 초기화</h1>
                        <p style="font-size: 16px; color: #666666;">안녕하세요, %s님</p>
                        <p style="font-size: 16px; color: #666666;">비밀번호를 초기화하려면 아래 버튼을 클릭하세요.</p>
                        <p style="font-size: 16px; color: #666666;">만약 비밀번호 초기화 요청을 하지 않았다면 이 이메일을 무시해주세요.</p>
                        <a href="http://localhost:3000/auth/reset-password?token=%s" style="display: inline-block; font-size: 18px; color: #ffffff; background-color: #3a70ff; padding: 14px 24px; border-radius: 12px; text-decoration: none; margin-top: 20px;">비밀번호 재설정</a>
                    </div>
                </div>
                """.formatted(user.getName(),token.token());
    }
}
