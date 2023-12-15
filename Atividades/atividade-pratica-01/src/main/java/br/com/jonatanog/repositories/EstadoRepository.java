package br.com.jonatanog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.jonatanog.model.Estado;

public interface EstadoRepository extends JpaRepository<Estado, Long>{
	Estado findByNome(String nome);
}
