package com.github.kmu_wink.wink_official.domain.recruit.email;

import com.github.kmu_wink.wink_official.common.email.EmailTemplate;
import com.github.kmu_wink.wink_official.domain.recruit.schema.Application;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor(staticName = "of")
public class ApplicationFailTemplate implements EmailTemplate {

    private final Application application;

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
                    <p style="font-size: 16px; color: #666666;">안녕하세요, %s님.</p>
                    <p style="font-size: 16px; color: #666666;">먼저 WINK에 지원해주셔서 진심으로 감사드립니다.<br/>많은 분들 중에서 신중히 심사한 결과, 아쉽게도 이번에는 함께하지 못하게 되었습니다.</p>
                    <p style="font-size: 16px; color: #666666;">다시 한 번 지원해주셔서 감사드리며,<br/>앞으로의 활동에 행운이 가득하길 바랍니다.</p>
                    <p style="font-size: 16px; color: #666666;">감사합니다.</p>
                </div>
            </div>
            """.formatted(application.getName());
    }
}
