# Sistema de Gerenciamento de Biblioteca

Este projeto tem como objetivo desenvolver uma API RESTful para gerenciar os recursos de uma biblioteca, permitindo o controle de livros, usuários (leitores) e empréstimos. O sistema visa simplificar a administração de uma biblioteca, fornecendo funcionalidades robustas e uma interface web amigável, ambas conteinerizadas para fácil implantação e manutenção.

## Como Baixar o Repositório
```bash
  git clone https://github.com/MatheusChagas123/LibraryApi.git
  cd LibaryApi
  
```
## Pré-requisitos


## Padrões de Commit

- **feat**: Um novo recurso para a aplicação, e não precisa ser algo grande, mas apenas algo que não existia antes e que a pessoa final irá acessar.
- **fix**: Correções de bugs
- **docs**: Alterações em arquivos relacionados à documentações
- **style**: Alterações de estilização, formatação etc
- **refactor**: Um codigo de refatoração, ou seja, que foi alterado, que tem uma mudança transparente para o usuário final, porém uma mudança real para a aplicação
- **perf**: Alterações relacionadas à performance
- **test**: Criação ou modificação de testes
- **chore**: Alterações em arquivos de configuração, build, distribuição, CI, ou qualquer outra coisa que não envolva diretamente o código da aplicação para o usuário final

```bash
 # Exemplo
feat(posts): creating hook to integrate with posts API
test: add missing tests for posts hook
```

## Padrão de Título na Pull Request
Para facilitar a identificação da tarefa e em qual frente você deseja alterar, utilize:

```bash
 # Padrão:
  local de alteração/atualização tipo(escopo): descriçao

# Exemplo:
backAnd feat(posts): creating hook to integrate with posts API

```
