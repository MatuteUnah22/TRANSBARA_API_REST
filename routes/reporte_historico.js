const express = require('express');
const routes_rh = express.Router();
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

// OBTENER TODOS REPORTE HISTORICO
routes_rh.get("/", (req, res) => {
    try {
        const consulta = 'call TRANSBARA.SELECT_TODOS_REPORTE_HISTORICO';
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


// OBTENER UN REPORTE HISTORICO EN ESPECÍFICO CON EL MÉTODO "GET"
routes_rh.get("/select_reportehistorico/:PI_cod_reporte", (req, res) => {
    try {
        
        const {PI_cod_reporte} = req.params;
        const consulta = 'call TRANSBARA.SELECT_REPORTE_HISTORICO(?);';
        conn.query(consulta, [PI_cod_reporte], (error, results) => {
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

module.exports = routes_rh;