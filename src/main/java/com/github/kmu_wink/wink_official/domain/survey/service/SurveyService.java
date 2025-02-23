package com.github.kmu_wink.wink_official.domain.survey.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.github.kmu_wink.wink_official.domain.survey.dto.response.GetSurveyResponse;
import com.github.kmu_wink.wink_official.domain.survey.exception.NotValidSurveyPeriodException;
import com.github.kmu_wink.wink_official.domain.survey.exception.SurveyNotFoundException;
import com.github.kmu_wink.wink_official.domain.survey.repository.SurveyRepository;
import com.github.kmu_wink.wink_official.domain.survey.schema.Survey;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SurveyService {

	private final SurveyRepository surveyRepository;

	public GetSurveyResponse getSurvey(String surveyId) {

		Survey survey = surveyRepository.findById(surveyId).orElseThrow(SurveyNotFoundException::new);

		LocalDateTime now = LocalDateTime.now();
		if (now.isBefore(survey.getStart().atStartOfDay()) || now.isAfter(survey.getEnd().atTime(23, 59, 59))) throw new NotValidSurveyPeriodException();

		return GetSurveyResponse.builder()
			.survey(survey)
			.build();
	}
}
