package br.com.jonatanog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.jonatanog.model.Cidade;

public interface CidadeRepository extends JpaRepository<Cidade, Long>{
	Cidade findByNome(String nome);
}
