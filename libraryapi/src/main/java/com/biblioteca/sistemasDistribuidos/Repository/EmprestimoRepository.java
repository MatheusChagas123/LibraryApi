package com.biblioteca.sistemasDistribuidos.Repository;

import com.biblioteca.sistemasDistribuidos.Model.EmprestimoModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmprestimoRepository extends JpaRepository<EmprestimoModel, Long> {
}
