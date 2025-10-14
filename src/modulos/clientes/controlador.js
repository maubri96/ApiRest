const db = require('../../db/mysql');

const TABLA = 'clientes';

function todos (){
    return db.todos('clientes');
}

module.exports = {
    todos,
}