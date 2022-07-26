const express = require('express');
const routes_cp = express.Router();
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

// Obtener todos los COMPRAS PENDIENTES POR PAGAR
routes_cp.get("/", (req, res) => {
    try {
        const consulta = 'call TRANSBARA.SELECT_TODOS_COMPRAS_PENDIENTES';
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

// INSERTAR COMPRAS PENDEIENTES POR PAGAR CON EL MÉTODO "POST"
routes_cp.post("/insertar_compraspendientes/", (req, res) => {
    try{
        const { PI_cod_compras_por_pagar, PD_pagos_pendientes, PV_descripcion } = req.body;
        console.log(req.body);
        const consulta = 'call TRANSBARA.INSERT_COMPRAS_PENDIENTES(?,?,?);';
        conn.query(consulta,[PI_cod_compras_por_pagar, PD_pagos_pendientes, PV_descripcion], (err,rows,fields) => {
            if (!err){
                res.json({Status: 'COMPRA REGISTRADA...'});
            } else {
                console.log(err);//"No pudo insertar ningúna compra pendiente");
            }
        });
    }catch (error) {
        console.log(error);
    }

});

// OBTENER COMPRAS PENDIENTES CON UN PARAMETRO EN ESPECÍFICO CON EL MÉTODO "GET"
routes_cp.get("/selectcompraspendientes/:PI_cod_compras_por_pagar", (req, res) => {
    try {
        
        const {PI_cod_compras_por_pagar} = req.params;
        const consulta = 'call TRANSBARA.SELECT_COMPRAS_PENDIENTES(?);';
        conn.query(consulta, [PI_cod_compras_por_pagar], (error, results) => {
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

// ACTUALIZAR COMPRAS PENDIENTES CON EL MÉTODO "PUT"
routes_cp.put("/actualizar_compraspendientes/:PI_cod_compras_por_pagar", (req, res) => {
   
    try{
        const {PD_pagos_pendientes, PV_descripcion } = req.body;
        const {PI_cod_compras_por_pagar} = req.params;
        const consulta  = 'call TRANSBARA.UPDATE_COMPRAS_PENDIENTES(?,?,?);';
        conn.query(consulta, [PI_cod_compras_por_pagar, PD_pagos_pendientes, PV_descripcion ], (err, rows, fields) => {
            if (!err){
                res.json({Status: 'COMPRA ACTUALIZADO...'});
            } else {
                console.log(err);//"NO SE ENCONTRÓ NINGÚN DATO.");
            }
        });
    }catch (error) {
        console.log(error);
    }

});

// ELIMINAR COMPRA PENDIENTE CON EL MÉTODO DELETE
routes_cp.delete("/eliminar_comprapendiente/:PI_cod_compras_por_pagar", (req, res) => {
    try {
        const {PI_cod_compras_por_pagar} = req.params;
        const consulta = 'call TRANSBARA.DELETE_COMPRAS_PENDIENTES(?);';
        conn.query(consulta, [PI_cod_compras_por_pagar], (error, results) => {
            if (error) throw error;
            res.send({Status: 'COMPRA PENDIENTE ELIMINADA...'});
        });
    
    } catch (error) {
        console.log(error);
    }

});

module.exports = routes_cp;