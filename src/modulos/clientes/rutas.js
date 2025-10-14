const express = require('express');

const respuesta = require('../../red/respuestas');
const controlador = require('./controlador');

const router = express.Router();

router.get('/', function(req, res) {
    const todos = controlador.todos()
    .then((items) =>{
        respuesta.success(res, items, 200);
    })
    .catch(e =>{
        respuesta.error(res, 'Error Interno', 500);
    });
});

module.exports = router;
