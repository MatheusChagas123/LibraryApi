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
