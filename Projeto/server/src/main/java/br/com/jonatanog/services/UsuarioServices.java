package br.com.jonatanog.services;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.jonatanog.exceptions.ResourceNotFoundException;
import br.com.jonatanog.model.Usuario;
import br.com.jonatanog.repositories.UsuarioRepository;

@Service
public class UsuarioServices {
	
private Logger logger = Logger.getLogger(UsuarioServices.class.getName());
	
	@Autowired
	UsuarioRepository repository;
	
	public List<Usuario> findAll(){
		logger.info("Procurando todos filmes");
		
		return repository.findAll();
	}
	
	public Usuario findById(Long id) {
		logger.info("Procurando um usuario pelo ID");
		
		return repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Nenhum usuario encontrado para esse ID"));
	}
	
	public Usuario create(Usuario usuario) {
		logger.info("Criando um usuario");
		
		return repository.save(usuario);
	}
	
	public Usuario update(Usuario usuario) {
		logger.info("Atulizando um usuario");
		
		Usuario entity = repository.findById(usuario.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Nenhum usuario encontrado para esse ID"));
		
		entity.setUsername(usuario.getUsername());
		entity.setPassword(usuario.getPassword());
		
		return repository.save(entity);
	}
	
	public void delete(Long id) {
		logger.info("Deletando um usuario");
		
		Usuario entity = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Nenhum usuario encontrado para esse ID"));
		
		repository.delete(entity);
	}
	
	public boolean autenticaUsuario(String username, String password) {
		Usuario user = repository.findByUsername(username);
		
		return user != null && user.getPassword().equals(password);
	}

}
