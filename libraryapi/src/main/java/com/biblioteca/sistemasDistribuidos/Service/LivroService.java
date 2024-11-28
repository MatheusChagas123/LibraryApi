package com.biblioteca.sistemasDistribuidos.Service;

import com.biblioteca.sistemasDistribuidos.Dto.LivroDto.LivroGetDto;
import com.biblioteca.sistemasDistribuidos.Dto.LivroDto.LivroPostDto;
import com.biblioteca.sistemasDistribuidos.Dto.LivroDto.LivroPutDto;
import com.biblioteca.sistemasDistribuidos.Model.LivroModel;
import com.biblioteca.sistemasDistribuidos.Repository.LivroRepository;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class LivroService {

    @Autowired
    private LivroRepository repository;

    // Cadastra
    public ResponseEntity<?> registraLivro(LivroPostDto data){
        var procuraLivro = repository.findByTitulo(data.titulo());

        if (procuraLivro.isEmpty()){

            var livro = new LivroModel(data);
            repository.save(livro);

            return ResponseEntity.status(HttpStatus.CREATED).body(new LivroGetDto(livro));
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Livro já cadastrado");

    }

    // Retorna todos
    public ResponseEntity<?> retornaLivros(@PageableDefault(size = 10, sort = {"titulo"}) Pageable pageable){

        return ResponseEntity.status(HttpStatus.OK).body(repository.findAll().stream().map(LivroGetDto::new));
    }

    // Retorna por id
    public ResponseEntity<?> retornaLivroPorId(Long id){

        return ResponseEntity.status(HttpStatus.OK)
                .body(repository.findById(id).map(LivroGetDto::new)
                        .orElseThrow(() -> new RuntimeException("Livro com id: " + id + " não encontrado")));
    }

    // Retorna Livro mais emprestado
    public ResponseEntity<?> retornaTop5LivroMaisEmprestado(Pageable pageable){
        var livros = repository.findTop5ByOrderByQtdEmprestadoDesc(pageable);

        if(livros.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.status(HttpStatus.OK).body(livros.stream().map(LivroGetDto::new));
    }

    // Atualiza
    public ResponseEntity<?> atualizaLivro(LivroPutDto data, Long id){
        var livro = repository.findById(id).orElseThrow(() -> new RuntimeException("Livro com id: " + id + " não encontrado"));

        if(data.titulo() != null){
            livro.setTitulo(data.titulo());
        }
        if (data.autor() != null){
            livro.setAutor(data.autor());
        }
        if(data.genero() != null){
            livro.setGenero(data.genero());
        }
        if(data.dataDePublicacao() != null){
            livro.setDataDePublicacao(data.dataDePublicacao());
        }
        if (data.descricao() != null){
            livro.setDescricao(data.descricao());
        }
        if (data.qtdEmprestado() != 0){
            livro.setQtdEmprestado(data.qtdEmprestado());
        }
        if (data.estadoDoLivro() != null){
            livro.setEstadoDoLivro(data.estadoDoLivro());
        }

        return ResponseEntity.status(HttpStatus.OK).body(new LivroGetDto(livro));

    }

    // Deleta
    public ResponseEntity<?> deletaLivro(Long id){
        var livro = repository.findById(id).orElseThrow(() -> new RuntimeException("Livro com id: " + id + " não encontrado"));

        repository.deleteById(id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Livro deletado!");
    }

}