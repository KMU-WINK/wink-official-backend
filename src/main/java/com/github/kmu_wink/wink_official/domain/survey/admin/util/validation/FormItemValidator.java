package com.github.kmu_wink.wink_official.domain.survey.admin.util.validation;

import java.util.Objects;

import com.github.kmu_wink.wink_official.domain.survey.admin.constant.SurveyItemType;
import com.github.kmu_wink.wink_official.domain.survey.admin.dto.request.CreateSurveyRequest;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class FormItemValidator implements ConstraintValidator<FormItemValidate, CreateSurveyRequest.FormItem> {

	@Override
	public boolean isValid(CreateSurveyRequest.FormItem item, ConstraintValidatorContext context) {
		if (item == null) return false;

		SurveyItemType type = SurveyItemType.valueOf(item.type());

		if (type.equals(SurveyItemType.RADIO) || type.equals(SurveyItemType.CHECKBOX)) {
			if (Objects.isNull(item.options()) || item.options().isEmpty()) {
				context.disableDefaultConstraintViolation();

				context.buildConstraintViolationWithTemplate("옵션을 입력해주세요.")
					.addPropertyNode("options")
					.addConstraintViolation();

				return false;
			}

			if (Objects.isNull(item.other())) {
				context.disableDefaultConstraintViolation();

				context.buildConstraintViolationWithTemplate("기타 입력을 체크해주세요.")
					.addPropertyNode("other")
					.addConstraintViolation();

				return false;
			}
		} else {
			if (Objects.nonNull(item.options())) {
				context.disableDefaultConstraintViolation();

				context.buildConstraintViolationWithTemplate("잘못된 옵션값이 있습니다.")
					.addPropertyNode("options")
					.addConstraintViolation();

				return false;
			}

			if (Objects.nonNull(item.other())) {
				context.disableDefaultConstraintViolation();

				context.buildConstraintViolationWithTemplate("잘못된 기타 입력값이 있습니다.")
					.addPropertyNode("other")
					.addConstraintViolation();

				return false;
			}
		}

		return true;
	}
}