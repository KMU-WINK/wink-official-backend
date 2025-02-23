package com.github.kmu_wink.wink_official.domain.meeting.admin.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.github.kmu_wink.wink_official.domain.meeting.admin.dto.request.CreateMeetingRequest;
import com.github.kmu_wink.wink_official.domain.meeting.admin.dto.response.GetMeetingsPageableResponse;
import com.github.kmu_wink.wink_official.domain.meeting.dto.response.GetMettingResponse;
import com.github.kmu_wink.wink_official.domain.meeting.exception.MeetingNotFoundException;
import com.github.kmu_wink.wink_official.domain.meeting.repository.MeetingRepository;
import com.github.kmu_wink.wink_official.domain.meeting.schema.Meeting;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminMeetingService {

	private final MeetingRepository meetingRepository;

	private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

	public GetMeetingsPageableResponse getMeetings(int page) {

		PageRequest pageRequest = PageRequest.of(page, 20, Sort.by(Sort.Order.desc("createdAt")));
		Page<Meeting> meetings = meetingRepository.findAll(pageRequest);

		return GetMeetingsPageableResponse.builder()
			.meetings(meetings)
			.build();
	}

	public GetMettingResponse getMeeting(String meetingId) {

		Meeting meeting = meetingRepository.findById(meetingId).orElseThrow(MeetingNotFoundException::new);

		return GetMettingResponse.builder()
			.meeting(meeting)
			.build();
	}

	public GetMettingResponse createMeeting(CreateMeetingRequest dto) {

		Meeting meeting = Meeting.builder()
			.date(LocalDate.parse(dto.date(), DATE_FORMATTER))
			.build();

		meeting = meetingRepository.save(meeting);

		return GetMettingResponse.builder()
			.meeting(meeting)
			.build();
	}

	public GetMettingResponse updateMeeting(String meetingId, CreateMeetingRequest dto) {

		Meeting meeting = meetingRepository.findById(meetingId).orElseThrow(MeetingNotFoundException::new);

		meeting.setDate(LocalDate.parse(dto.date(), DATE_FORMATTER));
		meeting = meetingRepository.save(meeting);

		return GetMettingResponse.builder()
			.meeting(meeting)
			.build();
	}

	public void deleteMeeting(String meetingId) {

		meetingRepository.delete(meetingRepository.findById(meetingId).orElseThrow(MeetingNotFoundException::new));
	}
}
