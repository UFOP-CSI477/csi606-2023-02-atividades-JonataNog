package br.com.jonatanog.services;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.jonatanog.exceptions.ResourceNotFoundException;
import br.com.jonatanog.model.LocalColeta;
import br.com.jonatanog.repositories.LocalColetaRepository;

@Service
public class LocalColetaServices {
	
	private Logger logger = Logger.getLogger(CidadeServices.class.getName());
	
	@Autowired
	LocalColetaRepository repository;
	
	public List<LocalColeta> findAll(){
		logger.info("Procurando todos locais de coleta");
		
		return repository.findAll();
	}
	
	public LocalColeta findById(Long id) {
		logger.info("Procurando um local de coleta");
		
		return repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Nenhum local de coleta encontrado para esse ID"));
	}
	
	public LocalColeta findByNome(String nome) {
		logger.info("Procurando um local de coleta pelo nome");	
		
		LocalColeta localColeta = repository.findByNome(nome);
		if(localColeta == null) {
			throw new ResourceNotFoundException("Nenhum local de coleta encontrado para esse nome");
		}
		
		return localColeta;
	}
	
	public LocalColeta create(LocalColeta localColeta) {
		logger.info("Criando um local de coleta");
		
		return repository.save(localColeta);
	}
	
	public LocalColeta update(LocalColeta localColeta) {
		logger.info("Atulizando um local de coleta");
		
		LocalColeta entity = repository.findById(localColeta.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Nenhum local de coleta encontrado para esse ID"));
		
		entity.setNome(localColeta.getNome());
		entity.setRua(localColeta.getRua());
		entity.setNumero(localColeta.getNumero());
		entity.setComplemento(localColeta.getComplemento());
		entity.setCidade(localColeta.getCidade());
		entity.setUpdated_at(localColeta.getUpdated_at());
		
		return repository.save(entity);
	}
	
	public void delete(Long id) {
		logger.info("Deletando um local de coleta");
		
		LocalColeta entity = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Nenhum local de coleta encontrado para esse ID"));
		
		repository.delete(entity);
	}

}
