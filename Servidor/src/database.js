const mysql = require('mysql');
const {promisify} = require('util');
const {database} = require('./keys');


const pool = mysql.createPool(database);

pool.getConnection((err, connection)=>{

    // Verifica que no existan errores en 
    // LA BASE DE DATOS
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTTION WAS CLSOED');
        }
        if(err.code === 'ERR_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('DATABSE CONNECTION WAS REFUSED');
        }
    }

    // FUNCIONA LA BASE DE DATOS
    if(connection) connection.release();
    console.log('DB is Connected');
    return;
});

// Promisify Pool Querys
// Cada vez que quiera hacer una consulta
// puedo usar promesas
pool.query = promisify(pool.query);

// Exporta pool
module.exports = pool;
