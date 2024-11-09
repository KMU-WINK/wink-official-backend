package com.github.kmu_wink.wink_official.domain.recruit.util;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import org.apache.http.NameValuePair;
import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.http.message.BasicNameValuePair;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import com.github.kmu_wink.wink_official.common.property.GoogleProperty;
import com.github.kmu_wink.wink_official.domain.recruit.constant.Domain;
import com.github.kmu_wink.wink_official.domain.recruit.constant.FormCheckbox;
import com.github.kmu_wink.wink_official.domain.recruit.constant.FormEntryKeys;
import com.github.kmu_wink.wink_official.domain.recruit.constant.techStack.BackendTechStack;
import com.github.kmu_wink.wink_official.domain.recruit.constant.techStack.DatabaseTechStack;
import com.github.kmu_wink.wink_official.domain.recruit.constant.techStack.DesignTechStack;
import com.github.kmu_wink.wink_official.domain.recruit.constant.techStack.DevOpsTechStack;
import com.github.kmu_wink.wink_official.domain.recruit.constant.techStack.FrontendTechStack;
import com.github.kmu_wink.wink_official.domain.recruit.schema.Application;
import com.github.kmu_wink.wink_official.domain.recruit.schema.Recruit;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.Permission;
import com.google.api.services.forms.v1.Forms;
import com.google.api.services.forms.v1.model.BatchUpdateFormRequest;
import com.google.api.services.forms.v1.model.ChoiceQuestion;
import com.google.api.services.forms.v1.model.CreateItemRequest;
import com.google.api.services.forms.v1.model.Form;
import com.google.api.services.forms.v1.model.Info;
import com.google.api.services.forms.v1.model.Item;
import com.google.api.services.forms.v1.model.Location;
import com.google.api.services.forms.v1.model.Option;
import com.google.api.services.forms.v1.model.Question;
import com.google.api.services.forms.v1.model.QuestionItem;
import com.google.api.services.forms.v1.model.Request;
import com.google.api.services.forms.v1.model.TextQuestion;

import kong.unirest.core.Unirest;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;

@Component
@RequiredArgsConstructor
public class GoogleFormUtil {

    private final Drive drive;
    private final Forms forms;

    private final GoogleProperty googleProperty;

    @SneakyThrows(IOException.class)
    public Form createForm(Recruit recruit) {

        String title = "[WINK] %d년 %d학기 신규 부원 모집".formatted(recruit.getYear(), recruit.getSemester());
        Form form = forms.forms().create(new Form().setInfo(new Info().setTitle(title).setDocumentTitle(title))).execute();

        forms.forms().batchUpdate(form.getFormId(), new BatchUpdateFormRequest().setRequests(createRequest(
            shortText("이름", true),
            shortText("학번", true),
            shortText("이메일", true),
            shortText("전화번호", true),
            longText("지원 동기", true),
            longText("배우고 싶은 점", true),
            checkBox("면접 가능 날짜", betweenDates(recruit.getInterviewStartDate(), recruit.getInterviewEndDate()), true),
            checkBox("지원 분야", Domain.values(), true),
            shortText("Github 아이디", false),
            checkBox("프론트엔드 기술 스택", FrontendTechStack.values(), false),
            checkBox("백엔드 기술 스택", BackendTechStack.values(), false),
            checkBox("데이터베이스 기술 스택", DatabaseTechStack.values(), false),
            checkBox("DevOps 기술 스택", DevOpsTechStack.values(), false),
            checkBox("디자인 기술 스택", DesignTechStack.values(), false),
            longText("가장 기억에 남는 프로젝트", false),
            longText("마지막 한마디", false)))).execute();

        drive.permissions().create(form.getFormId(), new Permission()
            .setType("user")
            .setRole("writer")
            .setEmailAddress(googleProperty.getOwnerEmail())).execute();

        return forms.forms().get(form.getFormId()).execute();
    }

    public void createResponse(Application application) {

        Recruit recruit = application.getRecruit();

        String baseUri = recruit.getGoogleFormUri().replace("viewform", "formResponse");
        Map<FormEntryKeys, String> entry = recruit.getGoogleFormResponseEntry();

        List<NameValuePair> pairs = new ArrayList<>() {{
            add(new BasicNameValuePair("submit", "Submit"));
            add(new BasicNameValuePair("entry." + entry.get(FormEntryKeys.NAME), application.getName()));
            add(new BasicNameValuePair("entry." + entry.get(FormEntryKeys.STUDENT_ID), application.getStudentId()));
            add(new BasicNameValuePair("entry." + entry.get(FormEntryKeys.EMAIL), application.getEmail()));
            add(new BasicNameValuePair("entry." + entry.get(FormEntryKeys.PHONE_NUMBER), application.getPhoneNumber()));
            add(new BasicNameValuePair("entry." + entry.get(FormEntryKeys.JIWON_DONGGI), application.getJiwonDonggi()));
            add(new BasicNameValuePair("entry." + entry.get(FormEntryKeys.BAEUGO_SIPEUN_JEOM), application.getBaeugoSipeunJeom()));
            application.getCanInterviewDates().forEach(date -> add(new BasicNameValuePair("entry." + entry.get(FormEntryKeys.CAN_INTERVIEW_DATES), formatDate(date))));
            application.getDomains().forEach(domain -> add(new BasicNameValuePair("entry." + entry.get(FormEntryKeys.DOMAIN), domain.getDisplayName())));

            if (application.getGithub() != null) add(new BasicNameValuePair("entry." + entry.get(FormEntryKeys.GITHUB), application.getGithub()));
            if (!application.getFrontendTechStacks().isEmpty()) application.getFrontendTechStacks().forEach(stack -> add(new BasicNameValuePair("entry." + entry.get(FormEntryKeys.FRONTEND_TECH_STACKS), stack.getDisplayName())));
            if (!application.getBackendTechStacks().isEmpty()) application.getBackendTechStacks().forEach(stack -> add(new BasicNameValuePair("entry." + entry.get(FormEntryKeys.BACKEND_TECH_STACKS), stack.getDisplayName())));
            if (!application.getDatabaseTechStacks().isEmpty()) application.getDatabaseTechStacks().forEach(stack -> add(new BasicNameValuePair("entry." + entry.get(FormEntryKeys.DATABASE_TECH_STACKS), stack.getDisplayName())));
            if (!application.getDevOpsTechStacks().isEmpty()) application.getDevOpsTechStacks().forEach(stack -> add(new BasicNameValuePair("entry." + entry.get(FormEntryKeys.DEV_OPS_TECH_STACKS), stack.getDisplayName())));
            if (!application.getDesignTechStacks().isEmpty()) application.getDesignTechStacks().forEach(stack -> add(new BasicNameValuePair("entry." + entry.get(FormEntryKeys.DESIGN_TECH_STACKS), stack.getDisplayName())));
            if (application.getFavoriteProject() != null) add(new BasicNameValuePair("entry." + entry.get(FormEntryKeys.FAVORITE_PROJECT), application.getFavoriteProject()));
            if (application.getLastComment() != null) add(new BasicNameValuePair("entry." + entry.get(FormEntryKeys.LAST_COMMENT), application.getLastComment()));
        }};

        String queryString = URLEncodedUtils.format(pairs, StandardCharsets.UTF_8);

        Unirest.get(baseUri + "?" + queryString).asBytes();
    }

    @SneakyThrows(IOException.class)
    public Map<FormEntryKeys, String> fetchGoogleFormResponseEntry(Form form) {

        Element element = Jsoup.connect(form.getResponderUri()).get().selectFirst("div[role=list]");
        Elements elements = Objects.requireNonNull(element).children();

        FormEntryKeys[] keys = FormEntryKeys.values();

        String[] values = elements.stream()
            .map(elem -> elem.child(0))
            .map(elem -> elem.attr("data-params"))
            .map(str -> str.substring(str.indexOf("[[") + 2, str.indexOf("]]") + 2))
            .map(str -> str.substring(0, str.indexOf(",")))
            .toArray(String[]::new);

        return IntStream.range(0, keys.length)
            .boxed()
            .collect(Collectors.toMap(index -> keys[index], index -> values[index]));
    }

    private String formatDate(LocalDate date) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        return "%s (%s)".formatted(date.format(formatter), date.getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.KOREAN));
    }

    private List<String> betweenDates(LocalDate start, LocalDate end) {

        return Stream.iterate(start, date -> date.plusDays(1))
            .limit(start.until(end).getDays() + 1)
            .map(this::formatDate)
            .collect(Collectors.toList());
    }

    private List<Request> createRequest(Request... requests) {

        return IntStream.range(0, requests.length)
            .mapToObj(index -> {
                Request request = requests[index];

                request.getCreateItem().setLocation(new Location().setIndex(index));

                return request;
            })
            .toList();
    }

    private Request shortText(String title, boolean required) {

        return new Request()
            .setCreateItem(new CreateItemRequest()
                .setItem(new Item()
                    .setTitle(title)
                    .setQuestionItem(new QuestionItem()
                        .setQuestion(new Question()
                            .setRequired(required)
                            .setTextQuestion(new TextQuestion()
                                .setParagraph(false))))));
    }

    private Request longText(String title, boolean required) {

        return new Request()
            .setCreateItem(new CreateItemRequest()
                .setItem(new Item()
                    .setTitle(title)
                    .setQuestionItem(new QuestionItem()
                        .setQuestion(new Question()
                            .setRequired(required)
                            .setTextQuestion(new TextQuestion()
                                .setParagraph(true))))));
    }

    private Request checkBox(String title, List<String> list, boolean required) {

        return new Request()
            .setCreateItem(new CreateItemRequest()
                .setItem(new Item()
                    .setTitle(title)
                    .setQuestionItem(new QuestionItem()
                        .setQuestion(new Question()
                            .setRequired(required)
                            .setChoiceQuestion(new ChoiceQuestion()
                                .setType("CHECKBOX")
                                .setOptions(list.stream().map(s -> new Option().setValue(s)).toList()))))));
    }

    private Request checkBox(String title, FormCheckbox[] formCheckboxes, boolean required) {

        List<String> list = Arrays.stream(formCheckboxes)
            .map(FormCheckbox::getDisplayName)
            .toList();

        return checkBox(title, list, required);
    }
}
