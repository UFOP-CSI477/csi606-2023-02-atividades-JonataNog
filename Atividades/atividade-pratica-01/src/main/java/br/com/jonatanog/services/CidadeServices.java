package br.com.jonatanog.services;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.jonatanog.exceptions.ResourceNotFoundException;
import br.com.jonatanog.model.Cidade;
import br.com.jonatanog.repositories.CidadeRepository;

@Service
public class CidadeServices {
	
	private Logger logger = Logger.getLogger(CidadeServices.class.getName());
	
	@Autowired
	CidadeRepository repository;
	
	public List<Cidade> findAll(){
		logger.info("Procurando todas as cidades");
		
		return repository.findAll();
	}
	
	public Cidade findById(Long id) {
		logger.info("Procurando uma cidade pelo ID");
		
		return repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Nenhuma cidade encontrada para esse ID"));
	}
	
	public Cidade findByNome(String nome) {
		logger.info("Procurando uma cidade pelo nome");	
		
		Cidade cidade = repository.findByNome(nome);
		if(cidade == null) {
			throw new ResourceNotFoundException("Nenhuma cidade encontrada para esse nome");
		}
		
		return cidade;
	}
	
	public Cidade create(Cidade cidade) {
		logger.info("Criando uma cidade");
		
		return repository.save(cidade);
	}
	
	public Cidade update(Cidade cidade) {
		logger.info("Atulizando uma cidade");
		
		Cidade entity = repository.findById(cidade.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Nenhuma cidade encontrada para esse ID"));
		
		entity.setNome(cidade.getNome());
		entity.setEstado(cidade.getEstado());
		entity.setUpdated_at(cidade.getUpdated_at());
		
		return repository.save(entity);
	}
	
	public void delete(Long id) {
		logger.info("Deletando uma cidade");
		
		Cidade entity = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Nenhuma cidade encontrada para esse ID"));
		
		repository.delete(entity);
	}

}
