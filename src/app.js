const express = require('express');
const morgan = require('morgan')
const config = require('./config');

const clientes = require('./modulos/clientes/rutas')
const error = require('./red/respuestas')

const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//Configuraciones
app.set('port', config.app.port);

//Rutas

app.use('/api/clientes', clientes);



module.exports = app;
