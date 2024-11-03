package com.github.kmu_wink.wink_official.common.validation;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class Validation {

    public static final String PASSWORD_EXPRESSION = "^(?=.*[a-zA-Z])(?=.*\\d)\\S{8,}$";
    public static final String PASSWORD_MESSAGE = "비밀번호는 8자 이상의 영문자 및 숫자 조합으로 작성해주세요.";

    public static final String KOOKMIN_EMAIL_EXPRESSION = "^[a-zA-Z0-9._%+-]+@kookmin\\.ac\\.kr$";
    public static final String KOOKMIN_EMAIL_MESSAGE = "국민대학교 이메일 형식이 아닙니다.";

    public static final String GITHUB_EXPRESSION = "^(?!-)[a-zA-Z0-9-]{1,39}(?<!-)$";
    public static final String GITHUB_MESSAGE = "올바른 Github 유저가 아닙니다.";

    public static final String INSTAGRAM_EXPRESSION = "^(?!.*\\.\\.)(?!.*\\.$)[a-zA-Z0-9._]{1,30}$";
    public static final String INSTAGRAM_MESSAGE = "올바른 Instagram 유저가 아닙니다.";

    public static final String BLOG_EXPRESSION = "^(https?://)?(www\\.)?[a-zA-Z0-9\\-]+(\\.[a-zA-Z]{2,}){1,3}(/.*)?$";
    public static final String BLOG_MESSAGE = "올바른 URL이 아닙니다.";

    public static final String STUDENT_ID_MESSAGE = "올바른 학번이 아닙니다.";

    public static final String PHONE_NUMBER_EXPRESSION = "^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$";
    public static final String PHONE_NUMBER_MESSAGE = "올바른 전화번호가 아닙니다.";

    public static final String YYYY_MM_DD_EXPRESSION = "^\\d{4}-\\d{2}-\\d{2}$";
    public static final String YYYY_MM_DD_MESSAGE = "올바른 날짜가 아닙니다";
}
