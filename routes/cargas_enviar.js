const express = require('express');
const routes_ce = express.Router();
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
routes_ce.get('/', (req, res) => {
    try {

        const consulta = 'call TRANSBARA.SELECT_TODOS_CARGA_ENV';
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

// INSERTAR UN CARGAS NUEVA A ENVIAR CON EL MÉTODO "POST"
routes_ce.post("/insertar_cargas_enviar/", (req, res) => {
    try{
        const { PD_Kg_Carga_Enviar, PV_des_Carga_Enviar, PI_can_Carga_Enviar, PI_cod_Carga_Futura, PI_cod_Carga_Entregada, PV_cenv_usr_adicion, PV_cenv_usr_modifico } = req.body;
        const consulta = 'call TRANSBARA.INSERT_CARGA_ENVIAR(?,?,?,?,?,?,?);';
        conn.query(consulta, [PD_Kg_Carga_Enviar,PV_des_Carga_Enviar,PI_can_Carga_Enviar,PI_cod_Carga_Futura,PI_cod_Carga_Entregada,PV_cenv_usr_adicion,PV_cenv_usr_modifico], (err,rows,fields) => {
            if (!err){
                res.json({Status: 'NUEVA CARGA A ENVIAR AGREGADA...'});
            } else {
                console.log("NO INSERTO LA NUEVA CARGA");
            }
        });
    }catch (error) {
        console.log(error);
    }

});

// OBTENER UN CARGAS A ENVIAR CON UN PARAMETRO EN ESPECÍFICO CON EL MÉTODO "GET"
routes_ce.get("/obtener_carga_enviar/:PI_cod_Carga_Enviar", (req, res) => {
    const {PI_cod_Carga_Enviar} = req.params;
    const consulta = 'call TRANSBARA.SELECT_CARGA_ENVIAR(?)';
    conn.query(consulta, [PI_cod_Carga_Enviar], (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send("NO OBTUVO NINGÚN REGISTRO DE LA TABLA");
        }
    });

});

// ACTUALIZAR CARGA CON EL MÉTODO "PUT"
routes_ce.put("/actualizar_carga_enviar/:PI_cod_Carga_Enviar", (req, res) => {
   
    try{
        const {PD_Kg_Carga_Enviar, PV_des_Carga_Enviar, PI_can_Carga_Enviar, PI_cod_Carga_Futura, PI_cod_Carga_Entregada, PV_cenv_usr_adicion, PV_cenv_usr_modifico } = req.body;
        const {PI_cod_Carga_Enviar} = req.params;
        const consulta  = 'call TRANSBARA.UPDATE_CARGA_ENVIAR(?,?,?,?,?,?,?,?)';
        conn.query(consulta, [PI_cod_Carga_Enviar,PD_Kg_Carga_Enviar,PV_des_Carga_Enviar,PI_can_Carga_Enviar,PI_cod_Carga_Futura,PI_cod_Carga_Entregada,PV_cenv_usr_adicion,PV_cenv_usr_modifico], (err, rows, fields) => {
            if (!err){
                res.json({Status: 'CARGA ACTUALIZADA...'});
            } else {
                console.log("NO SE ACTUALIZÓ NINGÚN DATO DEL COLABORADOR.");
            }
        });
    }catch (error) {
        console.log(error);
    }

});

// ELIMINAR USUARIO CON EL MÉTODO DELETE
routes_ce.delete("/eliminar_carga_enviar/:PI_cod_Carga_Enviar", (req, res) => {
    try {
        
        const {PI_cod_Carga_Enviar} = req.params;
        const consulta = 'call TRANSBARA.DELETE_CARGA_ENVIAR(?)';
        conn.query(consulta, [PI_cod_Carga_Enviar], (error, results) => {
            if (error) throw error;
            res.send({Status:"CARGA ELIMINADA..."});
        });

    } catch (error) {
        console.log(error);
    }    
 
});

module.exports = routes_ce;