const express = require('express');
const routes_ca = express.Router();
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

// OBTENER TODOS LOS CARGOS
routes_ca.get('/', (req, res) => {
    try {

        const consulta = 'call TRANSBARA.SELECT_TODOS_CARGOS';
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

// INSERTAR UN CARGO NUEVO CON EL MÉTODO "POST"
routes_ca.post("/insertar_cargo/", (req, res) => {
    try{
        const { PI_cod_cargo, PV_des_cargo } = req.body;
        const consulta = 'call TRANSBARA.INSERT_CARGOS(?,?);';
        conn.query(consulta, [PI_cod_cargo,PV_des_cargo], (err,rows,fields) => {
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

// OBTENER UN CARGO CON UN PARAMETRO EN ESPECÍFICO CON EL MÉTODO "GET"
routes_ca.get("/obtener_cargo/:PI_cod_cargo", (req, res) => {
    try {
        const {PI_cod_cargo} = req.params;
        const consulta = 'call TRANSBARA.SELECT_CARGOS(?)';
        conn.query(consulta, [PI_cod_cargo], (error, results) => {
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

// ACTUALIZAR CARGO CON EL MÉTODO "PUT"
routes_ca.put("/actualizar_cargo/:PI_cod_cargo", (req, res) => {
   
    try{
        const { PV_des_cargo } = req.body;
        const {PI_cod_cargo} = req.params;
        const consulta  = 'call TRANSBARA.UPDATE_CARGOS(?,?)';
        conn.query(consulta, [PI_cod_cargo,PV_des_cargo], (err, rows, fields) => {
            if (!err){
                res.json({Status: 'CARGO ACTUALIZADA...'});
            } else {
                console.log("NO SE ACTUALIZÓ NINGÚN DATO DEL CARGO.");
            }
        });
    }catch (error) {
        console.log(error);
    }

});

// ELIMINAR USUARIO CON EL MÉTODO DELETE
routes_ca.delete("/eliminar_cargo/:PI_cod_cargo", (req, res) => {
    try {
        
        const {PI_cod_cargo} = req.params;
        const consulta = 'call TRANSBARA.DELETE_CARGOS(?)';
        conn.query(consulta, [PI_cod_cargo], (error, results) => {
            if (error) throw error;
            res.send({Status:"CARGO ELIMINADA..."});
        });

    } catch (error) {
        console.log(error);
    }    
 
});

module.exports = routes_ca;