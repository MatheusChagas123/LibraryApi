
# Sistema de Gerenciamento de Biblioteca

Este projeto tem como objetivo desenvolver uma API RESTful para gerenciar os recursos de uma biblioteca, permitindo o controle de livros, usuários (leitores) e empréstimos. O sistema visa simplificar a administração de uma biblioteca, fornecendo funcionalidades robustas e uma interface web amigável, ambas conteinerizadas para fácil implantação e manutenção.


## Apêndice

Coloque qualquer informação adicional aqui


## Documentação da API

#### Retorna todos os itens

```http
  GET /api/items
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |

#### Retorna um item

```http
  GET /api/items/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### add(num1, num2)

Recebe dois números e retorna a sua soma.


## Contribuindo

Contribuições são sempre bem-vindas!

Veja `CONTRIBUTIN.md` para saber como começar.

Por favor, siga o `código de conduta` desse projeto.


## Autores

- [@Arnaldo Nascimento](https://github.com/ArnaldoWillian) 01401248 - Documentador

- [@Cauã Cunha](https://github.com/CauaSiqueira29) 01432916 - Desenvolvedor

- [@Deangellis Silva](hhttps://github.com/Deangellisberg) 11024358 - Documentador

- [@Ítalo Souza](https://github.com/Italo-Bessa) 01200094 - Documentador

- [@Jonathas Freitas](https://github.com/Dev-Jonathas) 01403089 - Desenvolvedor

- [@Matheus Chagas](https://www.github.com/MatheusChagas123) 01455797 - Gerente de configuração

- [@Pedro Melo](https://github.com/PedroAlencarM) 01482712 - Scrum Master


## License
-[Licença](https://github.com/MatheusChagas123/LibraryApi/blob/main/LICENSE)
