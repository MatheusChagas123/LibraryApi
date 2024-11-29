package com.biblioteca.sistemasDistribuidos.Model;

import com.biblioteca.sistemasDistribuidos.Dto.EnderecoDto.EnderecoPostDto;
import com.biblioteca.sistemasDistribuidos.Dto.EnderecoDto.EnderecoPutDto;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class EnderecoModel {

    private String logradouro;
    private String cep;
    private String bairro;
    private String cidade;
    private String numero;

    public EnderecoModel(EnderecoPostDto data) {
        this.logradouro = data.logradouro();
        this.cep = data.cep();
        this.bairro = data.bairro();
        this.cidade = data.cidade();
        this.numero = data.numero();
    }

    public void atualizaRegistroEndereco(EnderecoPutDto data) {

        if (data.logradouro() != null){
            this.logradouro = data.logradouro();
        }
        if (data.bairro() != null){
            this.bairro = data.bairro();
        }
        if (data.cep() != null){
            this.cep = data.cep();
        }
        if (data.cidade() != null){
            this.cidade = data.cidade();
        }
        if (data.numero() != null){
            this.numero = data.numero();
        }

    }
}
