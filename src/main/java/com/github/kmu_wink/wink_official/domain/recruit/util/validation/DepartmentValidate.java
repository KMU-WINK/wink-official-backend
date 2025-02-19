package com.github.kmu_wink.wink_official.domain.recruit.util.validation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Documented
@Target({ ElementType.METHOD, ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.CONSTRUCTOR, ElementType.PARAMETER, ElementType.TYPE_USE })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = DepartmentValidator.class)
public @interface DepartmentValidate {

	String message() default "올바른 학과가 아닙니다.";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};
}