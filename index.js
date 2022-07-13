// conexion bd

// constante para el paquete de mysql
const mysql = require ('mysql');


// constante para el paquete express
const express = require('express');

// variable para los metodos express
var app = express();

// constante para el paquete bodyparser
const bp = require('body-parser');

// enviando los datos JSON  a nodejs api
app.use(bp.json());

// conectar a la bd mysql
 var mysqlconection = mysql.createConnection({
     host:'142.44.161.115',
     user:'TRANSBARA', 
     password: 'Trans$$532',
     datebase: 'TRANSBARA',
     port: '3306',
     multipleStatements: true // multipleStatements es para cuando estamos trabajando con transacciones en MySql
 });
 

 // test de conexion a bd
 mysqlconection.connect((err)=>{
     if(!err) {
        console.log('CONEXION EXITOSA TRANS. BARAHONA MORAZAN');
     } else {
        console.log('ERROR AL CONECTAR A LA BD');

     }

 });

 app.get('/', (req, res) => {
    res.send('Módulo de Servicios');
});

//EJECUTAMOS EL SERVER EN UN PUERTO ESPECFICO; PUERTO 3000 (ELSERVICIO NODEJS)
app.listen(3000,()=> console.log('server running puerto: 3000'));