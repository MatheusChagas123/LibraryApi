package com.biblioteca.sistemasDistribuidos.Dto.UsuarioDto;

import com.biblioteca.sistemasDistribuidos.Dto.EnderecoDto.EnderecoPutDto;
import com.biblioteca.sistemasDistribuidos.Enums.Status;

public record UsuarioPutDto(String nome,
                            EnderecoPutDto endereco,
                            String email,
                            String telefone,
                            Status status) {
}
