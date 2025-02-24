package com.github.kmu_wink.wink_official.domain.user.task;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.github.kmu_wink.wink_official.common.property.NotionProperty;
import com.github.kmu_wink.wink_official.domain.user.dto.internal.NotionDbUser;
import com.github.kmu_wink.wink_official.domain.user.repository.UserRepository;
import com.github.kmu_wink.wink_official.domain.user.schema.User;

import kong.unirest.core.Empty;
import kong.unirest.core.HttpResponse;
import kong.unirest.core.JsonNode;
import kong.unirest.core.Unirest;
import kong.unirest.core.UnirestInstance;
import kong.unirest.core.json.JSONObject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class SyncNotionDbTask {

	private final NotionProperty notionProperty;
	private final UserRepository userRepository;

	@Scheduled(fixedDelay = 1000 * 60 * 60)
	private void run() {
		try {
			List<NotionDbUser> notionDbUsers = getNotionDb()
				.orElseThrow(() -> new RuntimeException("Failed to fetch Notion DB"));

			Map<String, User> userMap = userRepository.findAll().stream()
				.collect(Collectors.toMap(User::getId, Function.identity()));

			Set<String> notionSet = notionDbUsers.stream()
				.map(NotionDbUser::id)
				.collect(Collectors.toSet());

			// Delete pages that don't exist in user repository
			for (NotionDbUser notionUser : notionDbUsers) {
				if (!userMap.containsKey(notionUser.id())) {
					try {
						deletePage(notionUser);
					} catch (Exception e) {
						log.error("Failed to delete page for user {}: {}", notionUser.id(), e.getMessage());
					}
				}
			}

			// Update changed pages
			for (NotionDbUser notionUser : notionDbUsers) {
				if (userMap.containsKey(notionUser.id())) {
					User user = userMap.get(notionUser.id());
					if (checkPageIsDiffer(notionUser, user)) {
						try {
							updatePage(notionUser, user);
						} catch (Exception e) {
							log.error("Failed to update page for user {}: {}", user.getId(), e.getMessage());
						}
					}
				}
			}

			// Create new pages
			for (User user : userMap.values()) {
				if (!notionSet.contains(user.getId())) {
					try {
						createPage(user);
					} catch (Exception e) {
						log.error("Failed to create page for user {}: {}", user.getId(), e.getMessage());
					}
				}
			}
		} catch (Exception e) {
			log.error("Sync task failed: {}", e.getMessage());
		}
	}

	public void manual(User user) {
		try {
			getNotionDb()
				.flatMap(notionDbUsers -> notionDbUsers.stream()
					.filter(x -> x.id().equals(user.getId()))
					.findFirst()
				)
				.ifPresentOrElse(
					notionDbUser -> {
						try {
							updatePage(notionDbUser, user);
						} catch (Exception e) {
							log.error("Failed to manually update page for user {}: {}", user.getId(), e.getMessage());
							throw new RuntimeException("Failed to update Notion page", e);
						}
					},
					() -> {
						try {
							createPage(user);
						} catch (Exception e) {
							log.error("Failed to manually create page for user {}: {}", user.getId(), e.getMessage());
							throw new RuntimeException("Failed to create Notion page", e);
						}
					}
				);
		} catch (Exception e) {
			log.error("Manual sync failed for user {}: {}", user.getId(), e.getMessage());
			throw new RuntimeException("Manual sync failed", e);
		}
	}

	private UnirestInstance createUnirestInstance() {
		UnirestInstance instance = Unirest.spawnInstance();
		instance.config()
			.addDefaultHeader("Authorization", "Bearer %s".formatted(notionProperty.getSecret()))
			.addDefaultHeader("Notion-Version", "2022-06-28")
			.addDefaultHeader("Content-Type", "application/json");
		return instance;
	}

	private Optional<List<NotionDbUser>> getNotionDb() {
		try (UnirestInstance instance = createUnirestInstance()) {
			String url = "https://api.notion.com/v1/databases/%s/query".formatted(notionProperty.getDatabaseId());
			HttpResponse<JsonNode> response = instance.post(url).asJson();

			if (!response.isSuccess()) {
				log.error("Failed to fetch Notion DB. Status: {}", response.getStatus());
				return Optional.empty();
			}

			//noinspection unchecked
			List<NotionDbUser> users = ((List<JSONObject>)(response.getBody()
				.getObject()
				.getJSONArray("results")
				.toList()))
				.stream()
				.filter(x -> !x.getBoolean("archived"))
				.map(NotionDbUser::from)
				.filter(Optional::isPresent)
				.map(Optional::get)
				.toList();

			log.info("Successfully fetched {} users from Notion DB", users.size());
			return Optional.of(users);
		} catch (Exception e) {
			log.error("Error fetching Notion DB: {}", e.getMessage());
			return Optional.empty();
		}
	}

	private void createPage(User user) {
		try (UnirestInstance instance = createUnirestInstance()) {
			HttpResponse<Empty> response = instance.post("https://api.notion.com/v1/pages")
				.body(Map.ofEntries(
					Map.entry("parent", Map.of("database_id", notionProperty.getDatabaseId())),
					Map.entry("properties", Map.ofEntries(
						Map.entry("UUID", Map.of("rich_text", List.of(Map.of("text", Map.of("content", user.getId()))))),
						Map.entry("이름", Map.of("title", List.of(Map.of("text", Map.of("content", user.getName()))))),
						Map.entry("학번", Map.of("rich_text", List.of(Map.of("text", Map.of("content", user.getStudentId()))))),
						Map.entry("학부(과)", Map.of("rich_text", List.of(Map.of("text", Map.of("content", user.getDepartment()))))),
						Map.entry("이메일", Map.of("rich_text", List.of(Map.of("text", Map.of("content", user.getEmail()))))),
						Map.entry("전화번호", Map.of("rich_text", List.of(Map.of("text", Map.of("content", user.getPhoneNumber()))))),
						Map.entry("역할", Map.of("select", Map.of("name", user.getRole().toKorean()))),
						Map.entry("회비 납부", Map.of("checkbox", user.isFee()))
					))
				))
				.asEmpty();

			if (!response.isSuccess()) {
				throw new RuntimeException("Failed to create page. Status: " + response.getStatus());
			}

			log.info("Created user page. ({} {})", user.getStudentId(), user.getName());
		}
	}

	private void updatePage(NotionDbUser notionDbUser, User user) {
		try (UnirestInstance instance = createUnirestInstance()) {
			String url = "https://api.notion.com/v1/pages/%s".formatted(notionDbUser.notion());
			HttpResponse<Empty> response = instance.patch(url)
				.body(Map.of("properties", Map.ofEntries(
					Map.entry("이름", Map.of("title", List.of(Map.of("text", Map.of("content", user.getName()))))),
					Map.entry("학번", Map.of("rich_text", List.of(Map.of("text", Map.of("content", user.getStudentId()))))),
					Map.entry("학부(과)", Map.of("rich_text", List.of(Map.of("text", Map.of("content", user.getDepartment()))))),
					Map.entry("이메일", Map.of("rich_text", List.of(Map.of("text", Map.of("content", user.getEmail()))))),
					Map.entry("전화번호", Map.of("rich_text", List.of(Map.of("text", Map.of("content", user.getPhoneNumber()))))),
					Map.entry("역할", Map.of("select", Map.of("name", user.getRole().toKorean()))),
					Map.entry("회비 납부", Map.of("checkbox", user.isFee()))
				)))
				.asEmpty();

			if (!response.isSuccess()) {
				throw new RuntimeException("Failed to update page. Status: " + response.getStatus());
			}

			log.info("Updated user page. ({} {})", user.getStudentId(), user.getName());
		}
	}

	private void deletePage(NotionDbUser notionDbUser) {
		try (UnirestInstance instance = createUnirestInstance()) {
			String url = "https://api.notion.com/v1/pages/%s".formatted(notionDbUser.notion());
			HttpResponse<Empty> response = instance.patch(url)
				.body(Map.ofEntries(Map.entry("archived", true)))
				.asEmpty();

			if (!response.isSuccess()) {
				throw new RuntimeException("Failed to delete page. Status: " + response.getStatus());
			}

			log.info("Deleted user page. ({})", notionDbUser.notion());
		}
	}

	private boolean checkPageIsDiffer(NotionDbUser notionDbUser, User user) {
		return !user.getName().equals(notionDbUser.name())
			|| !user.getStudentId().equals(notionDbUser.studentId())
			|| !user.getDepartment().equals(notionDbUser.department())
			|| !user.getEmail().equals(notionDbUser.email())
			|| !user.getPhoneNumber().equals(notionDbUser.phoneNumber())
			|| !user.getRole().equals(notionDbUser.role())
			|| user.isFee() != notionDbUser.fee();
	}
}