
# Sistema de Gerenciamento de Biblioteca

Este projeto tem como objetivo desenvolver uma API RESTful para gerenciar os recursos de uma biblioteca, permitindo o controle de livros, usuários (leitores) e empréstimos. O sistema visa simplificar a administração de uma biblioteca, fornecendo funcionalidades robustas e uma interface web amigável, ambas conteinerizadas para fácil implantação e manutenção.


## Apêndice

Coloque qualquer informação adicional aqui


# Documentação da API

## Usuários 

#### Cadastro de Usuários

```http
  POST localhost:8080/Usuario/aluga
```

#### Json

Exemplo:

```bash
  {
     "nome":"Caua ",
    "endereco":{
        "logradouro":"logradouro",
        "cep":"cep",
        "bairro":"bairro",
        "cidade":"cidade",
        "numero":"numero"
    },
    "email":"caua1@gmail.com",
    "telefone":"telefone"
}
```

#### Retorna Usuárioss

```http
  GET /localhost:8080/Usuario/todos
```

#### Retorna Usuários por ID

```http
  GET /localhost:8080/Usuario/ID
```

#### Retorna Usuario Por Status

```http
  GET /localhost:8080//Usuario/status?status=SEM_LIVRO
```

#### Atualiza Usuários por ID

```http
  PUT /localhost:8080/Usuario/ID
```

#### Json

Exemplo:

```bash
  {
    "email":"teste1@gmail.com"
}
```

#### Deleta Usuários por ID

```http
  DELETE /localhost:8080/Usuario/ID
```

## Livros

#### Registra Livro

```http
  POST /localhost:8080/Livro/registra
```

#### Json

Exemplo:

```bash
  {
    "titulo":"Harry Potter 1",
    "autor":"Nao lembro",
    "genero":"AUTO_AJUDA",
    "dataDePublicacao":"2024-12-19",
    "descricao":"teste 1",
    "estadoDoLivro":"CONSERVADO"
}
```

#### Retorna Livro

```http
  GET /localhost:8080/Livro/todos
```

#### Retorna Livro por ID

```http
  GET /localhost:8080/Livro/ID
```

#### Top 5 Livros

```http
  GET /localhost:8080/Livro/maisEmprestado
```

#### Atualiza Livro por ID

```http
  PUT /localhost:8080/Livro/ID
```

#### Json

Exemplo:

```bash
  {
    "titulo":"Como ser um bom professor"
}
```

#### Deleta Livro por ID

```http
  DELETE /localhost:8080/Livro/ID
```

## Empréstimo

#### Cadastro de Empréstimo

```http
  POST localhost:8080/Emprestimo/cadastra
```

#### Json

Exemplo:

```bash
  {
    "usuarioId":1,
    "livroId":2,
    "dataLimite":"2024-11-29"
}
```
#### Retorna Emprestino

```http
  GET /localhost:8080/Emprestino/todos
```

#### Deleta Emprestimo por ID

```http
  DELETE /localhost:8080/Emprestimo/devolucao/ID
```


## Contribuindo

Contribuições são sempre bem-vindas!

Veja [CONTRIBUTING.md](https://github.com/MatheusChagas123/LibraryApi/blob/main/CONTRIBUTING.md) para saber como começar.

Por favor, siga o `código de conduta` desse projeto.


## Autores

- [@Arnaldo Nascimento](https://github.com/ArnaldoWillian) 01401248 - Documentador

- [@Cauã Cunha](https://github.com/CauaSiqueira29) 01432916 - Desenvolvedor

- [@Deangellis Silva](https://github.com/Deangellisberg) 11024358 - Documentador

- [@Ítalo Souza](https://github.com/Italo-Bessa) 01200094 - Documentador

- [@Jonathas Freitas](https://github.com/Dev-Jonathas) 01403089 - Desenvolvedor

- [@Matheus Chagas](https://www.github.com/MatheusChagas123) 01455797 - Gerente de configuração

- [@Pedro Melo](https://github.com/PedroAlencarM) 01482712 - Scrum Master


## License
-[Licença](https://github.com/MatheusChagas123/LibraryApi/blob/main/LICENSE)
