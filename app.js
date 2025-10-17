require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const clientRoutes = require('./routes/clientRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rotas
app.use('/', userRoutes);
app.use('/', productRoutes);
app.use('/', clientRoutes);

// Rota de boas-vindas
app.get('/', (req, res) => {
  res.send('Bem-vindo à API de Gerenciamento!');
});

module.exports = app; 