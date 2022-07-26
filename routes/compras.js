const express = require('express');
const routes_com = express.Router();
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

// Obtener todas las compras
routes_com.get("/", (req, res) => {
    try {
        const consulta = 'call TRANSBARA.SELECT_TODOS_COMPRAS';
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

// INSERTAR COMPRAS CON EL MÉTODO "POST"
routes_com.post("/insertar_compras/", (req, res) => {
    try{
        const {PV_cod_usuario, PI_cod_proveedor,PI_registro_de_compra,PI_compras_pendiente_por_pagar, PI_tipo_pago,PV_usr_adicion, PV_usr_modificacion } = req.body;
        const consulta = 'call TRANSBARA.INSERT_COMPRAS(?,?,?,?,?,?,?);';
        conn.query(consulta,[PV_cod_usuario, PI_cod_proveedor,PI_registro_de_compra,PI_compras_pendiente_por_pagar, PI_tipo_pago,PV_usr_adicion, PV_usr_modificacion], (err,rows,fields) => {
            if (!err){
                res.json({Status: 'COMPRA AGREGADA...'});
            } else {
                console.log(err);//"No pudo insertar ningún usuario");
            }
        });
    }catch (error) {
        console.log(error);
    }

});

// OBTENER COMPRAS CON UN PARAMETRO EN ESPECÍFICO CON EL MÉTODO "GET"
routes_com.get("/compraselect/:PI_cod_compra", (req, res) => {
    try {
        
        const {PI_cod_compra} = req.params;
        const consulta = 'call TRANSBARA.SELECT_COMPRAS(?);';
        conn.query(consulta, [PI_cod_compra], (error, results) => {
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

// ACTUALIZAR USUARIO CON EL MÉTODO "PUT"
routes_com.put("/actualizar_compra/:PI_cod_compra", (req, res) => {
   
    try{
        const {PV_cod_usuario, PI_cod_proveedor,PI_registro_de_compra,PI_compras_pendiente_por_pagar, PI_tipo_pago,PV_usr_adicion, PV_usr_modificacion } = req.body;
        const {PI_cod_compra} = req.params;
        const consulta  = 'call TRANSBARA.UPDATE_COMPRAS(?, ?, ?, ?, ?, ?,?,?);';
        conn.query(consulta, [PI_cod_compra,PV_cod_usuario, PI_cod_proveedor,PI_registro_de_compra,PI_compras_pendiente_por_pagar, PI_tipo_pago,PV_usr_adicion, PV_usr_modificacion ], (err, rows, fields) => {
            if (!err){
                res.json({Status: 'COMPRA ACTUALIZADO...'});
            } else {
                console.log("NO SE ENCONTRÓ NINGÚN DATO.");
            }
        });
    }catch (error) {
        console.log(error);
    }

});

// ELIMINAR USUARIO CON EL MÉTODO DELETE
routes_com.delete("/eliminar_compra/:PI_cod_compra", (req, res) => {
    try {
        const {PI_cod_compra} = req.params;
        const consulta = 'call TRANSBARA.DELETE_COMPRAS(?);';
        conn.query(consulta, [PI_cod_compra], (error, results) => {
            if (error) throw error;
            res.send({Status: 'COMPRA ELIMINADO...'});
        });
    
    } catch (error) {
        console.log(error);
    }

});

module.exports=routes_com;