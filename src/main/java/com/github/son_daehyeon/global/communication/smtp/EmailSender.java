package com.github.son_daehyeon.global.communication.smtp;

import java.io.UnsupportedEncodingException;

import org.springframework.boot.autoconfigure.mail.MailProperties;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import com.github.son_daehyeon.global.util.RandomString;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;

@Component
@RequiredArgsConstructor
public class EmailSender {

	private final MailProperties mailProperty;
	private final JavaMailSender mailSender;

	private final RandomString randomString;

	private static final String ORGANIZATION_NAME = "WINK";

	@Async
	@SneakyThrows({MessagingException.class, UnsupportedEncodingException.class})
	public void send(String email, EmailTemplate template) {

		MimeMessage message = mailSender.createMimeMessage();

		MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
		messageHelper.setFrom(new InternetAddress(mailProperty.getUsername(), ORGANIZATION_NAME));
		messageHelper.setTo(email);
		messageHelper.setSubject(template.getTitle());
		messageHelper.setReplyTo(mailProperty.getUsername());
		messageHelper.setText(transferPlainText(template.getHtml()), template.getHtml());

		message.addHeader("Precedence", "normal");
		message.addHeader("X-Auto-Response-Suppress", "OOF, AutoReply");
		message.addHeader("Message-ID", generateMessageId());

		mailSender.send(message);
	}

	private String transferPlainText(String html) {

		return html.replaceAll("<[^>]*>", "");
	}

	private String generateMessageId() {

		return "<" + randomString.generate(16) + "@%s>".formatted(mailProperty.getUsername().split("@")[1]);
	}
}