package com.biblioteca.sistemasDistribuidos.Dto.EnderecoDto;

public record EnderecoPutDto(String logradouro,
                             String cep,
                             String bairro,
                             String cidade,
                             String numero) {
}
