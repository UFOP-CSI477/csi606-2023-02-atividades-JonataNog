package br.com.jonatanog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.jonatanog.model.Doacao;

public interface DoacaoRepository extends JpaRepository<Doacao, Long>{

}
