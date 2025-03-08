package com.github.son_daehyeon.global.database.mariadb;

import java.time.LocalDateTime;
import java.util.Objects;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseSchema {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, updatable = false)
	Long id;

	@CreatedDate
	@Column(name = "created_at", updatable = false)
	LocalDateTime createdAt;

	@LastModifiedDate
	@Column(name = "updated_at")
	LocalDateTime updatedAt;

	@Override
	public boolean equals(Object obj) {
		if (Objects.isNull(obj) || !Objects.equals(getClass() ,obj.getClass())) {
			return false;
		}

		return Objects.equals(id, ((BaseSchema) obj).id);
	}

	@Override
	public int hashCode() {
		return id.hashCode();
	}
}
