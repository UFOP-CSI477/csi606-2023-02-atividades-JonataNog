package br.com.jonatanog.services;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.jonatanog.exceptions.ResourceNotFoundException;
import br.com.jonatanog.model.Filme;
import br.com.jonatanog.repositories.FilmeRepository;

@Service
public class FilmeServices {
	
private Logger logger = Logger.getLogger(FilmeServices.class.getName());
	
	@Autowired
	FilmeRepository repository;
	
	public List<Filme> findAll(){
		logger.info("Procurando todos filmes");
		
		return repository.findAll();
	}
	
	public Filme findById(Long id) {
		logger.info("Procurando um filme pelo ID");
		
		return repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Nenhum filme encontrado para esse ID"));
	}
	
	public Filme findByNome(String nome) {
		logger.info("Procurando um filme pelo nome");	
		
		Filme filme = repository.findByNome(nome);
		if(filme == null) {
			throw new ResourceNotFoundException("Nenhum filme encontrado para esse nome");
		}
		
		return filme;
	}
	
	public Filme create(Filme filme) {
		logger.info("Criando um filme");
		
		return repository.save(filme);
	}
	
	public Filme update(Filme filme) {
		logger.info("Atulizando um filme");
		
		Filme entity = repository.findById(filme.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Nenhum filme encontrado para esse ID"));
		
		entity.setNome(filme.getNome());
		entity.setAno(filme.getAno());
		entity.setPais(filme.getPais());
		entity.setDiretor(filme.getDiretor());
		entity.setMidia(filme.getMidia());
		entity.setGenero(filme.getGenero());
		entity.setUpdated_at(filme.getUpdated_at());
		
		return repository.save(entity);
	}
	
	public void delete(Long id) {
		logger.info("Deletando um filme");
		
		Filme entity = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Nenhum filme encontrado para esse ID"));
		
		repository.delete(entity);
	}

}
