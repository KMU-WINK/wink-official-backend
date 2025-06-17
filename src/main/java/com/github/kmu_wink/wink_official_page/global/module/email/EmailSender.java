package com.github.kmu_wink.wink_official_page.global.module.email;

import com.github.kmu_wink.wink_official_page.global.util.RandomString;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.boot.autoconfigure.mail.MailProperties;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;

@Component
@RequiredArgsConstructor
public class EmailSender {

    private static final String ORGANIZATION_NAME = "WINK";


    private final MailProperties properties;

    private final JavaMailSender javaMailSender;

    @Async
    @SneakyThrows({ MessagingException.class, UnsupportedEncodingException.class })
    public void send(String email, EmailTemplate template) {

        MimeMessage message = javaMailSender.createMimeMessage();

        MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
        messageHelper.setFrom(new InternetAddress(properties.getUsername(), ORGANIZATION_NAME));
        messageHelper.setTo(email);
        messageHelper.setSubject(template.getTitle());
        messageHelper.setReplyTo(properties.getUsername());
        messageHelper.setText(transferPlainText(template.getHtml()), template.getHtml());

        message.addHeader("Precedence", "normal");
        message.addHeader("X-Auto-Response-Suppress", "OOF, AutoReply");
        message.addHeader("Message-ID", generateMessageId());

        javaMailSender.send(message);
    }

    private String transferPlainText(String html) {

        return html.replaceAll("<[^>]*>", "");
    }

    private String generateMessageId() {

        return "<" + RandomString.generate(16) + "@%s>".formatted(properties.getUsername().split("@")[1]);
    }
}