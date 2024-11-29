package com.biblioteca.sistemasDistribuidos.Controller;

import com.biblioteca.sistemasDistribuidos.Dto.EmprestimoDto.EmprestimoPostDto;
import com.biblioteca.sistemasDistribuidos.Service.EmprestimoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Emprestimo")
public class EmprestimoController {

    @Autowired
    private EmprestimoService emprestimoService;

    @PostMapping("/aluga")
    @Transactional
    public ResponseEntity<?> alugaLivro(@RequestBody @Valid EmprestimoPostDto data){

        return emprestimoService.alugaLivro(data);
    }

    @GetMapping("/todos")
    public ResponseEntity<?> retornaEmprestimos(Pageable pageable){

        return emprestimoService.retornoEmprestimos(pageable);
    }

    @DeleteMapping("/devolucao/{id}")
    @Transactional
    public ResponseEntity<?> devolveLivro(@PathVariable Long id){

        return emprestimoService.devolucaoDeLivro(id);
    }

}
