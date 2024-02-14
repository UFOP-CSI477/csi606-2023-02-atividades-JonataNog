package br.com.jonatanog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.jonatanog.model.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa, Long>{
	Pessoa findByNome(String nome);
}
