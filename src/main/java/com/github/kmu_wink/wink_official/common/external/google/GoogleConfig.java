package com.github.kmu_wink.wink_official.common.external.google;

import java.io.IOException;
import java.io.InputStream;
import java.security.GeneralSecurityException;
import java.util.Collection;
import java.util.HashSet;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import com.github.kmu_wink.wink_official.common.property.GoogleProperty;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.forms.v1.Forms;
import com.google.api.services.forms.v1.FormsScopes;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;

@Configuration
@RequiredArgsConstructor
public class GoogleConfig {

	private final GoogleProperty googleProperty;

	@Bean
	@SneakyThrows(IOException.class)
	public HttpRequestInitializer httpRequestInitializer() {

		InputStream credentialsStream = new ClassPathResource("credential/google.json").getInputStream();

		Collection<String> scopes = new HashSet<>() {{
			addAll(DriveScopes.all());
			addAll(FormsScopes.all());
		}};

		GoogleCredentials credentials = GoogleCredentials.fromStream(credentialsStream).createScoped(scopes);

		return new HttpCredentialsAdapter(credentials);
	}

	@Bean
	@SneakyThrows({GeneralSecurityException.class, IOException.class})
	public HttpTransport httpTransport() {

		return GoogleNetHttpTransport.newTrustedTransport();
	}

	@Bean
	public JsonFactory jsonFactory() {

		return GsonFactory.getDefaultInstance();
	}

	@Bean
	public Drive drive() {

		return new Drive.Builder(httpTransport(), jsonFactory(), httpRequestInitializer())
			.setApplicationName(googleProperty.getApplicationName())
			.build();
	}

	@Bean
	public Forms forms() {

		return new Forms.Builder(httpTransport(), jsonFactory(), httpRequestInitializer())
			.setApplicationName(googleProperty.getApplicationName())
			.build();
	}
}
