package br.com.jonatanog.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.jonatanog.model.LocalColeta;
import br.com.jonatanog.services.LocalColetaServices;

@RestController
@RequestMapping("/local-coleta")
public class LocalColetaController {
	
	@Autowired
	private LocalColetaServices service;

	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public List<LocalColeta> findAll(){
		
		return service.findAll();
	}
	
	@GetMapping(value="/id/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public LocalColeta findById(@PathVariable(value = "id") Long id) {
		return service.findById(id);
	}
	
	@GetMapping(value="/name/{nome}", produces = MediaType.APPLICATION_JSON_VALUE)
	public LocalColeta findByName(@PathVariable(value = "nome") String nome) {
		return service.findByNome(nome);
	}
	
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public LocalColeta create(@RequestBody LocalColeta localColeta) {
		
		return service.create(localColeta);
	}
	
	@PutMapping(value="/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public LocalColeta update(@RequestBody LocalColeta localColeta) {
		
		return service.update(localColeta);
	}
	
	@DeleteMapping(value="/{id}")
	public ResponseEntity<?> delete(@PathVariable(value = "id") Long id){
		
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
}
