const express = require('express');
const respuesta = require('../../red/respuestas');
const controlador = require('./index');
const seguridad = require('./seguridad');

const router = express.Router();

router.get('/', todos); //Muestra toda la tabla
router.get('/:id', uno); //Muestra el ID seleccionado
router.post('/', seguridad, agregar);
router.put('/', seguridad, eliminar); //Eliminar fila en la tabla

async function todos(req, res) {
    try {
        const items = await controlador.todos();
        respuesta.success(res, items, 200);
    } catch (err) {
        respuesta.error(req, err, 500); // ✅ corregido
    }
};

async function uno(req, res) {
    try {
        const items = await controlador.uno(req.params.id);
        respuesta.success(res, items, 200);
    } catch (err) {
        respuesta.error(res, err, 500); // ✅ corregido
    }
};

async function eliminar(req, res) {
    try {
        const items = await controlador.eliminar(req.body);
        respuesta.success(res, items, 'Item eliminado existosamente', 200);
    } catch (err) {
        respuesta.error(res, err, 500); // ✅ corregido
    
    }
};

async function agregar(req, res) {
    try {
        const items = await controlador.agregar(req.body);
        if(req.body.id == 0){
            mensaje = 'Item guardado con exito';
        }else {
            mensaje = 'Item actualizo algun item';
        }
        respuesta.success(req, res, mensaje, 201)
    } catch (err) {
        respuesta.error(res, err, 500); // ✅ corregido
    
    }
};

module.exports = router;
