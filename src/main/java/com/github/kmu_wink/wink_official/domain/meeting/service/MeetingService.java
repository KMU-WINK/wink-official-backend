package com.github.kmu_wink.wink_official.domain.meeting.service;

import org.springframework.stereotype.Service;

import com.github.kmu_wink.wink_official.domain.meeting.dto.response.GetMettingResponse;
import com.github.kmu_wink.wink_official.domain.meeting.exception.MeetingNotFoundException;
import com.github.kmu_wink.wink_official.domain.meeting.repository.MeetingRepository;
import com.github.kmu_wink.wink_official.domain.meeting.schema.Meeting;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MeetingService {

	private final MeetingRepository meetingRepository;

	public GetMettingResponse getMeeting(String meetingId) {

		Meeting meeting = meetingRepository.findById(meetingId).orElseThrow(MeetingNotFoundException::new);

		return GetMettingResponse.builder()
			.meeting(meeting)
			.build();
	}
}
