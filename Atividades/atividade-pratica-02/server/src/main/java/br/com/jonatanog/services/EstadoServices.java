package br.com.jonatanog.services;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.jonatanog.exceptions.ResourceNotFoundException;
import br.com.jonatanog.model.Estado;
import br.com.jonatanog.repositories.EstadoRepository;

@Service
public class EstadoServices {	
	private Logger logger = Logger.getLogger(EstadoServices.class.getName());
	
	@Autowired
	EstadoRepository repository;
	
	public List<Estado> findAll(){
		logger.info("Procurando todos estados");
		
		return repository.findAll();
	}

	public Estado findById(Long id) {
		logger.info("Procurando um estado");
				
		return repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Nenhum estado encontrado para esse ID"));
	}
	
	public Estado findByNome(String nome) {
		logger.info("Procurando um estado pelo nome");	
		
		Estado estado = repository.findByNome(nome);
		if(estado == null) {
			throw new ResourceNotFoundException("Nenhum estado encontrado para esse nome");
		}
		
		return estado;
	}
	
	public Estado create(Estado estado) {
		logger.info("Criando um estado");
		
		return repository.save(estado);
	}
	
	public Estado update(Estado estado) {
		logger.info("Atualizando um estado");
		
		Estado entity = repository.findById(estado.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Nenhum estado encontrado para esse ID"));
		
		entity.setNome(estado.getNome());
		entity.setSigla(estado.getSigla());
		entity.setUpdated_at(estado.getUpdated_at());
		
		return repository.save(entity);
	}
	
	public void delete(Long id) {
		logger.info("Deletando um estado");
		
		Estado entity = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Nenhum estado encontrado para esse ID"));
		
		repository.delete(entity);
	}
}
