package com.github.son_daehyeon.common.validation;

public class RegExp {

	public static final String PASSWORD_EXPRESSION = "^(?=.*[a-zA-Z])(?=.*\\d)\\S{8,}$";
	public static final String PASSWORD_MESSAGE = "비밀번호는 8자 이상의 영문자 및 숫자 조합으로 작성해주세요.";
}
