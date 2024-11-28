package com.biblioteca.sistemasDistribuidos.Controller;

import com.biblioteca.sistemasDistribuidos.Dto.UsuarioDto.UsuarioPostDto;
import com.biblioteca.sistemasDistribuidos.Dto.UsuarioDto.UsuarioPutDto;
import com.biblioteca.sistemasDistribuidos.Enums.Status;
import com.biblioteca.sistemasDistribuidos.Service.EmprestimoService;
import com.biblioteca.sistemasDistribuidos.Service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/Usuario")
@RestController
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private EmprestimoService emprestimoService;

    @PostMapping("/cadastra")
    @Transactional
    public ResponseEntity<?> cadastraUsuario(@RequestBody @Valid UsuarioPostDto data){

        return usuarioService.cadastraUsuario(data);
    }

    @GetMapping("/todos")
    public ResponseEntity<?> retornaUsuarios(Pageable pageable){

        return usuarioService.retornaUsuarios(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> retornaUsuarioPorId(@PathVariable Long id){

        return usuarioService.retornaUsuarioPorId(id);
    }

    @GetMapping("/status")
    public ResponseEntity<?> retornaUsuarioPorStatus(@RequestParam Status status){
        return usuarioService.retornaUsuariosPorStatus(status);
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<?> atualizaUsuario(@PathVariable Long id, @RequestBody @Valid UsuarioPutDto data){

        return usuarioService.atualizaUsuario(id, data);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> deletaUsuario(@PathVariable Long id){

        return usuarioService.deletaUsuario(id);
    }

}
