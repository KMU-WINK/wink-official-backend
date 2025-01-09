package com.github.kmu_wink.wink_official.domain.recruit.sms;

import java.time.format.DateTimeFormatter;
import java.util.Locale;

import com.github.kmu_wink.wink_official.common.sms.SmsTemplate;
import com.github.kmu_wink.wink_official.domain.recruit.schema.Recruit;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor(staticName = "of")
public class PaperPassTemplate implements SmsTemplate {

    private final Recruit recruit;
    private final String url;

    @Override
    public String getContent() {
        return """
            안녕하세요. 국민대학교 소프트웨어융합대학 소속 웹 학술동아리 WINK입니다. 이번 %d학년도 %d학기 WINK 신입 부원 모집에 관심 갖고 지원해 주신 모든 지원자분께 진심으로 감사의 말씀 드립니다.
            
            지원자님은 이번 서류 전형에서 합격하셨으며 %s부터 진행되는 대면 면접 전형을 준비해주시기 바랍니다.

            면접 일정은 지원서에 제출해 주신 설문 답변을 기반으로 설정하였으며 자세한 시간 및 장소는 하단에 첨부한 링크를 참고해주시면 감사하겠습니다.
            
            %s"""
            .formatted(recruit.getYear(), recruit.getSemester(), recruit.getInterviewStartDate().format(DateTimeFormatter.ofPattern("M월 d일 (E)", Locale.KOREAN)), url);
    }
}
