const express = require('express');
require('express-async-errors');

const errorHandler = require('../middlewares/errorHandler');
const router = require('./routes');

const app = express();

app.use(express.json());
app.use(router);
app.get('/coffee', (_req, res) => res.status(418).end());
app.use(errorHandler);

module.exports = app;
