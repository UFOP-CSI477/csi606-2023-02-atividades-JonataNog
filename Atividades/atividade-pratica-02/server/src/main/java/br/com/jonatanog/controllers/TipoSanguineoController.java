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

import br.com.jonatanog.model.TipoSanguineo;
import br.com.jonatanog.services.TipoSanguineoServices;

@RestController
@RequestMapping("/tipo-sanguineo")
public class TipoSanguineoController {
	
	@Autowired
	private TipoSanguineoServices service;
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public List<TipoSanguineo> findAll(){
		
		return service.findAll();
	}

	@GetMapping(value="/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public TipoSanguineo findById(@PathVariable(value = "id") Long id){
		
		return service.findById(id);
	}
	
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public TipoSanguineo create(@RequestBody TipoSanguineo estado){
		
		return service.create(estado);
	}
	
	@PutMapping(value="/{id}",consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public TipoSanguineo update(@RequestBody TipoSanguineo estado){
		
		return service.update(estado);
	}
	
	@DeleteMapping(value="/{id}")
	public ResponseEntity<?> delete(@PathVariable(value = "id") Long id){
		
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}
