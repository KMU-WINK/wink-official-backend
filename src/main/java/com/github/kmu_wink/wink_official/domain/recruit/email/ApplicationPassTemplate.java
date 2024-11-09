package com.github.kmu_wink.wink_official.domain.recruit.email;

import com.github.kmu_wink.wink_official.common.email.EmailTemplate;
import com.github.kmu_wink.wink_official.domain.user.schema.PreUser;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor(staticName = "of")
public class ApplicationPassTemplate implements EmailTemplate {

    private final PreUser preUser;

    @Override
    public String getTitle() {
        return "[WINK] 신규 부원 결과 안내";
    }

    @Override
    public String getHtml() {
        return """
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; font-family: Arial, sans-serif;">
                    <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #dddddd;">
                        <img src="https://avatars.githubusercontent.com/u/69004745" alt="Service Logo" style="max-width: 150px;">
                    </div>
                    <div style="padding: 20px; text-align: center;">
                        <h1 style="color: #333333;">신규 부원 결과 안내</h1>
                        <p style="font-size: 16px; color: #666666;">안녕하세요, %s님</p>
                        <p style="font-size: 16px; color: #666666;">WINK에 지원해주셔서 정말 감사합니다. 축하드립니다! 이제 아래 버튼을 눌러 가입을 완료해주세요.</p>
                        <a href="http://localhost:3000/auth/register?token=%s" style="display: inline-block; font-size: 18px; color: #ffffff; background-color: #3a70ff; padding: 14px 24px; border-radius: 12px; text-decoration: none; margin-top: 20px;">비밀번호 재설정</a>
                    </div>
                </div>
                """.formatted(preUser.getName(), preUser.getToken());
    }
}
