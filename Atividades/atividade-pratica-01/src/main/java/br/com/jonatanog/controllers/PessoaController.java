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

import br.com.jonatanog.model.Pessoa;
import br.com.jonatanog.services.PessoaServices;

@RestController
@RequestMapping("/pessoa")
public class PessoaController {
	
	@Autowired
	private PessoaServices service;
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Pessoa> findAll(){
		
		return service.findAll();
	}

	@GetMapping(value="/id/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public Pessoa findById(@PathVariable(value = "id") Long id){
		
		return service.findById(id);
	}
	
	@GetMapping(value="/name/{nome}", produces = MediaType.APPLICATION_JSON_VALUE)
	public Pessoa findByName(@PathVariable(value = "nome") String nome) {
		return service.findByNome(nome);
	}
	
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public Pessoa create(@RequestBody Pessoa pessoa){
		
		return service.create(pessoa);
	}
	
	@PutMapping(value="/{id}",consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public Pessoa update(@RequestBody Pessoa pessoa){
		
		return service.update(pessoa);
	}
	
	@DeleteMapping(value="/{id}")
	public ResponseEntity<?> delete(@PathVariable(value = "id") Long id){
		
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}
