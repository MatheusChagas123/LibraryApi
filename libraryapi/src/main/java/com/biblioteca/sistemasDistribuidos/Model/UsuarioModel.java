package com.biblioteca.sistemasDistribuidos.Model;

import com.biblioteca.sistemasDistribuidos.Dto.UsuarioDto.UsuarioPostDto;
import com.biblioteca.sistemasDistribuidos.Enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "usuarios")
public class UsuarioModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Embedded
    private EnderecoModel endereco;
    private String email;
    private String telefone;

    @Enumerated(EnumType.STRING)
    private Status status;

    @OneToMany(mappedBy = "usuario")
    private List<EmprestimoModel> emprestimos;

    private int maxEmprestimos;

    public UsuarioModel(UsuarioPostDto data) {
        this.nome = data.nome();
        this.endereco = new EnderecoModel(data.endereco());
        this.email = data.email();
        this.telefone = data.telefone();
    }


}
