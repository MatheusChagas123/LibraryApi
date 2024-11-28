package com.biblioteca.sistemasDistribuidos.Dto.UsuarioDto;

import com.biblioteca.sistemasDistribuidos.Enums.Status;
import com.biblioteca.sistemasDistribuidos.Model.EnderecoModel;
import com.biblioteca.sistemasDistribuidos.Model.UsuarioModel;

public record UsuarioGetDto(Long id,
                            String nome,
                            EnderecoModel endereco,
                            String email,
                            String telefone,
                            Status status) {

    public UsuarioGetDto(UsuarioModel usuario){
        this(usuario.getId(), usuario.getNome(), usuario.getEndereco(), usuario.getEmail(),
                usuario.getTelefone(), usuario.getStatus());
    }
}
