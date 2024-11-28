package com.biblioteca.sistemasDistribuidos.Repository;

import com.biblioteca.sistemasDistribuidos.Enums.Status;
import com.biblioteca.sistemasDistribuidos.Model.UsuarioModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<UsuarioModel, Long> {
    Optional<UsuarioModel> findByEmail(String email);

    Optional<List<UsuarioModel>> findByStatus(Status status);
}
