package br.com.jonatanog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.jonatanog.model.LocalColeta;

public interface LocalColetaRepository extends JpaRepository<LocalColeta, Long> {
	LocalColeta findByNome(String nome);
}
