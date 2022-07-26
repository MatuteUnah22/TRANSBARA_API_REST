const express = require('express');
const routes_ob = express.Router();
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

// Obtener todos pa objetos
routes_ob.get("/", (req, res) => {
    try {
        const consulta = 'call TRANSBARA.SELECT_TODOS_OBJETOS';
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

// INSERTAR PA OBJETOS CON EL METODO "POST"
routes_ob.post("/insertarobjetos/", (req, res) => {
    try{
        const { PI_cod_objeto, PV_des_objeto } = req.body;
        console.log(req.body);
        const consulta = 'call TRANSBARA.INSERT_OBJETOS(?,?);';
        conn.query(consulta,[PI_cod_objeto, PV_des_objeto], (err,rows,fields) => {
            if (!err){
                res.json({Status: 'COMPRA REGISTRADA...'});
            } else {
                console.log(err);//"No pudo insertar ningún usuario");
            }
        });
    }catch (error) {
        console.log(error);
    }

});

// OBTENER PA OBJETO CON UN PARAMETRO EN ESPECÍFICO CON EL MÉTODO "GET"
routes_ob.get("/selectobjeto/:PI_cod_objeto", (req, res) => {
    try {
        
        const {PI_cod_objeto} = req.params;
        const consulta = 'call TRANSBARA.SELECT_OBJETOS(?);';
        conn.query(consulta, [PI_cod_objeto], (error, results) => {
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

// ACTUALIZAR OBJETOS CON EL MÉTODO "PUT"
routes_ob.put("/actualizar_objetos/:PI_cod_objeto", (req, res) => {
   
    try{
        const {PV_des_objeto } = req.body;
        const {PI_cod_objeto} = req.params;
        const consulta  = 'call TRANSBARA.UPDATE_OBJETOS(?,?);';
        conn.query(consulta, [PI_cod_objeto, PV_des_objeto ], (err, rows, fields) => {
            if (!err){
                res.json({Status: 'OBJETO ACTUALIZADO...'});
            } else {
                console.log(err);//"NO SE ENCONTRÓ NINGÚN DATO.");
            }
        });
    }catch (error) {
        console.log(error);
    }

});

// ELIMINAR OBJETO CON EL MÉTODO DELETE
routes_ob.delete("/eliminar_objeto/:PI_cod_objeto", (req, res) => {
    try {
        const {PI_cod_objeto} = req.params;
        const consulta = 'call TRANSBARA.DELETE_OBJETOS(?);';
        conn.query(consulta, [PI_cod_objeto], (error, results) => {
            if (error) throw error;
            res.send({Status: 'OBJETO ELIMINADO...'});
        });
    
    } catch (error) {
        console.log(error);
    }

});

module.exports = routes_ob;