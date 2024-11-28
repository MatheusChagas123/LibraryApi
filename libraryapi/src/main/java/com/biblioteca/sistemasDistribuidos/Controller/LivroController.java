package com.biblioteca.sistemasDistribuidos.Controller;

import com.biblioteca.sistemasDistribuidos.Dto.LivroDto.LivroPostDto;
import com.biblioteca.sistemasDistribuidos.Dto.LivroDto.LivroPutDto;
import com.biblioteca.sistemasDistribuidos.Service.LivroService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/Livro")
@RestController
public class LivroController {

    @Autowired
    private LivroService service;

    @PostMapping("/registra")
    @Transactional
    public ResponseEntity<?> registraLivro(@RequestBody @Valid LivroPostDto data){
        return service.registraLivro(data);
    }

    @GetMapping("/todos")
    public ResponseEntity<?> retornaLivros(Pageable pageable){
        return service.retornaLivros(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> retornaLivroPorId(@PathVariable Long id){
        return service.retornaLivroPorId(id);
    }

    @GetMapping("/maisEmprestado")
    public ResponseEntity<?> retornaTop5LivroMaisEmprestado(Pageable pageable){

        return service.retornaTop5LivroMaisEmprestado(pageable);
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<?> atualizaLivro(@PathVariable Long id, @RequestBody @Valid LivroPutDto data){
        return service.atualizaLivro(data, id);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> deletaLivro(@PathVariable Long id){
        return service.deletaLivro(id);
    }

}
