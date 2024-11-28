package com.biblioteca.sistemasDistribuidos.Service;

import com.biblioteca.sistemasDistribuidos.Dto.UsuarioDto.UsuarioGetDto;
import com.biblioteca.sistemasDistribuidos.Dto.UsuarioDto.UsuarioPostDto;
import com.biblioteca.sistemasDistribuidos.Dto.UsuarioDto.UsuarioPutDto;
import com.biblioteca.sistemasDistribuidos.Enums.Status;
import com.biblioteca.sistemasDistribuidos.Model.UsuarioModel;
import com.biblioteca.sistemasDistribuidos.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Cadastro
    public ResponseEntity<?> cadastraUsuario(UsuarioPostDto data){
        var procuraUsuario = usuarioRepository.findByEmail(data.email());

        if (procuraUsuario.isEmpty()){

            var usuario = new UsuarioModel(data);
            usuarioRepository.save(usuario);

            return ResponseEntity.status(HttpStatus.CREATED).body(new UsuarioGetDto(usuario));
        }

        return ResponseEntity.badRequest().body("Usuário já cadastrado!");
    }

    // Retorna todos
    public ResponseEntity<?> retornaUsuarios(@PageableDefault(size = 10, sort = {"nome"}) Pageable pageable){

        return ResponseEntity.status(HttpStatus.OK).body(usuarioRepository.findAll().stream().map(UsuarioGetDto::new));
    }

    // Retorna por id
    public ResponseEntity<?> retornaUsuarioPorId(Long id){

        return ResponseEntity.status(HttpStatus.OK)
                .body(usuarioRepository.findById(id).map(UsuarioGetDto::new)
                        .orElseThrow(() -> new RuntimeException("Usuario com id: " + id + " não encontrado")));
    }

    // Retorna usuários com um status específico
    public ResponseEntity<?> retornaUsuariosPorStatus(Status status){
        var usuarios = usuarioRepository.findByStatus(status).orElseThrow(() ->
                new RuntimeException("Usuários com status: " + status + " não encontrado"));

        return ResponseEntity.status(HttpStatus.OK).body(usuarios.stream().map(UsuarioGetDto::new));
    }

    // Atualiza
    public ResponseEntity<?> atualizaUsuario(Long id, UsuarioPutDto data){
        var usuario = usuarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuario com id: " + id + " não encontrado"));

        if (data.nome() != null){
            usuario.setNome(data.nome());
        }

        if (data.endereco() != null){
            usuario.getEndereco().atualizaRegistroEndereco(data.endereco());
        }

        if (data.email() != null){
            usuario.setEmail(data.email());
        }

        if (data.telefone() != null){
            usuario.setTelefone(data.telefone());
        }

        if (data.status() != null){
            usuario.setStatus(data.status());
        }

        usuarioRepository.save(usuario);

        return ResponseEntity.status(HttpStatus.OK).body(new UsuarioGetDto(usuario));
    }

    // Deleta
    public ResponseEntity<?> deletaUsuario(Long id){
        var usuario = usuarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuario com id: " + id + " não encontrado!"));

        usuarioRepository.deleteById(id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Usuário deletado!");
    }

    public void verificaStatus(UsuarioModel usuario) {
        boolean possuiAtraso = usuario.getEmprestimos().stream()
                .anyMatch(emprestimo -> emprestimo.getDataLimite().isBefore(LocalDate.now()));

        if (possuiAtraso) {
            usuario.setStatus(Status.EM_ATRASO);
        } else if (usuario.getEmprestimos().isEmpty()) {
            usuario.setStatus(Status.SEM_LIVRO);
        } else {
            usuario.setStatus(Status.COM_LIVRO);
        }

        usuarioRepository.save(usuario);
    }


}