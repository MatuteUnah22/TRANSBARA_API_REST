const express = require('express');
const routes_tp = express.Router();
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


//// Obtener todos los Tipo de empleados
routes_tp.get("/", (req, res) => {
    try {
        const consulta = 'call TRANSBARA.SELECT_TODOS_TIPO_EMPLEADOS';
        conn.query(consulta, (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                res.json(results);
            } else {
                res.send("No pudo traer ningún dato de la Base de Datos");
            }
        });
        
    } catch (error) {
        console.log(error);
    }

});

// OBTENER UN TIPO DE EMPLEADOS
routes_tp.get("/Tipo_empleados/:PI_Cod_Tipoempleado", (req, res) => {
    try {
        
        const {PI_Cod_Tipoempleado} = req.params;
        const consulta = 'call TRANSBARA.SELECT_TIPO_EMPLEADO(?);';
        conn.query(consulta, [PI_Cod_Tipoempleado], (error, results) => {
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

//Salario Insertar TIPO DE EMPLEADOS

routes_tp.post("/insertar_Tipoempleados/", (req, res) => {
    try{
        const {salario,cod_puesto,Cod_Area,user_adicion,user_modifico} = req.body;
        console.log(req.body);
const consulta = 'call TRANSBARA.INSERT_TIPO_EMPLEADOS(?,?,?,?);';
        conn.query(consulta,[salario,cod_puesto,Cod_Area,user_adicion,user_modifico], (err,rows,fields) => {
            if (!err){
                res.json({Status: 'TIPO EMPLEADO AGREGADO...'});
            } else {
                console.log("No pudo insertar ningún Tipo de empleado");
            }
        });
    }catch (error) {
        console.log(error); 
    }

});

// ACTUALIZAR COD TIPO DE PERSONAS
routes_tp.put("/Update_Tipoempleados/:Cod_Tipoempleado", (req, res) => {
   
    try{
        const {salario,cod_puesto,Cod_Area,user_adicion,user_modifico } = req.body;
        const {Cod_Tipoempleado} = req.params;
const query  = 'call TRANSBARA.UPDATE_TIPO_EMPLEADOS(?,?,?,?,?,?);';
        conn.query(query, [Cod_Tipoempleado,salario,cod_puesto,Cod_Area,user_adicion,user_modifico], (err, rows, fields) => {
            if (!err){
                res.json({Status: ' TIPO DE EMPLEADO ACTUALIZADO...'});
            } else {
                console.log(err);//"NO SE ENCONTRÓ NINGÚN DATO.");
            }
            
        });
    }catch (error) {
        console.log(error);
    }

});

//ELIMINAR TIPO DE EMPLEADO A CON EL MÉTODO DELETE
routes_tp.delete("/eliminar_Tipoempleado/:Cod_Tipoempleado", (req, res) => {
    try {
        const {Cod_Tipoempleado} = req.params;
        const consulta = 'call TRANSBARA.DELETE_TIPO_EMPLEADOS(?);';
        conn.query(consulta, [Cod_Tipoempleado], (error, results) => {
            if (error) throw error;
            res.send({Status: 'TIPO EMPLEADO ELIMINADO...'});
        });
    
    } catch (error) {
        console.log(error);
    }

});

module.exports =routes_tp;