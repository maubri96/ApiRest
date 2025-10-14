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


function uno(tabla, id){

}

function insertar(tabla, data){

}

function eliminar(tabla, id){

}module.exports = {
    todos,
    uno,
    insertar,
    eliminar
}