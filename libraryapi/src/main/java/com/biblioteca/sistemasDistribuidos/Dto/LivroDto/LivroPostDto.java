package com.biblioteca.sistemasDistribuidos.Dto.LivroDto;

import com.biblioteca.sistemasDistribuidos.Enums.EstadoDoLivro;
import com.biblioteca.sistemasDistribuidos.Enums.Genero;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record LivroPostDto(@NotBlank String titulo,
                           @NotBlank String autor,
                           @NotNull Genero genero,
                           @NotNull LocalDate dataDePublicacao,
                           @NotBlank String descricao,
                           @NotNull EstadoDoLivro estadoDoLivro) {
}
