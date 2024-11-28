package com.biblioteca.sistemasDistribuidos.Dto.UsuarioDto;

import com.biblioteca.sistemasDistribuidos.Dto.EnderecoDto.EnderecoPostDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UsuarioPostDto(@NotBlank
                             String nome,

                             @Valid
                             EnderecoPostDto endereco,

                             @NotBlank
                             @Email
                             String email,

                             @NotBlank
                             String telefone) {
}
