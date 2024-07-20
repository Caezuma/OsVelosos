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
    npm install axios
    npm install dotenv
    npm install express
    npm install joi
    npm install supertest
    npm install jest --save-dev
    ```

3. Crie um arquivo `.env` na raiz do projeto e adicione suas credenciais do Trello:

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

- `src/controllers/` - Contém os controladores para cada recurso (quadros, checklists, etiquetas, listas e comentários).
- `src/routes/` - Define as rotas para a API.
- `src/` - Contém os arquivos principais.
- `tests/` - Contém os arquivos de teste para os diferentes módulos.

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

1. Faça um fork do projeto.
2. Crie uma branch para sua feature ou correção de bug (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`).
4. Faça o push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.
