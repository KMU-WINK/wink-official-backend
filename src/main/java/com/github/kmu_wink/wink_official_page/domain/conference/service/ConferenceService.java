package com.github.kmu_wink.wink_official_page.domain.conference.service;

import java.time.LocalDateTime;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.github.kmu_wink.wink_official_page.domain.conference.dto.response.GetConferenceResponse;
import com.github.kmu_wink.wink_official_page.domain.conference.dto.response.GetCurrentParticipantResponse;
import com.github.kmu_wink.wink_official_page.domain.conference.exception.ConferenceAlreadyStartException;
import com.github.kmu_wink.wink_official_page.domain.conference.exception.ConferenceNotFoundException;
import com.github.kmu_wink.wink_official_page.domain.conference.repository.ConferenceRepository;
import com.github.kmu_wink.wink_official_page.domain.conference.schema.Conference;
import com.github.kmu_wink.wink_official_page.domain.user.schema.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ConferenceService {

	private final ConferenceRepository conferenceRepository;

	public GetConferenceResponse getConference(String conferenceId) {

		Conference conference = conferenceRepository.findById(conferenceId).orElseThrow(ConferenceNotFoundException::new);

		conference.setSurveyPresent(Set.of());
		conference.setSurveyAbsent(Set.of());
		conference.setPresent(Set.of());
		conference.setAbsent(Set.of());

		return GetConferenceResponse.builder()
			.conference(conference)
			.build();
	}

	public GetCurrentParticipantResponse current(String conferenceId, User user) {

		Conference conference = conferenceRepository.findById(conferenceId).orElseThrow(ConferenceNotFoundException::new);

		boolean present = conference.getSurveyPresent().contains(user);
		boolean absent = conference.getSurveyAbsent().contains(user);

		return GetCurrentParticipantResponse.builder()
			.survey(present || absent)
			.present(present)
			.build();
	}

	public void surveyPresent(String conferenceId, User user) {

		Conference conference = conferenceRepository.findById(conferenceId).orElseThrow(ConferenceNotFoundException::new);

		if (LocalDateTime.now().isAfter(conference.getDate())) throw new ConferenceAlreadyStartException();

		conference.getSurveyPresent().add(user);
		conference.getSurveyAbsent().remove(user);

		conferenceRepository.save(conference);
	}

	public void surveyAbsent(String conferenceId, User user) {

		Conference conference = conferenceRepository.findById(conferenceId).orElseThrow(ConferenceNotFoundException::new);

		if (LocalDateTime.now().isAfter(conference.getDate())) throw new ConferenceAlreadyStartException();

		conference.getSurveyPresent().remove(user);
		conference.getSurveyAbsent().add(user);

		conferenceRepository.save(conference);
	}
}
