const db = require('../../db/mysql');
const bcrypt = require('bcrypt');
const auth = require('../../auth');

const TABLA = 'auth';


module.exports = function (dbInyectada) {

    let db = dbInyectada;

    if(!db){
        db = require('../../db/mysql');
    }

async function login(usuario, password) {
    console.log('Usuario recibido:', usuario);
    console.log('Password recibido:', password);

    // Obtener usuario
    const data = await db.query(TABLA, { usuario: usuario });

    console.log('data:', data);

    if (!data || !data.password) {
        throw new Error('Usuario no encontrado o sin contraseña');
    }

    // Comparar contraseña
    const iguales = await bcrypt.compare(password, data.password);

    if (!iguales) {
        throw new Error('Información inválida');
    }

    return auth.asignarToken({ id: data.id, usuario: data.usuario });
}



async function agregar (data){

    const authData ={
        id : data.id,
    }

    if(data.usuario){
        authData.usuario = data.usuario
    }
    
    if(data.password){
        authData.password = await bcrypt.hash(data.password.toString(), 5) 
    }

    return db.agregar(TABLA, authData);
}

    return {

    agregar,
    login,
    }

}