package com.biblioteca.sistemasDistribuidos.Dto.EmprestimoDto;

public record EmprestimoDeleteDto(Long emprestimoId,
                                  Long livroId,
                                  Long usuarioId) {
}
