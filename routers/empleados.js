const express = require('express');
const routes = express.Router()
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

// OBTENER TODOS LOS EMPLEADOS
routes.get('/', (req, res) => {
    const consulta = 'call TRANSBARA.SELECT_TODOS_EMPLEADOS';
    conn.query(consulta, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send("No pudo traer ningún dato de la BD");
        }    
        
    });
    // res.send('Testing empleados');
});

// Obtener un usuario con un parametro en específico
routes.get("/empleado/:PI_usr_cod_usuario", (req, res) => {
    const {PI_usr_cod_usuario} = req.params;
    const consulta = 'call TRANSBARA.SELECT_EMPLEADO(?)';
    conn.query(consulta, [PI_usr_cod_usuario], (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send("No pudo traer ningún dato de la BD");
        }
    });

});

// ELIMINAR USUARIO CON EL MÉTODO DELETE
routes.delete("/eliminarunempleado/:PV_usr_cod_usuario", (req, res) => {
    const {PV_usr_cod_usuario} = req.params;
    const consulta = 'call TRANSBARA.DELETE_EMPLEADO(?)';
    conn.query(consulta, [PV_usr_cod_usuario], (error, results) => {
        if (error) throw error;
        res.send("Empleado eliminado...");
         /*if (results.length > 0) {
            res.json(results);
            //console.log(results[0][0].pe_usuarios);
            console.log("Usuario eliminado...");
        } else {
            res.send("No pudo eliminar ningún dato de la BD");
        }*/
    });
 
});

module.exports = routes;