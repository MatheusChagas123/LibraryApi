package com.biblioteca.sistemasDistribuidos.Dto.LivroDto;

import com.biblioteca.sistemasDistribuidos.Enums.EstadoDoLivro;
import com.biblioteca.sistemasDistribuidos.Enums.Genero;

import java.time.LocalDate;

public record LivroPutDto(String titulo,
                          String autor,
                          Genero genero,
                          LocalDate dataDePublicacao,
                          String descricao,
                          int qtdEmprestado,
                          EstadoDoLivro estadoDoLivro) {
}
