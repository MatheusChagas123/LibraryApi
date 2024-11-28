package com.biblioteca.sistemasDistribuidos.Dto.EnderecoDto;

import jakarta.validation.constraints.NotBlank;

public record EnderecoPostDto(@NotBlank String logradouro,
                              @NotBlank String cep,
                              @NotBlank String bairro,
                              @NotBlank String cidade,
                              @NotBlank String numero) {
}
