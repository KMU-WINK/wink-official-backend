package com.github.kmu_wink.wink_official_backend.domain.auth.email;

import com.github.kmu_wink.wink_official_backend.common.email.EmailTemplate;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor(staticName = "of")
public class PasswordResetTokenTemplate implements EmailTemplate {

    private final String email;
    private final String passwordResetToken;

    @Override
    public String getTitle() {
        return "[WINK] 비밀번호 재설정";
    }

    @Override
    public String getHtml() {
        return """
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; font-family: Arial, sans-serif;">
                    <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #dddddd;">
                        <img src="https://avatars.githubusercontent.com/u/69004745" alt="Wink Logo" style="max-width: 150px;">
                    </div>
                    <div style="padding: 20px; text-align: center;">
                        <h1 style="color: #333333;">비밀번호 초기화</h1>
                        <p style="font-size: 16px; color: #666666; line-height: 1.5;">안녕하세요, %s님</p>
                        <p style="font-size: 16px; color: #666666; line-height: 1.5;">비밀번호를 초기화하려면 아래 버튼을 클릭하세요.</p>
                        <p style="font-size: 16px; color: #666666; line-height: 1.5;">만약 비밀번호 초기화 요청을 하지 않았다면 이 이메일을 무시해주세요.</p>
                        <a href="https://example.com/auth/reset-password?token=%s" style="display: inline-block; font-size: 18px; color: #ffffff; background-color: #007BFF; padding: 10px 20px; border-radius: 8px; text-decoration: none; margin-top: 20px;">
                            비밀번호 재설정
                        </a>
                    </div>
                    <div style="text-align: center; padding: 20px; font-size: 20px; color: #999999;">
                        &copy; 2024 Wink. All rights reserved.
                    </div>
                </div>""".formatted(email, passwordResetToken);
    }
}
