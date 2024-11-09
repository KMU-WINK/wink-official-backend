package com.github.kmu_wink.wink_official.domain.custom.recruit_qna.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.github.kmu_wink.wink_official.domain.custom.recruit_qna.dto.response.GetRecruitQnasResponse;
import com.github.kmu_wink.wink_official.domain.custom.recruit_qna.repository.RecruitQnaRepository;
import com.github.kmu_wink.wink_official.domain.custom.recruit_qna.schema.RecruitQna;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomRecruitQnaService {

	private final RecruitQnaRepository recruitQnaRepository;

	public GetRecruitQnasResponse getRecruitQna() {

		List<RecruitQna> recruitQnas = recruitQnaRepository.findAll();

		return GetRecruitQnasResponse.builder()
			.qnas(recruitQnas)
			.build();
	}
}
