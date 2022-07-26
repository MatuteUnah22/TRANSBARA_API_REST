const express = require('express');
const routes_u = express.Router();
const conexion = require("mysql");
require('dotenv').config();

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

// Obtener todos los usuarios
routes_u.get("/", (req, res) => {
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
routes_u.post("/insertar_usuario/", (req, res) => {
    try{
        const { PV_usr_cod_usuario, PV_usr_password, PV_usr_nom_usuario, PI_usr_cod_estatus, PV_usr_loguead, PI_usr_cod_tipo_usuario, PV_usr_usr_adicion, PV_usr_usr_modificacion } = req.body;
        const consulta = 'call TRANSBARA.INSERT_USUARIO(?,?,?,?,?,?,?,?);';
        conn.query(consulta,[PV_usr_cod_usuario, PV_usr_password, PV_usr_nom_usuario, PI_usr_cod_estatus, PV_usr_loguead, PI_usr_cod_tipo_usuario, PV_usr_usr_adicion, PV_usr_usr_modificacion], (err,rows,fields) => {
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
routes_u.get("/usuario/:PI_usr_cod_usuario", (req, res) => {
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
routes_u.put("/actualizar_usuario/:usr_cod_usuario", (req, res) => {
   
    try{
        const {usr_password, usr_nom_usuario, usr_cod_empleado,usr_cod_estatus,usr_loguead,usr_cod_tipo_usuario,usr_usr_adicion,usr_usr_modificacion } = req.body;
        const {usr_cod_usuario} = req.params;
        const consulta  = 'call TRANSBARA.UPDATE_USUARIO(?,?,?,?,?,?,?,?,?)';
        conn.query(consulta, [usr_cod_usuario,usr_password, usr_nom_usuario, usr_cod_empleado,usr_cod_estatus,usr_loguead,usr_cod_tipo_usuario,usr_usr_adicion,usr_usr_modificacion], (err, rows, fields) => {
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
routes_u.delete("/eliminar_usuario/:PV_usr_cod_usuario", (req, res) => {
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

module.exports = routes_u;