package com.biblioteca.sistemasDistribuidos.Model;

import com.biblioteca.sistemasDistribuidos.Dto.EmprestimoDto.EmprestimoPostDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "emprestimos")
public class EmprestimoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private UsuarioModel usuario;

    @ManyToOne
    @JoinColumn(name = "livro_id")
    private LivroModel livro;

    private LocalDate dataLimite;

    public EmprestimoModel(LivroModel livro, UsuarioModel usuario, EmprestimoPostDto data) {
        this.livro = livro;
        this.usuario = usuario;
        this.dataLimite = data.dataLimite();
    }
}
