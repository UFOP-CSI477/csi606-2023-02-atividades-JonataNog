package br.com.jonatanog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.jonatanog.model.Filme;

public interface FilmeRepository extends JpaRepository<Filme, Long>{
	Filme findByNome(String nome);
}
