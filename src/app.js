const express = require('express');
const config = require('./config');

const clientes = require('./modulos/clientes/rutas')

const app = express();

//Configuraciones
app.set('port', config.app.port);

//Rutas

app.use('/api/clientes', clientes);


module.exports = app;
