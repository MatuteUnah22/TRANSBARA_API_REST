const express = require('express');
const req = require('express/lib/request');
const routes_c = express.Router();
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

// OBTENER TODOS LOS CLIENTES
routes_c.get("/", (req, res) =>{
    try {
        const consulta = 'call TRANSBARA.SELECT_TODOS_CLIENTES';
        conn.query(consulta, (error, results) => {
            if (error) throw error;
            if (results.length >  0) {
                res.json(results);                
            } else {
                res.send("No contiene ningún dato la tabla");
            }
        });
    } catch (error) {
        console.log(error);
    }
});

// INSERTAR UN CLIENTE CON EL MÉTODO "POST"
routes_c.post("/insertar_cliente/", (req, res) => {
    try {
        const { PV_cli_nom_cliente, PV_cli_cod_tipo_persona, PI_cli_id_rtn, PI_cli_id_cliente, PI_cli_cod_estatus, PV_cli_email_cliente, PV_cli_cod_pais, PV_cli_usr_adicion, PV_cli_usr_modificacion, PV_des_tipo_persona } = req.body;
        const consulta = 'call TRANSBARA.INSERT_CLIENTES(?,?,?,?,?,?,?,?,?,?);';
        conn.query(consulta,[PV_cli_nom_cliente, PV_cli_cod_tipo_persona, PI_cli_id_rtn, PI_cli_id_cliente, PI_cli_cod_estatus, PV_cli_email_cliente, PV_cli_cod_pais, PV_cli_usr_adicion, PV_cli_usr_modificacion, PV_des_tipo_persona], (err, rows, fields) => {
            if (!err) {
                res.json({Status: 'CLIENTE AGREGADO...'});
            } else {
                console.log(err); //"NO INSERTO NINGÚN CLIENTE");
            }
        });
    } catch (error) {
        console.log(error);
    }
});

// OBTENER UN CLIENTE CON UN PARAMETRO EN ESPECÍFICO CON EL MÉTODO "GET"
routes_c.get("/obtener_cliente/:PV_cli_cod_cliente", (req,res) => {
    try {
        const {PV_cli_cod_cliente} = req.params;
        const consulta = 'call TRANSBARA.SELECT_CLIENTES(?)';
        conn.query(consulta, [PV_cli_cod_cliente], (err, results) => {
            if (err) throw err;
            if (results.length > 0) {
                res.json(results);                               
            } else {
                res.send({some: 'NO MOSTRÓ EL DATO O NO EXISTE EN LA TABLA'});                 
            }
        });
    } catch (error) {
        console.log(error);
    }
});

// ACTUALIZAR CLIENTE CON EL MÉTODO "PUT"
routes_c.put("/actualizar_cliente/:PV_cli_cod_cliente", (req, res) => {
   
    try{
        const { PV_cli_nom_cliente, PV_cli_cod_tipo_persona, PI_cli_id_rtn, PI_cli_id_cliente, PI_cli_cod_estatus, PV_cli_email_cliente, PV_cli_cod_pais, PV_cli_usr_adicion, PV_cli_usr_modificacion } = req.body;
        const {PV_cli_cod_cliente} = req.params;
        const consulta  = 'call TRANSBARA.UPDATE_CLIENTES(?,?,?,?,?,?,?,?,?,?)';
        conn.query(consulta, [PV_cli_cod_cliente,PV_cli_nom_cliente,PV_cli_cod_tipo_persona,PI_cli_id_rtn,PI_cli_id_cliente,PI_cli_cod_estatus,PV_cli_email_cliente,PV_cli_cod_pais,PV_cli_usr_adicion,PV_cli_usr_modificacion], (err, rows, fields) => {
            if (!err){
                res.json({Status: 'CLIENTE ACTUALIZADO...'});
            } else {
                console.log("NO SE ENCONTRÓ NINGÚN DATO.");
            }
        });
    }catch (error) {
        console.log(error);
    }

});

// ELIMINAR CLIENTE CON EL MÉTODO DELETE
routes_c.delete("/eliminar_cliente/:PV_cli_cod_cliente", (req, res) => {
    try {
        const {PV_cli_cod_cliente} = req.params;
        const consulta = 'call TRANSBARA.DELETE_CLIENTES(?)';
        conn.query(consulta, [PV_cli_cod_cliente], (error, results) => {
            //if (error) throw error;
            if (!err) {
                res.send({Status: 'CLIENTE ELIMINADO...'});
            } else {
                res.send({some: 'NO MOSTRÓ EL DATO O NO EXISTE EN LA TABLA'});
            }
            
        });
    
    } catch (error) {
        console.log(error);
    }

});

module.exports = routes_c;