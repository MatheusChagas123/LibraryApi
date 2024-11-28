package com.biblioteca.sistemasDistribuidos.Model;

import com.biblioteca.sistemasDistribuidos.Dto.LivroDto.LivroPostDto;
import com.biblioteca.sistemasDistribuidos.Enums.EstadoDoLivro;
import com.biblioteca.sistemasDistribuidos.Enums.Genero;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "livros")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LivroModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private String titulo;
    private String autor;

    @Enumerated(EnumType.STRING)
    private Genero genero;

    private LocalDate dataDePublicacao;
    private String descricao;

    @Enumerated(EnumType.STRING)
    private EstadoDoLivro estadoDoLivro;
    private int qtdEmprestado;
    private boolean emprestado;

    @OneToOne(mappedBy = "livro")
    private EmprestimoModel emprestimoAtual;


    public LivroModel(LivroPostDto data) {
        this.titulo = data.titulo();
        this.autor = data.autor();
        this.genero = data.genero();
        this.dataDePublicacao = data.dataDePublicacao();
        this.descricao = data.descricao();
        this.estadoDoLivro = data.estadoDoLivro();
    }
}
