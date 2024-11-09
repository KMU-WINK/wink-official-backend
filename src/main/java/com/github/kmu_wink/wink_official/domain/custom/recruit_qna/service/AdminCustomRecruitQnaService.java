package com.github.kmu_wink.wink_official.domain.custom.recruit_qna.service;

import org.springframework.stereotype.Service;

import com.github.kmu_wink.wink_official.domain.custom.recruit_qna.dto.request.CreateQnaRequest;
import com.github.kmu_wink.wink_official.domain.custom.recruit_qna.dto.request.DeleteQnaRequest;
import com.github.kmu_wink.wink_official.domain.custom.recruit_qna.dto.request.UpdateQnaRequest;
import com.github.kmu_wink.wink_official.domain.custom.recruit_qna.dto.response.GetRecruitQnaResponse;
import com.github.kmu_wink.wink_official.domain.custom.recruit_qna.exception.RecruitQnaNotFoundException;
import com.github.kmu_wink.wink_official.domain.custom.recruit_qna.repository.RecruitQnaRepository;
import com.github.kmu_wink.wink_official.domain.custom.recruit_qna.schema.RecruitQna;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminCustomRecruitQnaService {

	private final RecruitQnaRepository recruitQnaRepository;

	public GetRecruitQnaResponse createQna(CreateQnaRequest dto) {

		RecruitQna recruitQna = RecruitQna.builder()
			.question(dto.question())
			.answer(dto.answer())
			.build();

		recruitQna = recruitQnaRepository.save(recruitQna);

		return GetRecruitQnaResponse.builder()
			.qna(recruitQna)
			.build();
	}

	public GetRecruitQnaResponse updateQna(UpdateQnaRequest dto) {

		RecruitQna recruitQna = recruitQnaRepository.findById(dto.id()).orElseThrow(RecruitQnaNotFoundException::new);

		recruitQna.setQuestion(dto.question());
		recruitQna.setAnswer(dto.answer());

		recruitQna = recruitQnaRepository.save(recruitQna);

		return GetRecruitQnaResponse.builder()
			.qna(recruitQna)
			.build();
	}

	public void deleteQna(DeleteQnaRequest dto) {

		RecruitQna recruitQna = recruitQnaRepository.findById(dto.id()).orElseThrow(RecruitQnaNotFoundException::new);

		recruitQnaRepository.delete(recruitQna);
	}
}
