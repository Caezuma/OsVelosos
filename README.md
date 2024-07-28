# QA Trello API Integration

Este projeto realiza a integração com a API do Trello, permitindo a criação, exclusão e manipulação de quadros, listas, checklists, etiquetas e comentários em cartões. Desenvolvido com o objetivo de fornecer uma ferramenta para desenvolvimento acadêmico voltado para a qualidade e controle de processos, oferencendo funcionalidades que facilitam o gerenciamento de projetos e tarefas.

## Tecnologias Utilizadas

- Node.js
- Express
- Axios
- Dotenv

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

3. Crie uma pasta no /src `env` na raiz do projeto e adicione suas credenciais do Trello:

    ```env
    KEY=trello-key
    TOKEN=trello-token
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

-   `src/controllers/` - Contém os controladores para cada recurso (quadros, checklists, etiquetas, listas e comentários).
-   `src/routes/` - Define as rotas para a API.
-   `src/core/` - Contém arquivos de configuração e funções essenciais.
    -   `config/` - Configurações e variáveis de ambiente (config.json, env.json).
    -   `RequestManager.js` - Implementação do padrão Singleton para gerenciar requisições.
    -   `logger.js` - Implementação do Logger para geração de logs.
    -   `loadEnv.js` - Script para carregar variáveis de ambiente.
-   `src/business/services/` - Contém a lógica de negócios da aplicação.
    -   `boardService.js`
    -   `checklistService.js`
    -   `commentService.js`
    -   `labelService.js`
    -   `listService.js`
-   `tests/` - Contém os arquivos de teste para os diferentes módulos.
    -   `board.test.js`
    -   `checklist.test.js`
    -   `comment.test.js`
    -   `label.test.js`
    -   `list.test.js`

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
npm test
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