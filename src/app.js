const express = require('express');
const app = express();
const trelloRouter = require('../src/api/routes/trello');

app.use(express.json());
app.use('/trello', trelloRouter);

module.exports = app;