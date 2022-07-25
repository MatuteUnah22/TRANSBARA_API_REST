const express = require('express');
const routes_es = express.Router();
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

// OBTENER TODOS LA TABLA DE ESTADO
routes_es.get('/', (req, res) => {
    try {

        const consulta = 'call TRANSBARA.SELECT_TODOS_ESTADOS';
        conn.query(consulta, (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                res.json(results);
            } else {
                res.send("NO OBTUVO NINGÚN REGISTRO DE LA TABLA");
            }
        });
        
    } catch (error) {
        console.log(error);
    }    
    
});

// INSERTAR UN ESTADO NUEVO CON EL MÉTODO "POST"
routes_es.post("/insertar_estado/", (req, res) => {
    try{
        const { PI_cod_estatus, PV_des_estatus } = req.body;
        const consulta = 'call TRANSBARA.INSERT_ESTADOS(?,?);';
        conn.query(consulta, [PI_cod_estatus,PV_des_estatus], (err,rows,fields) => {
            if (!err){
                res.json({Status: 'NUEVO CARGO AGREGADO...'});
            } else {
                console.log("NO INSERTO LA NUEVA CARGO");
            }
        });
    }catch (error) {
        console.log(error);
    }

});

// OBTENER UN ESTADO CON UN PARAMETRO EN ESPECÍFICO CON EL MÉTODO "GET"
routes_es.get("/obtener_estado/:PI_cod_estatus", (req, res) => {
    try {
        const {PI_cod_estatus} = req.params;
        const consulta = 'call TRANSBARA.SELECT_ESTADOS(?)';
        conn.query(consulta, [PI_cod_estatus], (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                res.json(results);
            } else {
                res.send("NO OBTUVO NINGÚN REGISTRO DE LA TABLA");
            }
        });    
    } catch (error) {
        console.log(error);
    }
    

});

// ACTUALIZAR ESTADO CON EL MÉTODO "PUT"
routes_es.put("/actualizar_estado/:PI_cod_estatus", (req, res) => {
   
    try{
        const { PV_des_estatus } = req.body;
        const {PI_cod_estatus} = req.params;
        const consulta  = 'call TRANSBARA.UPDATE_ESTADOS(?,?)';
        conn.query(consulta, [PI_cod_estatus,PV_des_estatus], (err, rows, fields) => {
            if (!err){
                res.json({Status: 'ESTADO ACTUALIZADA...'});
            } else {
                console.log("NO SE ACTUALIZÓ NINGÚN DATO DEL ESTADO.");
            }
        });
    }catch (error) {
        console.log(error);
    }

});

// ELIMINAR ESTADO CON EL MÉTODO DELETE
routes_es.delete("/eliminar_estado/:PI_cod_estatus", (req, res) => {
    try {
        
        const {PI_cod_estatus} = req.params;
        const consulta = 'call TRANSBARA.DELETE_ESTADOS(?)';
        conn.query(consulta, [PI_cod_estatus], (error, results) => {
            if (error) throw error;
            res.send({Status:"ESTADO ELIMINADA..."});
        });

    } catch (error) {
        console.log(error);
    }    
 
});

module.exports = routes_es;