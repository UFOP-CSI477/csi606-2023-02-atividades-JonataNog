package br.com.jonatanog.services;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.jonatanog.exceptions.ResourceNotFoundException;
import br.com.jonatanog.model.Pessoa;
import br.com.jonatanog.repositories.PessoaRepository;

@Service
public class PessoaServices {
	
	private Logger logger = Logger.getLogger(CidadeServices.class.getName());

	@Autowired
	PessoaRepository repository;
	
	public List<Pessoa> findAll(){
		logger.info("Procurando todas as pessoas");
		
		return repository.findAll();
	}
	
	public Pessoa findById(Long id) {
		logger.info("Procurando uma pessoa");
		
		return repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Nenhuma pessoa encontrada para esse ID"));
	}
	
	public Pessoa findByNome(String nome) {
		logger.info("Procurando uma pessoa pelo nome");	
		
		Pessoa pessoa = repository.findByNome(nome);
		if(pessoa == null) {
			throw new ResourceNotFoundException("Nenhuma pessoa encontrada para esse nome");
		}
		
		return pessoa;
	}
	
	public Pessoa create(Pessoa pessoa) {
		logger.info("Criando uma pessoa");
		
		return repository.save(pessoa);
	}
	
	public Pessoa update(Pessoa pessoa) {
		logger.info("Atulizando uma pessoa");
		
		Pessoa entity = repository.findById(pessoa.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Nenhuma pessoa encontrada para esse ID"));
		
		entity.setNome(pessoa.getNome());
		entity.setRua(pessoa.getRua());
		entity.setNumero(pessoa.getNumero());
		entity.setComplemento(pessoa.getComplemento());
		entity.setRg(pessoa.getRg());
		entity.setCidade(pessoa.getCidade());
		entity.setTipoSanguineo(pessoa.getTipoSanguineo());
		entity.setUpdated_at(pessoa.getUpdated_at());
		
		return repository.save(entity);
	}
	
	public void delete(Long id) {
		logger.info("Deletando uma pessoa");
		
		Pessoa entity = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Nenhuma pessoa encontrada para esse ID"));
		
		repository.delete(entity);
	}
}
