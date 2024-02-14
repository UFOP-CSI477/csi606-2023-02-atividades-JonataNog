package br.com.jonatanog.services;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.jonatanog.exceptions.ResourceNotFoundException;
import br.com.jonatanog.model.Doacao;
import br.com.jonatanog.repositories.DoacaoRepository;

@Service
public class DoacaoServices {

	private Logger logger = Logger.getLogger(CidadeServices.class.getName());
	
	@Autowired
	DoacaoRepository repository;
	
	public List<Doacao> findAll(){
		logger.info("Procurando todas as doacoes");
		
		return repository.findAll();
	}
	
	public Doacao findById(Long id) {
		logger.info("Procurando uma doacao");
		
		return repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Nenhuma doacao encontrada para esse ID"));
	}
	
	public Doacao create(Doacao doacao) {
		logger.info("Criando uma doacao");
		
		return repository.save(doacao);
	}
	
	public Doacao update(Doacao doacao) {
		logger.info("Atulizando uma doacao");
		
		Doacao entity = repository.findById(doacao.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Nenhuma doacao encontrada para esse ID"));
		
		entity.setPessoa(doacao.getPessoa());
		entity.setLocalColeta(doacao.getLocalColeta());
		entity.setData(doacao.getData());
		entity.setUpdated_at(doacao.getUpdated_at());
		
		return repository.save(entity);
	}
	
	public void delete(Long id) {
		logger.info("Deletando uma doacao");
		
		Doacao entity = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Nenhuma doacao encontrada para esse ID"));
		
		repository.delete(entity);
	}
	
}
