package com.github.kmu_wink.wink_official_backend.domain.user.email;

import com.github.kmu_wink.wink_official_backend.common.email.EmailTemplate;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor(staticName = "of")
public class RejectedTemplate implements EmailTemplate {

    private final String name;

    @Override
    public String getTitle() {
        return "[WINK] 회원가입 거부";
    }

    @Override
    public String getHtml() {
        return """
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; font-family: Arial, sans-serif;">
                    <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #dddddd;">
                        <img src="https://avatars.githubusercontent.com/u/69004745" alt="Wink Logo" style="max-width: 150px;">
                    </div>
                    <div style="padding: 20px; text-align: center;">
                        <h1 style="color: #333333;">회원가입 승인</h1>
                        <p style="font-size: 16px; color: #666666; line-height: 1.5;">안녕하세요, %s님</p>
                        <p style="font-size: 16px; color: #666666; line-height: 1.5;">회원가입이 거부되었습니다.</p>
                        <p style="font-size: 16px; color: #666666; line-height: 1.5;">더 많은 정보를 원하시면 관리자에게 문의해주세요.</p>
                    </div>
                    <div style="text-align: center; padding: 20px; font-size: 20px; color: #999999;">
                        &copy; 2024 Wink. All rights reserved.
                    </div>
                </div>""".formatted(name);
    }
}
