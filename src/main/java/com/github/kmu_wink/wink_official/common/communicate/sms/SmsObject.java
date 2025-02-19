package com.github.kmu_wink.wink_official.common.communicate.sms;

import lombok.Builder;

@Builder
public record SmsObject(

	String target,
	String content
) {
}