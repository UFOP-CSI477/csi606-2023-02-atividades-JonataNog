package br.com.jonatanog.services;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.jonatanog.exceptions.ResourceNotFoundException;
import br.com.jonatanog.model.TipoSanguineo;
import br.com.jonatanog.repositories.TipoSanguineoRepository;

@Service
public class TipoSanguineoServices {

	private Logger logger = Logger.getLogger(CidadeServices.class.getName());
	
	@Autowired
	TipoSanguineoRepository repository;
	
	public List<TipoSanguineo> findAll(){
		logger.info("Procurando todos os tipos sanguineos");
		
		return repository.findAll();
	}
	
	public TipoSanguineo findById(Long id) {
		logger.info("Procurando um tipo sanguineo");
		
		return repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Nenhum tipo sanguineo encontrado para esse ID"));
	}
	
	public TipoSanguineo create(TipoSanguineo tipoSanguineo) {
		logger.info("Criando uma tipo sanguineo");
		
		return repository.save(tipoSanguineo);
	}
	
	public TipoSanguineo update(TipoSanguineo tipoSanguineo) {
		logger.info("Atulizando um tipo sanguineo");
		
		TipoSanguineo entity = repository.findById(tipoSanguineo.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Nenhum tipo sanguineo encontrado para esse ID"));
		
		entity.setTipo(tipoSanguineo.getTipo());
		entity.setFator(tipoSanguineo.getFator());
		entity.setUpdated_at(tipoSanguineo.getUpdated_at());
		
		return repository.save(entity);
	}
	
	public void delete(Long id) {
		logger.info("Deletando um tipo sanguineo");
		
		TipoSanguineo entity = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Nenhum tipo sanguineo encontrado para esse ID"));
		
		repository.delete(entity);
	}
}
