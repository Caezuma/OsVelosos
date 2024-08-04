# QA Trello API Integration

Este projeto realiza a integração com a API do Trello, permitindo a criação, exclusão e manipulação de quadros, listas, checklists, etiquetas e comentários em cartões. Desenvolvido com o objetivo de fornecer uma ferramenta para desenvolvimento acadêmico voltado para a qualidade e controle de processos, oferencendo funcionalidades que facilitam o gerenciamento de projetos e tarefas.

## Tecnologias Utilizadas

### Dependências de Produção

- **Node.js**: Ambiente de execução JavaScript.
- **Express** (^4.19.2): Framework web rápido, flexível e minimalista para Node.js.
- **Axios** (^1.7.2): Cliente HTTP baseado em Promises para o navegador e Node.js.
- **Dotenv** (^16.4.5): Carrega variáveis de ambiente de um arquivo `.env` para `process.env`.
- **Joi** (^17.13.3): Validação de dados com esquema para JavaScript.
- **Supertest** (^7.0.0): Biblioteca para testar APIs HTTP.

### Dependências de Desenvolvimento

- **ESLint** (^9.8.0): Ferramenta de linting para identificar e relatar padrões encontrados no ECMAScript/JavaScript.
- **Globals** (^15.8.0): Lista de variáveis globais reconhecidas por ESLint.
- **Jest** (^29.7.0): Estrutura de testes de JavaScript divertida e fácil.
- **jest-html-reporters** (^3.1.7): Relatórios HTML para testes Jest.

## Requisitos

- Node.js instalado
- Conta no Trello
- Chave de API e Token do Trello

## Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/Caezuma/OsVelosos.git
    cd OsVelosos
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

## Uso


1. Use uma ferramenta como Postman ou Insomnia para fazer requisições à API:

    - **Criar um quadro:**
        ```
        POST /trello/boards
        Body: { "name": "Nome do Quadro", "desc": "Descrição do Quadro" }
        ```
    - **Deletar um quadro:**
        ```
        DELETE /trello/boards/:boardId
        ```
    - **Obter um checklist:**
        ```
        GET /trello/checklists/:checklistId
        ```
    - **Obter uma etiqueta:**
        ```
        GET /trello/labels/:labelId
        ```
    - **Atualizar uma lista:**
        ```
        PUT /trello/lists/:listId
        Body: { "name": "Novo Nome da Lista" }
        ```
    - **Criar um comentário:**
        ```
        POST /trello/cards/:cardId/comments
        Body: { "text": "Texto do Comentário" }
        ```
    - **Deletar um comentário:**
        ```
        DELETE /trello/cards/:cardId/comments/:commentId
        ```

## Estrutura de Pastas

### src/
Diretório principal do código-fonte.

#### api/
Contém a lógica de negócios da aplicação.
- `business/services/`
  - `boardService.js`: Lógica de negócios para quadros.
  - `checklistService.js`: Lógica de negócios para checklists.
  - `commentService.js`: Lógica de negócios para comentários.
  - `labelService.js`: Lógica de negócios para etiquetas.
  - `listService.js`: Lógica de negócios para listas.

#### controllers/
Contém os controladores para cada recurso.
- `boardController.js`: Controlador para quadros.
- `checklistController.js`: Controlador para checklists.
- `commentController.js`: Controlador para comentários.
- `labelController.js`: Controlador para etiquetas.
- `listController.js`: Controlador para listas.

#### core/
Contém arquivos de configuração e funções essenciais.
- `config/`
  - `config.json`: Arquivo de configuração.
  - `env.json`: Variáveis de ambiente.
- `loadEnv.js`: Script para carregar variáveis de ambiente.
- `logger.js`: Implementação do Logger para geração de logs.
- `RequestManager.js`: Implementação do padrão Singleton para gerenciar requisições.

#### routes/
Define as rotas para a API.
- `trello.js`: Arquivo de rotas do Trello.

#### schemas/
Contém os esquemas de validação.
- `boardschema.js`: Esquema de validação para quadros.
- `checklistschema.js`: Esquema de validação para checklists.
- `commentschema.js`: Esquema de validação para comentários.
- `labelschema.js`: Esquema de validação para etiquetas.
- `listschema.js`: Esquema de validação para listas.

#### logs/
Diretório para armazenamento de logs.
- `app.log`: Arquivo de log da aplicação.

#### tests/
Contém os arquivos de teste para os diferentes módulos.
- `board/`: Testes relacionados aos quadros.
  - `acceptance/`: Testes de aceitação.
    - `board.acceptance.test.js`
  - `functional/`: Testes funcionais.
    - `board.functional.test.js`
  - `integration/`: Testes de integração.
    - `board.integration.test.js`
  - `performance/`: Testes de performance.
    - `board.performance.test.js`
  - `smoke/`: Testes de fumaça.
    - `board.smoke.test.js`
- `checklist/`: Testes relacionados aos checklists.
  - `acceptance/`: Testes de aceitação.
    - `checklist.acceptance.test.js`
  - `functional/`: Testes funcionais.
    - `checklist.functional.test.js`
  - `integration/`: Testes de integração.
    - `checklist.integration.test.js`
  - `performance/`: Testes de performance.
    - `checklist.performance.test.js`
  - `smoke/`: Testes de fumaça.
    - `checklist.smoke.test.js`
- `comment/`: Testes relacionados aos comentários.
  - `acceptance/`: Testes de aceitação.
    - `comment.acceptance.test.js`
  - `functional/`: Testes funcionais.
    - `comment.functional.test.js`
  - `integration/`: Testes de integração.
    - `comment.integration.test.js`
  - `performance/`: Testes de performance.
    - `comment.performance.test.js`
  - `smoke/`: Testes de fumaça.
    - `comment.smoke.test.js`
- `label/`: Testes relacionados as etiquetas.
  - `acceptance/`: Testes de aceitação.
    - `label.acceptance.test.js`
  - `functional/`: Testes funcionais.
    - `label.functional.test.js`
  - `integration/`: Testes de integração.
    - `label.integration.test.js`
  - `performance/`: Testes de performance.
    - `label.performance.test.js`
  - `smoke/`: Testes de fumaça.
    - `label.smoke.test.js`
- `list/`: Testes relacionados as listas.
  - `acceptance/`: Testes de aceitação.
    - `list.acceptance.test.js`
  - `functional/`: Testes funcionais.
    - `list.functional.test.js`
  - `integration/`: Testes de integração.
    - `list.integration.test.js`
  - `performance/`: Testes de performance.
    - `list.performance.test.js`
  - `smoke/`: Testes de fumaça.
    - `list.smoke.test.js`
- `requestmanager/`: Testes relacionados ao Request Manager.
    - `unit/`: Testes unitários.
        - `requestmanager.test.js`
    - `RequestManagerMock.js`
### Arquivo Principal
- `app.js`: Arquivo principal da aplicação.

## Implementações Específicas

### Configuração do ESLint

O ESLint foi configurado para garantir a consistência do código. As regras podem ser ajustadas no arquivo `.eslintrc.js` conforme necessário.

### Singleton Design Pattern

Implementado na classe `RequestManager.js` para garantir que apenas uma instância do gerenciador de requisições seja criada.

### Logger

A classe `Logger` foi implementada para registrar mensagens e erros. O log é armazenado no arquivo `app.log` dentro do diretório `logs`.

### Hooks de Pré/Pós-Condições nos Testes

Os testes utilizam hooks (`beforeAll`, `afterAll`) para configurar e limpar o estado antes e depois da execução dos testes.

### Refatoração dos Testes

Os testes existentes foram refatorados para utilizar as novas implementações e respeitar as convenções estabelecidas.

## Testes

Os testes são implementados usando Jest e Supertest.

### Executar Testes

Para executar os testes, use o seguinte comando:

```bash
npm test -- --maxWorkers=2
```

## Exemplos de Testes
```bash
Aqui estão alguns exemplos de testes implementados:

Testes de Quadros:

require('dotenv').config();
const request = require('supertest');
const app = require('../src/app');
const Joi = require('joi');

describe('Board Tests', () => {
  let createdBoardId = null;

  beforeAll(async () => {
    const response = await request(app)
      .post('/trello/boards')
      .send({ name: 'TestCodeBoard', desc: 'sample board' })
      .set('Authorization', `Bearer ${process.env.TOKEN}`);
      
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ name: 'TestCodeBoard', desc: 'sample board' });

    const schema = Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      desc: Joi.string().required()
    }).unknown(true);

    const { error } = schema.validate(response.body);
    expect(error).toBeUndefined();

    createdBoardId = response.body.id;
  });

  afterAll(async () => {
    if (createdBoardId) {
      const deleteResponse = await request(app)
        .delete(`/trello/boards/${createdBoardId}`)
        .set('Authorization', `Bearer ${process.env.TOKEN}`);

      expect(deleteResponse.status).toBe(200);
      expect(deleteResponse.body).toEqual({});
    }
  });

  test('POST /trello/boards should return 401 if authentication fails', async () => {
    const response = await request(app)
      .post('/trello/boards')
      .send({ name: 'TestCodeBoard', desc: 'sample board' })
      .set('Authorization', 'Bearer invalidToken');
      
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Invalid or missing authentication token');
  });

  test('DELETE /trello/boards/:boardId should return 401 if authentication fails', async () => {
    const deleteResponse = await request(app)
      .delete(`/trello/boards/${createdBoardId}`)
      .set('Authorization', 'Bearer invalidToken');

    expect(deleteResponse.status).toBe(401);
    expect(deleteResponse.body).toHaveProperty('error');
    expect(deleteResponse.body.error).toBe('Invalid or missing authentication token');
  });
});
```
## Contribuição

Contribuições são bem-vindas! Por favor, siga os passos abaixo:

1.  Faça um fork do projeto.
2.  Crie uma branch para sua feature ou correção de bug (`git checkout -b feature/nova-feature`).
3.  Commit suas mudanças (`git commit -am 'Adiciona nova feature'`).
4.  Faça o push para a branch (`git push origin feature/nova-feature`).
5.  Abra um Pull Request.

## Agradecimentos

Agradecemos a todos os colaboradores e à equipe de ensino por todo o suporte e conhecimento compartilhado ao longo do desenvolvimento deste projeto.

## Licença

Este projeto está licenciado sob a MIT License.

----------

**Autores:** Alefe Glaydson da Silva, Caetano da Silva Neto, Danilo dos Santos Silva, Felipe da Conceição Alves, Maria Deisiane de Melo Araujo

**Disciplina:** Engenharia de Qualidade de Software 3

**Professor(a):** Stenio Viveiros

**Practitioner:** Rubiana Perucci

**Universidade:** Jala University
