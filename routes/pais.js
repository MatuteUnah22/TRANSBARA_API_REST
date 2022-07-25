const express = require('express');
const routes_pa = express.Router();
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
routes_pa.get('/', (req, res) => {
    try {

        const consulta = 'call TRANSBARA.SELECT_TODOS_PAISES';
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

// INSERTAR UN PAIS NUEVO EN CASO QUE HAYA DE AGREGARLO CON EL MÉTODO "POST"
routes_pa.post("/insertar_pais/", (req, res) => {
    try{
        const { PI_cod_pais, PV_nom_pais, PV_abr_pais } = req.body;
        const consulta = 'call TRANSBARA.INSERT_PAISES(?,?,?);';
        conn.query(consulta, [PI_cod_pais,PV_nom_pais,PV_abr_pais], (err,rows,fields) => {
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

// OBTENER UN PAÍS CON UN PARAMETRO EN ESPECÍFICO CON EL MÉTODO "GET"
routes_pa.get("/obtener_pais/:PI_cod_pais", (req, res) => {
    try {
        const {PI_cod_pais} = req.params;
        const consulta = 'call TRANSBARA.SELECT_PAISES(?)';
        conn.query(consulta, [PI_cod_pais], (error, results) => {
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

// ACTUALIZAR PAÍS CON EL MÉTODO "PUT"
routes_pa.put("/actualizar_pais/:PI_cod_pais", (req, res) => {
   
    try{
        const { PV_nom_pais, PV_abr_pais } = req.body;
        const {PI_cod_pais} = req.params;
        const consulta  = 'call TRANSBARA.UPDATE_PAISES(?,?,?)';
        conn.query(consulta, [PI_cod_pais,PV_nom_pais, PV_abr_pais], (err, rows, fields) => {
            if (!err){
                res.json({Status: 'PAÍS ACTUALIZADA...'});
            } else {
                console.log("NO SE ACTUALIZÓ NINGÚN DATO DEL PAÍS.");
            }
        });
    }catch (error) {
        console.log(error);
    }

});

// ELIMINAR USUARIO CON EL MÉTODO DELETE
routes_pa.delete("/eliminar_pais/:PI_cod_pais", (req, res) => {
    try {
        
        const {PI_cod_pais} = req.params;
        const consulta = 'call TRANSBARA.DELETE_PAISES(?)';
        conn.query(consulta, [PI_cod_pais], (error, results) => {
            if (error) throw error;
            res.send({Status:"PAÍS ELIMINADA..."});
        });

    } catch (error) {
        console.log(error);
    }    
 
});

module.exports = routes_pa;