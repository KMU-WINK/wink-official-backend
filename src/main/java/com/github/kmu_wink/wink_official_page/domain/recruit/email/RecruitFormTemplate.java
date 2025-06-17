package com.github.kmu_wink.wink_official_page.domain.recruit.email;

import com.github.kmu_wink.wink_official_page.domain.recruit.schema.RecruitForm;
import com.github.kmu_wink.wink_official_page.global.module.email.EmailTemplate;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor(staticName = "of")
public class RecruitFormTemplate implements EmailTemplate {

    private final RecruitForm form;

    @Override
    public String getTitle() {

        return "[WINK] 지원서 제출 확인";
    }

    @Override
    public String getHtml() {

        return container(""" 
                <h1 class="title">지원서 제출 확인</h1>
                <p class="text">안녕하세요, %s님</p>
                <p class="text">%d년도 %d학기 WINK 신입 부원 지원서가 성공적으로 제출되었습니다.</p>
                <p class="text">지원 마감 전까지는 아래 링크를 통해 지원서를 수정하실 수 있습니다.</p>
                <a href="https://wink.kookmin.ac.kr/recruit/form/edit?token=%s" class="button">지원서 수정하기</a>
                """).formatted(
                form.getName(),
                form.getRecruit().getYear(),
                form.getRecruit().getSemester(),
                form.getEditToken()
        );
    }
}
