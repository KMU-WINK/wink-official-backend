package com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.service;

import com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.__sms__.repository.RecruitSmsRepository;
import com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.__sms__.schema.RecruitSms;
import com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.dto.request.CreateRecruitRequest;
import com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.dto.response.GetRecruitsResponse;
import com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.exception.AdminRecruitExceptionCode;
import com.github.kmu_wink.wink_official_page.domain.recruit.dto.response.GetRecruitResponse;
import com.github.kmu_wink.wink_official_page.domain.recruit.exception.RecruitExceptionCode;
import com.github.kmu_wink.wink_official_page.domain.recruit.repository.RecruitFormRepository;
import com.github.kmu_wink.wink_official_page.domain.recruit.repository.RecruitRepository;
import com.github.kmu_wink.wink_official_page.domain.recruit.schema.Recruit;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminRecruitService {

    private final RecruitRepository recruitRepository;
    private final RecruitFormRepository recruitFormRepository;
    private final RecruitSmsRepository recruitSmsRepository;

    public GetRecruitsResponse getRecruits() {

        List<Recruit> recruits = recruitRepository.findAllWithSort();

        return GetRecruitsResponse.builder().recruits(recruits).build();
    }

    public GetRecruitResponse getRecruit(String recruitId) {

        Recruit recruit = recruitRepository.findById(recruitId)
                .orElseThrow(RecruitExceptionCode.NOT_FOUND::toException);

        return GetRecruitResponse.builder().recruit(recruit).build();
    }

    public GetRecruitResponse createRecruit(CreateRecruitRequest dto) {

        if (recruitRepository.existsRecruitByYearAndSemester(dto.year(), dto.semester())) {
            throw AdminRecruitExceptionCode.ALREADY_EXISTS.toException();
        }

        Recruit recruit = Recruit.builder()
                .year(dto.year())
                .semester(dto.semester())
                .recruitStartDate(dto.recruitStartDate())
                .recruitEndDate(dto.recruitEndDate())
                .interviewStartDate(dto.interviewStartDate())
                .interviewEndDate(dto.interviewEndDate())
                .step(Recruit.Step.PRE)
                .build();

        recruit = recruitRepository.save(recruit);
        recruitSmsRepository.save(RecruitSms.builder().recruit(recruit).build());

        return GetRecruitResponse.builder().recruit(recruit).build();
    }

    public void deleteRecruit(String recruitId) {

        Recruit recruit = recruitRepository.findById(recruitId)
                .orElseThrow(RecruitExceptionCode.NOT_FOUND::toException);
        recruitSmsRepository.delete(recruitSmsRepository.findByRecruit(recruit));
        recruitFormRepository.deleteAll(recruitFormRepository.findAllByRecruit(recruit));
        recruitRepository.delete(recruit);
    }
}
