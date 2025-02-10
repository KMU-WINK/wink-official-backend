package com.github.kmu_wink.wink_official.common.email;

import java.io.UnsupportedEncodingException;
import java.util.UUID;

import org.springframework.boot.autoconfigure.mail.MailProperties;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;

@Component
@RequiredArgsConstructor
public class EmailSender {

    private final MailProperties properties;
    private final JavaMailSender javaMailSender;

    private static final String ORGANIZATION_NAME = "WINK";

    @Async
    public void send(String email, EmailTemplate template) {
        this.send(email, template.getTitle(), template.getHtml());
    }

    @Async
    @SneakyThrows({MessagingException.class, UnsupportedEncodingException.class})
    public void send(String email, String title, String html) {

        MimeMessage message = javaMailSender.createMimeMessage();

        MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
        messageHelper.setFrom(new InternetAddress(properties.getUsername(), ORGANIZATION_NAME));
        messageHelper.setTo(email);
        messageHelper.setSubject(title);
        messageHelper.setReplyTo(properties.getUsername());
        messageHelper.setText(html.replaceAll("<[^>]*>", ""), html);

        message.addHeader("List-Unsubscribe", "<mailto:%s>".formatted(properties.getUsername()));
        message.addHeader("Precedence", "bulk");
        message.addHeader("X-Auto-Response-Suppress", "OOF, AutoReply");
        message.addHeader("Message-ID", "<" + UUID.randomUUID() + "@%s>".formatted(properties.getUsername().split("@")[1]));

        javaMailSender.send(message);
    }
}