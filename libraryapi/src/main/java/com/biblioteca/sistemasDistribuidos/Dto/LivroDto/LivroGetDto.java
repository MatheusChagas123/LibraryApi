package com.biblioteca.sistemasDistribuidos.Dto.LivroDto;

import com.biblioteca.sistemasDistribuidos.Enums.EstadoDoLivro;
import com.biblioteca.sistemasDistribuidos.Enums.Genero;
import com.biblioteca.sistemasDistribuidos.Model.LivroModel;

import java.time.LocalDate;

public record LivroGetDto(Long id,
                          String titulo,
                          String autor,
                          Genero genero,
                          LocalDate dataDePublicacao,
                          String descricao,
                          int qtdEmprestado,
                          EstadoDoLivro estadoDoLivro,
                          boolean emprestado) {

    public LivroGetDto(LivroModel livro) {
        this(livro.getId(), livro.getTitulo(), livro.getAutor(), livro.getGenero(), livro.getDataDePublicacao(),
                livro.getDescricao(), livro.getQtdEmprestado(), livro.getEstadoDoLivro(), livro.isEmprestado());
    }

}
