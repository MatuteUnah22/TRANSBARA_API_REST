const express = require('express');
const app = express();
const conexion = require("mysql");
require('dotenv').config();
const routes = require('./routes/empleados');
const routes_p = require('./routes/proveedores');
const routes_c = require('./routes/clientes');
const routes_ce = require('./routes/cargas_enviar');
const routes_cent = require('./routes/carga_ent');
const routes_ca = require('./routes/cargos');
const routes_es = require('./routes/estados');
const routes_pa = require('./routes/pais');
const routes_tc = require('./routes/tipo_contrato');

// constante para el paquete bodyparser
const bp = require('body-parser');

//Conexion a la base de datos
const conn = conexion.createConnection(
    {
        host: '142.44.161.115',
        user: 'TRANSBARA',
        password: 'Trans$$532',
        database: 'TRANSBARA',
        port: '3306',
        multipleStatements: true
    }
);

// test de conexion a bd
conn.connect((err)=>{
    if(!err) {
       console.log('CONEXIÓN EXITOSA TRANS. BARAHONA MORAZÁN');
    } else {
       console.log('ERROR AL CONECTAR A LA BD');
    }
});

// MIDDLEWARES
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));
app.use(express.json());

// ROUTES
app.get('/', (req, res) => {
   res.send('API Rest del Módulo de Persona - Empleados');
});

app.use('/empleados', routes);
app.use('/proveedores', routes_p);
app.use('/clientes', routes_c);
app.use('/cargas_enviar', routes_ce);
app.use('/carga_ent', routes_cent);
app.use('/cargos', routes_ca);
app.use('/estados', routes_es);
app.use('/pais', routes_pa);
app.use('/tipo_contrato', routes_tc);

//EJECUTAMOS EL SERVER EN UN PUERTO ESPECFICO; PUERTO 3000 (ELSERVICIO NODEJS)
app.listen(3000,()=> console.log('server running puerto: 3000'));

module.exports = app;
/* -----------------------------------------------------------------------------
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
app.listen(3000,()=> console.log('server running puerto: 3000'));*/