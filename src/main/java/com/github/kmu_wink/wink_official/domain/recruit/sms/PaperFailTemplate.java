package com.github.kmu_wink.wink_official.domain.recruit.sms;

import com.github.kmu_wink.wink_official.common.sms.SmsTemplate;
import com.github.kmu_wink.wink_official.domain.recruit.schema.Recruit;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor(staticName = "of")
public class PaperFailTemplate implements SmsTemplate {

    private final Recruit recruit;

    @Override
    public String getContent() {
        return """
            안녕하세요. 국민대학교 소프트웨어융합대학 소속 웹 학술동아리 WINK입니다. 이번 %d학년도 %d학기 WINK 신입부원 모집에 관심 갖고 지원해주신 모든 지원자분께 진심으로 감사의 말씀 드립니다.
            
            지원자님은 이번 서류 전형에서 불합격하셨습니다. 모든 지원자분의 소중한 지원서를 고심하며 읽고 검토하여 최대한 많은 지원자분을 면접에서 뵙고 싶었지만, 동아리 면접 일정의 한계로 모든 지원자분을 면접에서 뵐 수 없게 된 점은 진심으로 안타깝게 생각하고 있습니다.
        
            다음 모집에는 더욱 많은 지원자분을 만나 뵐 수 있는 WINK가 되도록 노력하겠습니다. 다시 WINK와 인연이 닿는 날이 오길 바라며 다시 한번 모든 지원자분께 감사의 말씀 드립니다."""
            .formatted(recruit.getYear(), recruit.getSemester());
    }
}
