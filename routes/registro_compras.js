const express = require('express');
const routes_rc = express.Router();
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

// Obtener todos los REGISTROS
routes_rc.get("/", (req, res) => {
    try {
        const consulta = 'call TRANSBARA.SELECT_TODOS_REGISTROCOMPRAS';
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

// INSERTAR COMPRAS CON EL MÉTODO "POST"
routes_rc.post("/insertar_registrocompras/", (req, res) => {
    try{
        const { PI_cod_registro_compra, PV_Detalle_compras_semanales } = req.body;
        console.log(req.body);
        const consulta = 'call TRANSBARA.INSERT_COMPRAS_REGISTRO(?,?);';
        conn.query(consulta,[PI_cod_registro_compra, PV_Detalle_compras_semanales], (err,rows,fields) => {
            if (!err){
                res.json({Status: 'COMPRA REGISTRADA...'});
            } else {
                console.log("No pudo insertar ningún usuario");
            }
        });
    }catch (error) {
        console.log(error);
    }

});

// ACTUALIZAR COMPRAS CON EL MÉTODO "PUT"
routes_rc.put("/actualizar_registro/:PI_cod_registro_compra", (req, res) => {
   
    try{
        const {PV_Detalle_compras_semanales } = req.body;
        const {PI_cod_registro_compra} = req.params;
        const consulta  = 'call TRANSBARA.UPDATE_COMPRAS_REGISTRO(?,?);';
        conn.query(consulta, [PI_cod_registro_compra, PV_Detalle_compras_semanales ], (err, rows, fields) => {
            if (!err){
                res.json({Status: 'COMPRA REGISTRO ACTUALIZADO...'});
            } else {
                console.log("NO SE ENCONTRÓ NINGÚN DATO.");
            }
        });
    }catch (error) {
        console.log(error);
    }

});

// ELIMINAR USUARIO CON EL MÉTODO DELETE
routes_rc.delete("/eliminar_registro/:PI_cod_registro_compra", (req, res) => {
    try {
        const {PI_cod_registro_compra} = req.params;
        const consulta = 'call TRANSBARA.DELETE_COMPRA_REGISTRO(?);';
        conn.query(consulta, [PI_cod_registro_compra], (error, results) => {
            if (error) throw error;
            res.send({Status: 'REGISTRO DE COMPRA ELIMINADO...'});
        });
    
    } catch (error) {
        console.log(error);
    }

});
// OBTENER UN USUARIO CON UN PARAMETRO EN ESPECÍFICO CON EL MÉTODO "GET"
routes_rc.get("/registraselect/:PI_cod_registro_compra", (req, res) => {
    try {
        
        const {PI_cod_registro_compra} = req.params;
        const consulta = 'call TRANSBARA.SELECT_COMPRAS_REGISTRO(?);';
        conn.query(consulta, [PI_cod_registro_compra], (error, results) => {
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
module.exports = routes_rc;