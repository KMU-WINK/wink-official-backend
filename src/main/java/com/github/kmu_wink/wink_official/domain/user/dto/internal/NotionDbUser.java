package com.github.kmu_wink.wink_official.domain.user.dto.internal;

import java.time.LocalDateTime;
import java.util.Optional;

import com.github.kmu_wink.wink_official.domain.user.schema.User;

import kong.unirest.core.json.JSONException;
import kong.unirest.core.json.JSONObject;
import lombok.AccessLevel;
import lombok.Builder;

@Builder(access = AccessLevel.PRIVATE)
public record NotionDbUser(

	String notion,
	String id,
	LocalDateTime updatedAt,
	String name,
	String studentId,
	String email,
	String phoneNumber,
	User.Role role,
	boolean fee
) {

	public static Optional<NotionDbUser> from(JSONObject object) {

		try {
			return Optional.of(NotionDbUser.builder()
				.notion(object.getString("id"))
				.updatedAt(LocalDateTime.parse(object.getString("last_edited_time").replace("Z", "")).plusHours(9))
				.id(object.getJSONObject("properties").getJSONObject("UUID").getJSONArray("rich_text").getJSONObject(0).getString("plain_text"))
				.name(object.getJSONObject("properties").getJSONObject("이름").getJSONArray("title").getJSONObject(0).getString("plain_text"))
				.studentId(object.getJSONObject("properties").getJSONObject("학번").getJSONArray("rich_text").getJSONObject(0).getString("plain_text"))
				.email(object.getJSONObject("properties").getJSONObject("이메일").getJSONArray("rich_text").getJSONObject(0).getString("plain_text"))
				.phoneNumber(object.getJSONObject("properties").getJSONObject("전화번호").getJSONArray("rich_text").getJSONObject(0).getString("plain_text"))
				.role(User.Role.fromKorean(object.getJSONObject("properties").getJSONObject("역할").getJSONObject("select").getString("name")))
				.fee(object.getJSONObject("properties").getJSONObject("회비 납부").getBoolean("checkbox"))
				.build());
		} catch (JSONException e) {
			return Optional.empty();
		}
	}
}