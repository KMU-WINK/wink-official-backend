
package com.github.kmu_wink.wink_official.domain.recruit.admin.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.github.kmu_wink.wink_official.domain.recruit.admin.dto.request.CreateRecruitRequest;
import com.github.kmu_wink.wink_official.domain.recruit.admin.dto.response.GetRecruitsResponse;
import com.github.kmu_wink.wink_official.domain.recruit.admin.exception.AlreadySameRecruitExistsException;
import com.github.kmu_wink.wink_official.domain.recruit.admin.sms.repository.RecruitSmsRepository;
import com.github.kmu_wink.wink_official.domain.recruit.admin.sms.schema.RecruitSms;
import com.github.kmu_wink.wink_official.domain.recruit.constant.FormEntryKeys;
import com.github.kmu_wink.wink_official.domain.recruit.dto.response.GetRecruitResponse;
import com.github.kmu_wink.wink_official.domain.recruit.exception.RecruitNotFoundException;
import com.github.kmu_wink.wink_official.domain.recruit.repository.RecruitFormRepository;
import com.github.kmu_wink.wink_official.domain.recruit.repository.RecruitRepository;
import com.github.kmu_wink.wink_official.domain.recruit.schema.Recruit;
import com.github.kmu_wink.wink_official.domain.recruit.util.GoogleFormUtil;
import com.google.api.services.forms.v1.model.Form;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminRecruitService {

    private final RecruitRepository recruitRepository;
    private final RecruitFormRepository recruitFormRepository;
    private final RecruitSmsRepository recruitSmsRepository;

    private final GoogleFormUtil googleFormUtil;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public GetRecruitsResponse getRecruits() {

        List<Recruit> recruits = recruitRepository.findAllWithSort();

        return GetRecruitsResponse.builder()
            .recruits(recruits)
            .build();
    }

    public GetRecruitResponse getRecruit(String recruitId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);

        return GetRecruitResponse.builder()
            .recruit(recruit)
            .build();
    }

    public GetRecruitResponse createRecruit(CreateRecruitRequest dto) {

        if (recruitRepository.existsRecruitByYearAndSemester(dto.year(), dto.semester())) throw new AlreadySameRecruitExistsException();

        Recruit recruit = Recruit.builder()
            .year(dto.year())
            .semester(dto.semester())
            .recruitStartDate(LocalDate.parse(dto.recruitStartDate(), DATE_FORMATTER))
            .recruitEndDate(LocalDate.parse(dto.recruitEndDate(), DATE_FORMATTER))
            .interviewStartDate(LocalDate.parse(dto.interviewStartDate(), DATE_FORMATTER))
            .interviewEndDate(LocalDate.parse(dto.interviewEndDate(), DATE_FORMATTER))
            .step(Recruit.Step.PRE)
            .build();

        Form form = googleFormUtil.createForm(recruit);
        recruit.setGoogleFormId(form.getFormId());
        recruit.setGoogleFormUri(form.getResponderUri());

        Map<FormEntryKeys, String> googleFormResponseEntry = googleFormUtil.fetchGoogleFormResponseEntry(form);
        recruit.setGoogleFormResponseEntry(googleFormResponseEntry);

        recruit = recruitRepository.save(recruit);
        recruitSmsRepository.save(RecruitSms.builder().recruit(recruit).build());

        return GetRecruitResponse.builder()
            .recruit(recruit)
            .build();
    }

    public void deleteRecruit(String recruitId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(RecruitNotFoundException::new);
        recruitSmsRepository.delete(recruitSmsRepository.findByRecruit(recruit));
        recruitFormRepository.deleteAll(recruitFormRepository.findAllByRecruit(recruit));
        recruitRepository.delete(recruit);
    }
}
