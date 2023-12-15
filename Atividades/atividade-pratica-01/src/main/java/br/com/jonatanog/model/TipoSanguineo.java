package br.com.jonatanog.model;

import java.io.Serializable;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name="tipo-sanguineo")
public class TipoSanguineo implements Serializable{
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, length = 3)
	private String tipo;
	
	@Column(nullable = false, length = 3)
	private String fator;
	
	private LocalDateTime created_at;
	
	private LocalDateTime updated_at;
	
	public TipoSanguineo() {
	}
	
	@PrePersist
	protected void onCreate() {
		created_at = LocalDateTime.now();
	}
	
	@PreUpdate
	protected void onUpdate() {
		updated_at = LocalDateTime.now();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public String getFator() {
		return fator;
	}

	public void setFator(String fator) {
		this.fator = fator;
	}

	public LocalDateTime getCreated_at() {
		return created_at;
	}

	public void setCreated_at(LocalDateTime created_at) {
		this.created_at = created_at;
	}

	public LocalDateTime getUpdated_at() {
		return updated_at;
	}

	public void setUpdated_at(LocalDateTime updated_at) {
		this.updated_at = updated_at;
	}
	
}
