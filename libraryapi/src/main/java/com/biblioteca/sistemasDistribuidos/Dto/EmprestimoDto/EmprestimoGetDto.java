package com.biblioteca.sistemasDistribuidos.Dto.EmprestimoDto;

import com.biblioteca.sistemasDistribuidos.Dto.LivroDto.LivroGetDto;
import com.biblioteca.sistemasDistribuidos.Dto.UsuarioDto.UsuarioGetDto;
import com.biblioteca.sistemasDistribuidos.Model.EmprestimoModel;

import java.time.LocalDate;

public record EmprestimoGetDto(Long id,
                               UsuarioGetDto usuario,
                               LivroGetDto livro,
                               LocalDate dataLimite) {

    public EmprestimoGetDto(EmprestimoModel emprestimo) {
        this(emprestimo.getId(), new UsuarioGetDto(emprestimo.getUsuario()),
                new LivroGetDto(emprestimo.getLivro()), emprestimo.getDataLimite());
    }
}
