package com.github.kmu_wink.wink_official.domain.recruit.sms;

import com.github.kmu_wink.wink_official.common.sms.SmsTemplate;
import com.github.kmu_wink.wink_official.domain.recruit.schema.Recruit;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor(staticName = "of")
public class InterviewFailTemplate implements SmsTemplate {

    private final Recruit recruit;

    @Override
    public String getContent() {
        return """
            안녕하세요. 국민대학교 소프트웨어융합대학 소속 웹 학술동아리 WINK입니다.
            
            WINK에 대한 열정을 옅볼수 있었던 지원서부터 면접에 참여해주신 모든 지원자분께 진심으로 감사드립니다.

            지원자님께서는 %d학년도 %d학기 WINK 신입부원 모집에 최종 불합격하셨습니다. 지원서와 면접에서 보여주신 WINK에 대한 열정에 정말 감동하였으나, 원활한 동아리 운영을 위해 모든 지원자분들을 모실 수 없게 된 점 진심으로 안타깝게 생각하고있습니다.

            더욱 성장하여 더 많은 지원자분들을 모실 수 있는 WINK가 되도록 하겠습니다. 다시 한번 감사드립니다."""
            .formatted(recruit.getYear(), recruit.getSemester());
    }
}
