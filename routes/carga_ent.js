const express = require('express');
const routes_cent = express.Router();
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

// OBTENER TODOS LAS CARGAS ENTREGADAS
routes_cent.get('/', (req, res) => {
    try {

        const consulta = 'call TRANSBARA.SELECT_TODAS_CARGAS_ENT';
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

// INSERTAR UN CARGA ENTREGADA CON EL MÉTODO "POST"
routes_cent.post("/insertar_carga_ent/", (req, res) => {
    try{
        const { PI_cod_Carga_Enviar, PV_des_Carga_Entregada, PV_cent_usr_adicion, PV_cent_usr_modifico } = req.body;
        const consulta = 'call TRANSBARA.INSERT_CARGA_ENTREGADA(?,?,?,?);';
        conn.query(consulta, [PI_cod_Carga_Enviar,PV_des_Carga_Entregada,PV_cent_usr_adicion,PV_cent_usr_modifico], (err,rows,fields) => {
            if (!err){
                res.json({Status: 'CARGA ENTREGADA AGREGADA...'});
            } else {
                console.log("NO INSERTO LA CARGA ENTREGADA");
            }
        });
    }catch (error) {
        console.log(error);
    }

});

// OBTENER UNA CARGA ENTREGADA CON UN PARAMETRO EN ESPECÍFICO CON EL MÉTODO "GET"
routes_cent.get("/obtener_carga_ent/:PI_cod_Carga_Entregada", (req, res) => {
    const {PI_cod_Carga_Entregada} = req.params;
    const consulta = 'call TRANSBARA.SELECT_CARGA_ENTREGA(?)';
    conn.query(consulta, [PI_cod_Carga_Entregada], (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send("NO OBTUVO NINGÚN REGISTRO DE LA TABLA");
        }
    });

});

// ACTUALIZAR CARGA CON EL MÉTODO "PUT"
routes_cent.put("/actualizar_carga_ent/:PI_cod_Carga_Entregada", (req, res) => {
   
    try{
        const { PI_cod_Carga_Enviar, PV_des_Carga_Entregada, PV_cent_usr_adicion, PV_cent_usr_modifico } = req.body;
        const {PI_cod_Carga_Entregada} = req.params;
        const consulta  = 'call TRANSBARA.UPDATE_CARGA_ENTREGADA(?,?,?,?,?)';
        conn.query(consulta, [PI_cod_Carga_Entregada,PI_cod_Carga_Enviar,PV_des_Carga_Entregada,PV_cent_usr_adicion,PV_cent_usr_modifico], (err, rows, fields) => {
            if (!err){
                res.json({Status: 'CARGA ACTUALIZADA...'});
            } else {
                console.log("NO SE ACTUALIZÓ NINGÚN DATO DE LA CARGA.");
            }
        });
    }catch (error) {
        console.log(error);
    }

});

// ELIMINAR UNA CARGA ENTREGADA CON EL MÉTODO "DELETE"
routes_cent.delete("/eliminar_carga_ent/:PI_cod_Carga_Entregada", (req, res) => {
    try {
        
        const {PI_cod_Carga_Entregada} = req.params;
        const consulta = 'call TRANSBARA.DELETE_CARGA_ENTREGADA(?)';
        conn.query(consulta, [PI_cod_Carga_Entregada], (error, results) => {
            if (error) throw error;
            res.send({Status:"CARGA ELIMINADA..."});
        });

    } catch (error) {
        console.log(error);
    }    
 
});

module.exports = routes_cent;