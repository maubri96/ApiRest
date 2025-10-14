const express = require('express');

const respuesta = require('../../red/respuestas');

const router = express.Router();

router.get('/', function(req, res) {
    respuesta.success(res, 'Enserio me lo juras?');
});

module.exports = router;
