const express = require('express');
const routes_p = express.Router();
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

// OBTENER TODOS LOS PROVEEDORES
routes_p.get('/', (req, res) => {
    try {

        const consulta = 'call TRANSBARA.SELECT_TODOS_PROVEEDORES';
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


// INSERTAR UN PROVEEDOR CON EL MÉTODO "POST"
routes_p.post("/insertar_proveedor/", (req, res) => {
    try{
        const { PV_prv_nom_proveedor, PI_prv_id_proveedor, PV_prv_email_proveedor, PI_cod_estatus, PI_prv_cod_pais, PV_prv_usr_adicion, PV_prv_usr_modificacion, PV_prv_direccion_proveedor, PI_prv_telefono_proveedores, PV_des_direccion_proveedor, PI_num_telefono_proveedor, PV_nom_contacto } = req.body;
        const consulta = 'call TRANSBARA.INSERT_PROVEEDORES(?,?,?,?,?,?,?,?,?,?,?,?)';
        conn.query(consulta, [PV_prv_nom_proveedor,PI_prv_id_proveedor,PV_prv_email_proveedor,PI_cod_estatus,PI_prv_cod_pais,PV_prv_usr_adicion,PV_prv_usr_modificacion,PV_prv_direccion_proveedor,PI_prv_telefono_proveedores,PV_des_direccion_proveedor,PI_num_telefono_proveedor,PV_nom_contacto], (err,rows,fields) => {
            if (!err){
                res.json({Status: 'PROVEEDOR AGREGADO...'});
            } else {
                console.log(err); //"No pudo insertar ningún PROVEEDOR");
            }
        });
    }catch (error) {
        console.log(error);
    }

});

// OBTENER UN PROVEEDOR CON UN PARAMETRO EN ESPECÍFICO CON EL MÉTODO "GET"
routes_p.get("/obtener_proveedor/:prv_cod_proveedor", (req, res) => {
    const {prv_cod_proveedor} = req.params;
    const consulta = 'call TRANSBARA.SELECT_PROVEEDORES(?)';
    conn.query(consulta, [prv_cod_proveedor], (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send("No pudo traer ningún dato de la BD");
        }
    });

});


// ACTUALIZAR PROVEEDOR CON EL MÉTODO "PUT"
routes_p.put("/actualizar_proveedor/:prv_cod_proveedor", (req, res) => {
   
    try{
        const {prv_nom_proveedor, prv_id_proveedor, prv_email_proveedor, prv_cod_estatus, prv_cod_pais, prv_usr_adicion, prv_usr_modificacion, prv_direccion_proveedores, prv_telefono_proveedores } = req.body;
        const {prv_cod_proveedor} = req.params;
        const consulta  = 'call TRANSBARA.UPDATE_PROVEEDORES(?,?,?,?,?,?,?,?,?,?,?,?)';
        conn.query(consulta, [prv_cod_proveedor, prv_nom_proveedor, prv_id_proveedor, prv_email_proveedor, prv_cod_estatus, prv_cod_pais, prv_usr_adicion, prv_usr_modificacion, prv_direccion_proveedores, prv_telefono_proveedores], (err, rows, fields) => {
            if (!err){
                res.json({Status: 'PROVEEDOR ACTUALIZADO...'});
            } else {
                console.log("NO SE ACTUALIZÓ NINGÚN DATO DEL PROVEEDOR.");
            }
        });
    }catch (error) {
        console.log(error);
    }

});

// ELIMINAR USUARIO CON EL MÉTODO DELETE
routes_p.delete("/eliminar_proveedor/:PI_prv_cod_proveedor", (req, res) => {
    try {
        
        const {PI_prv_cod_proveedor} = req.params;
        const consulta = 'call TRANSBARA.DELETE_PROVEEDORES(?)';
        conn.query(consulta, [PI_prv_cod_proveedor], (error, results) => {
            if (error) throw error;
            res.send({Status:"PROVEEDOR ELIMINAdo..."});
        });

    } catch (error) {
        console.log(error);
    }  

});

module.exports = routes_p;