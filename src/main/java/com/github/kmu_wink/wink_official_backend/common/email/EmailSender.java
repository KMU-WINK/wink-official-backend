package com.github.kmu_wink.wink_official_backend.common.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.boot.autoconfigure.mail.MailProperties;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EmailSender {

    private final MailProperties properties;
    private final JavaMailSender javaMailSender;

    @Async
    public void send(String email, EmailTemplate template) {
        this.send(email, template.getTitle(), template.getHtml());
    }

    @Async
    @SneakyThrows(MessagingException.class)
    public void send(String email, String title, String html) {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");

        messageHelper.setFrom(properties.getUsername());
        messageHelper.setTo(email);
        messageHelper.setSubject(title);
        messageHelper.setText(html, true);

        javaMailSender.send(message);
    }
}