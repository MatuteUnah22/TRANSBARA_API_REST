const express = require('express');
const routes_tc = express.Router();
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

// OBTENER TODOS LAS CARGAS A ENVIAR
routes_tc.get('/', (req, res) => {
    try {

        const consulta = 'call TRANSBARA.SELECT_TODOS_TIPO_CONTRATOS';
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

// INSERTAR UN TIPO DE CONTRATO NUEVO CON EL MÉTODO "POST"
routes_tc.post("/insertar_tipo_contrato/", (req, res) => {
    try{
        const { PI_cod_tipo_contrato, PV_des_tipo_contrato } = req.body;
        const consulta = 'call TRANSBARA.INSERT_TIPO_CONTRATO(?,?);';
        conn.query(consulta, [PI_cod_tipo_contrato,PV_des_tipo_contrato], (err,rows,fields) => {
            if (!err){
                res.json({Status: 'NUEVO TIPO DE CONTRATO AGREGADO...'});
            } else {
                console.log("NO INSERTO EL NUEVO TIPO DE CONTRATO");
            }
        });
    }catch (error) {
        console.log(error);
    }

});

// OBTENER UN TIPO DE CONTRATO CON UN PARAMETRO EN ESPECÍFICO CON EL MÉTODO "GET"
routes_tc.get("/obtener_tipo_contrato/:PI_cod_tipo_contrato", (req, res) => {
    try {
        const {PI_cod_tipo_contrato} = req.params;
        const consulta = 'call TRANSBARA.SELECT_TIPO_CONTRATO(?)';
        conn.query(consulta, [PI_cod_tipo_contrato], (error, results) => {
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

// ACTUALIZAR TIPO DE CONTRATO CON EL MÉTODO "PUT"
routes_tc.put("/actualizar_tipo_contrato/:PI_cod_tipo_contrato", (req, res) => {
   
    try{
        const { PV_des_tipo_contrato } = req.body;
        const {PI_cod_tipo_contrato} = req.params;
        const consulta  = 'call TRANSBARA.UPDATE_TIPO_CONTRATO(?,?)';
        conn.query(consulta, [PI_cod_tipo_contrato,PV_des_tipo_contrato], (err, rows, fields) => {
            if (!err){
                res.json({Status: 'TIPO DE CONTRATO ACTUALIZADO...'});
            } else {
                console.log(err);//"NO SE ACTUALIZÓ NINGÚN DATO DEL TIPO DE CONTRATO.");
            }
        });
    }catch (error) {
        console.log(error);
    }

});

module.exports = routes_tc;