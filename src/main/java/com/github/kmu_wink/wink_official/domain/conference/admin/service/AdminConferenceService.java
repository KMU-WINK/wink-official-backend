package com.github.kmu_wink.wink_official.domain.conference.admin.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.github.kmu_wink.wink_official.domain.conference.admin.dto.request.CreateConferenceRequest;
import com.github.kmu_wink.wink_official.domain.conference.admin.dto.response.GetConferencesPageableResponse;
import com.github.kmu_wink.wink_official.domain.conference.admin.dto.response.GetConferencesResponse;
import com.github.kmu_wink.wink_official.domain.conference.dto.response.GetConferenceResponse;
import com.github.kmu_wink.wink_official.domain.conference.exception.ConferenceNotFoundException;
import com.github.kmu_wink.wink_official.domain.conference.repository.ConferenceRepository;
import com.github.kmu_wink.wink_official.domain.conference.schema.Conference;
import com.github.kmu_wink.wink_official.domain.user.exception.UserNotFoundException;
import com.github.kmu_wink.wink_official.domain.user.repository.UserRepository;
import com.github.kmu_wink.wink_official.domain.user.schema.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminConferenceService {

	private final ConferenceRepository conferenceRepository;
	private final UserRepository userRepository;

	private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

	public GetConferencesPageableResponse getConferences(int page) {

		PageRequest pageRequest = PageRequest.of(page, 20, Sort.by("date").descending());
		Page<Conference> conferences = conferenceRepository.findAll(pageRequest);

		return GetConferencesPageableResponse.builder()
			.conferences(conferences)
			.build();
	}

	public GetConferencesResponse getAttendance(int year) {

		LocalDateTime startOfYear = LocalDateTime.of(year, 1, 1, 0, 0);
		LocalDateTime startOfNextYear = LocalDateTime.of(year + 1, 1, 1, 0, 0);

		Sort sort = Sort.by(Sort.Direction.ASC, "date");
		List<Conference> conferences = conferenceRepository.findAllByDateBetween(startOfYear, startOfNextYear, sort);

		return GetConferencesResponse.builder()
			.conferences(conferences)
			.build();
	}

	public GetConferenceResponse getConference(String conferenceId) {

		Conference conference = conferenceRepository.findById(conferenceId).orElseThrow(ConferenceNotFoundException::new);

		return GetConferenceResponse.builder()
			.conference(conference)
			.build();
	}

	public GetConferenceResponse createConference(CreateConferenceRequest dto) {

		Conference conference = Conference.builder()
			.location(dto.location())
			.date(LocalDateTime.parse(dto.date(), formatter))
			.surveyPresent(Set.of())
			.surveyAbsent(Set.of())
			.present(Set.of())
			.absent(Set.of())
			.build();

		conference = conferenceRepository.save(conference);

		return GetConferenceResponse.builder()
			.conference(conference)
			.build();
	}

	public GetConferenceResponse updateConference(String conferenceId, CreateConferenceRequest dto) {

		Conference conference = conferenceRepository.findById(conferenceId).orElseThrow(ConferenceNotFoundException::new);

		conference.setLocation(dto.location());
		conference.setDate(LocalDateTime.parse(dto.date(), formatter));

		conference = conferenceRepository.save(conference);

		return GetConferenceResponse.builder()
			.conference(conference)
			.build();
	}

	public void deleteConference(String conferenceId) {

		conferenceRepository.delete(
			conferenceRepository.findById(conferenceId).orElseThrow(ConferenceNotFoundException::new)
		);
	}

	public void present(String conferenceId, String userId) {

		Conference conference = conferenceRepository.findById(conferenceId).orElseThrow(ConferenceNotFoundException::new);
		User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

		conference.getPresent().add(user);
		conference.getAbsent().remove(user);

		conferenceRepository.save(conference);
	}

	public void absent(String conferenceId, String userId) {

		Conference conference = conferenceRepository.findById(conferenceId).orElseThrow(ConferenceNotFoundException::new);
		User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

		conference.getPresent().remove(user);
		conference.getAbsent().add(user);

		conferenceRepository.save(conference);
	}
}
