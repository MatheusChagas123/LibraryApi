package com.biblioteca.sistemasDistribuidos.Repository;

import com.biblioteca.sistemasDistribuidos.Model.LivroModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface LivroRepository extends JpaRepository<LivroModel, Long> {
    Optional<LivroModel> findByTitulo(String titulo);

    @Override
    Page<LivroModel> findAll(Pageable pageable);

    List<LivroModel> findTop5ByOrderByQtdEmprestadoDesc(Pageable pageable);
}
