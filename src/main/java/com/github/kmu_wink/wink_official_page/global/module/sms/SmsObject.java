package com.github.kmu_wink.wink_official_page.global.module.sms;

import lombok.Builder;

@Builder
public record SmsObject(

	String target,
	String content
) {
}