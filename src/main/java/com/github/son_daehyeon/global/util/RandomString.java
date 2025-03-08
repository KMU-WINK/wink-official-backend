package com.github.son_daehyeon.global.util;

import java.security.SecureRandom;

import org.springframework.stereotype.Component;

@Component
public class RandomString {

	private static final SecureRandom RANDOM = new SecureRandom();
	private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	public String generate(int length) {

		StringBuilder sb = new StringBuilder(length);

		for (int i = 0; i < length; i++) {
			sb.append(CHARACTERS.charAt(RANDOM.nextInt(CHARACTERS.length())));
		}

		return sb.toString();
	}
}
