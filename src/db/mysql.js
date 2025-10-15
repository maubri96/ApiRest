const mysql = require('mysql');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
};

let connection;

function conMysql(){
    connection = mysql.createConnection(dbconfig);
    connection.connect((err) => {
        if(err){
            console.log(['db err', err]);
            setTimeout(conMysql, 2000);
        }else{
            console.log('DB connected')
        }
    });
    connection.on('error', err =>{
        console.log(['db err', err])
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            conMysql();
        }else{
            throw err;
        }
    });
}

conMysql();

function todos(tabla){
    return new Promise((resolve, reject) => {
        if(!connection) return reject('No hay conexión a la base de datos');
        connection.query(`SELECT * FROM ${tabla}`, (error, result) => {
            if(error) return reject(error);
            resolve(result);
        });
    });
}


function uno(tabla, id) {
  return new Promise((resolve, reject) => {
    if (!connection) return reject('No hay conexión a la base de datos');
    if (!id) return reject('ID no proporcionado');

    const sql = `SELECT * FROM ${tabla} WHERE id = ${id}`; // ?? protege el nombre de la tabla
    connection.query(sql, [tabla, id], (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
}


function agregar(tabla, data) {
  return new Promise((resolve, reject) => {
    if (!connection) return reject('No hay conexión a la base de datos');

    const sql = `INSERT INTO ?? SET ? ON DUPLICATE KEY UPDATE ?`;

    connection.query(sql, [tabla, data, data], (error, result) => {
      if (error) {
        console.error('❌ Error al insertar en la base de datos:', error);
        return reject(error);
      }

      // Devuelve el insertId si se creó un nuevo registro
      resolve(result);
    });
  });
}



function eliminar(tabla, data) {
  return new Promise((resolve, reject) => {
    if (!connection) return reject('No hay conexión a la base de datos');
    if (!data || !data.id) return reject('ID no proporcionado');

    const sql = `DELETE FROM ?? WHERE id = ?`;
    connection.query(sql, [tabla, data.id], (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
}

function query(tabla, consulta) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${tabla} WHERE ?`, consulta, (error, result) => {
      if (error) {
        return reject(error);
      } else {
        resolve(result[0]);
      }
    });
  });
}

module.exports = {
    todos,
    uno,
    agregar,
    eliminar,
    query,
}