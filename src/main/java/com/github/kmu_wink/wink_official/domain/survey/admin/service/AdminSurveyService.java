package com.github.kmu_wink.wink_official.domain.survey.admin.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.stereotype.Service;

import com.github.kmu_wink.wink_official.domain.survey.admin.dto.request.CreateSurveyRequest;
import com.github.kmu_wink.wink_official.domain.survey.admin.dto.response.GetSurveysResponse;
import com.github.kmu_wink.wink_official.domain.survey.dto.response.GetSurveyResponse;
import com.github.kmu_wink.wink_official.domain.survey.exception.SurveyNotFoundException;
import com.github.kmu_wink.wink_official.domain.survey.repository.SurveyRepository;
import com.github.kmu_wink.wink_official.domain.survey.schema.Survey;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminSurveyService {

	private final SurveyRepository surveyRepository;

	private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

	public GetSurveysResponse getSurveys() {

		List<Survey> surveys = surveyRepository.findAll();

		return GetSurveysResponse.builder()
			.surveys(surveys)
			.build();
	}

	public GetSurveyResponse getSurvey(String surveyId) {

		Survey survey = surveyRepository.findById(surveyId).orElseThrow(SurveyNotFoundException::new);

		return GetSurveyResponse.builder()
			.survey(survey)
			.build();
	}

	public GetSurveyResponse createSurvey(CreateSurveyRequest dto) {

		Survey survey = Survey.builder()
			.title(dto.title())
			.description(dto.description())
			.start(LocalDate.parse(dto.start(), DATE_FORMATTER))
			.end(LocalDate.parse(dto.end(), DATE_FORMATTER))
			.items(dto.items())
			.build();

		survey = surveyRepository.save(survey);

		return GetSurveyResponse.builder()
			.survey(survey)
			.build();
	}

	public GetSurveyResponse updateSurvey(String surveyId, CreateSurveyRequest dto) {

		Survey survey = surveyRepository.findById(surveyId).orElseThrow(SurveyNotFoundException::new);

		survey.setTitle(dto.title());
		survey.setDescription(dto.description());
		survey.setStart(LocalDate.parse(dto.start(), DATE_FORMATTER));
		survey.setEnd(LocalDate.parse(dto.end(), DATE_FORMATTER));
		survey.setItems(dto.items());

		survey = surveyRepository.save(survey);

		return GetSurveyResponse.builder()
			.survey(survey)
			.build();
	}

	public void deleteSurvey(String surveyId) {

		surveyRepository.delete(surveyRepository.findById(surveyId).orElseThrow(SurveyNotFoundException::new));
	}
}
