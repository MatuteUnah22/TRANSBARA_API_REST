const express = require('express');
const app = express();
const conexion = require("mysql");
require('dotenv').config();

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

app.get('/', (req, res) => {
   res.send('API Rest del Módulo de  Persona - Usuarios');
});

//EJECUTAMOS EL SERVER EN UN PUERTO ESPECFICO; PUERTO 3000 (ELSERVICIO NODEJS)
app.listen(3000,()=> console.log('server running puerto: 3000'));

// enviando los datos JSON  a nodejs api
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));

// Obtener todos los usuarios
app.get("/usuarios", (req, res) => {
    try {
        const consulta = 'call TRANSBARA.SELECT_TODOS_USUARIO';
        conn.query(consulta, (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                res.json(results);
            } else {
                res.send("No pudo traer ningún dato de la BD");
            }
        });
        
    } catch (error) {
        console.log(error);
    }

});

// INSERTAR UN USUARIO CON EL MÉTODO "POST"
app.post("/insertar_usuario/", (req, res) => {
    try{
        const { usr_cod_usuario, usr_password, usr_nom_usuario, usr_cod_estatus, usr_loguead, usr_cod_tipo_usuario, usr_usr_adicion, usr_usr_modificacion } = req.params;
        console.log(req.body);
        const consulta = 'call TRANSBARA.INSERT_USUARIO(?,?,?,?,?,?,?,?);';
        conn.query(consulta,[usr_cod_usuario, usr_password, usr_nom_usuario, usr_cod_estatus, usr_loguead, usr_cod_tipo_usuario, usr_usr_adicion, usr_usr_modificacion], (err,rows,fields) => {
            if (!err){
                res.json({Status: 'USUARIO AGREGADO...'});
            } else {
                console.log("No pudo insertar ningún usuario");
            }
        });
    }catch (error) {
        console.log(error);
    }

});

// OBTENER UN USUARIO CON UN PARAMETRO EN ESPECÍFICO CON EL MÉTODO "GET"
app.get("/usuario/:PI_usr_cod_usuario", (req, res) => {
    try {
        
        const {PI_usr_cod_usuario} = req.params;
        const consulta = 'call TRANSBARA.SELECT_USUARIO(?)';
        conn.query(consulta, [PI_usr_cod_usuario], (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                res.json(results);
            } else {
                res.send("No pudo traer ningún dato de la BD");
            }
        });
    } catch (error) {
        console.log(error);
    }
    
 
});

// ACTUALIZAR USUARIO CON EL MÉTODO "PUT"
app.put("/actualizar_usuario/:usr_cod_usuario", (req, res) => {
   
    try{
        const {usr_password, usr_nom_usuario, usr_cod_empleado,usr_cod_estatus,usr_loguead,usr_cod_tipo_usuario,usr_usr_adicion,usr_usr_modificacion } = req.body;
        const {usr_cod_usuario} = req.params;
        const query  = 'call TRANSBARA.UPDATE_USUARIO(?,?,?,?,?,?,?,?,?)';
        conn.query(query, [usr_cod_usuario,usr_password, usr_nom_usuario, usr_cod_empleado,usr_cod_estatus,usr_loguead,usr_cod_tipo_usuario,usr_usr_adicion,usr_usr_modificacion], (err, rows, fields) => {
            if (!err){
                res.json({Status: 'USUARIO ACTUALIZADO...'});
            } else {
                console.log("NO SE ENCONTRÓ NINGÚN DATO.");
            }
        });
    }catch (error) {
        console.log(error);
    }

});

// ELIMINAR USUARIO CON EL MÉTODO DELETE
app.get("/eliminar_usuario/:PV_usr_cod_usuario", (req, res) => {
    try {
        const {PV_usr_cod_usuario} = req.params;
        const consulta = 'call TRANSBARA.DELETE_USUARIO(?)';
        conn.query(consulta, [PV_usr_cod_usuario], (error, results) => {
            if (error) throw error;
            res.send({Status: 'USUARIO ELIMINADO...'});
        });
    
    } catch (error) {
        console.log(error);
    }

});

module.exports = app;