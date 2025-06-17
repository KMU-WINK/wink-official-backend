package com.github.kmu_wink.wink_official_page.domain.application.util;

import java.security.SecureRandom;

import org.springframework.stereotype.Component;

@Component
public class RandomString {

	private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	public String generate(int length) {

		SecureRandom random = new SecureRandom();
		StringBuilder sb = new StringBuilder(length);

		for (int i = 0; i < length; i++) {
			sb.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
		}

		return sb.toString();
	}
}
