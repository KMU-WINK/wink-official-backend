package com.github.son_daehyeon.global.communication.msg;

import lombok.Builder;

@Builder
public record SmsObject(

	String target,
	String content
) {
}
