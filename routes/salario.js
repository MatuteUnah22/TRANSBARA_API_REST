
const express = require('express');
const routes_s = express.Router();
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

//Salario Insertar

routes_s.post("/insertar_salario/", (req, res) => {
    try{
        const { PD_salario_fijo, PI_viajes_porempleado,PI_Cod_empleado, PV_destino_viaje, PD_Distancia_km, PV_Fecha_salida, PV_fecha_llegada ,PI_salario,PI_cod_puesto,PI_Cod_Area , PV_user_adicion,PV_user_modifico} = req.body;
        const consulta = 'call TRANSBARA.INSERT_SALARIO (?,?,?,?,?,?,?,?,?,?,?,?);';
        conn.query(consulta,[ PD_salario_fijo, PI_viajes_porempleado,PI_Cod_empleado, PV_destino_viaje, PD_Distancia_km, PV_Fecha_salida, PV_fecha_llegada ,PI_salario,PI_cod_puesto,PI_Cod_Area , PV_user_adicion,PV_user_modifico], (err,rows,fields) =>{
            if (!err){
                res.json({Status: 'SALARIO AGREGADO...'});
            } else {
                console.log(err);//"No pudo insertar ningún Salario");
            }
        });
    }catch (error) {
        console.log(error);
    }

});

 
//// Obtener todos los Salarios
routes_s.get("/", (req, res) => {
    try {
        const consulta = 'call TRANSBARA.SELECT_TODOS_SALARIO';
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

//ELIMINAR USUARIO CON EL MÉTODO DELETE
routes_s.delete("/eliminar_salario/:PI_cod_salario", (req, res) => {
    try {
        const {PI_cod_salario} = req.params;
        const consulta = 'call TRANSBARA.DELETE_SALARIOS(?);';
        conn.query(consulta, [PI_cod_salario], (error, results) => {
            if (error) throw error;
            res.send({Status: 'SALARIO ELIMINADO...'});
        });
    
    } catch (error) {
        console.log(error);
    }

});



// ACTUALIZAR USUARIO 
routes_s.put("/actualizar_salario/:cod_salario", (req, res) => {
   
    try{
        const {salario_fijo,viajes_porempleado } = req.body;
        const {cod_salario} = req.params;
        const query  = 'call TRANSBARA.UDATE_SALARIO(?,?,?);';
        conn.query(query, [cod_salario,salario_fijo,viajes_porempleado], (err, rows, fields) => {
            if (!err){
                res.json({Status: 'SALARIO ACTUALIZADO...'});
            } else {
                console.log(err);//"NO SE ENCONTRÓ NINGÚN DATO.");
            }
        });
    }catch (error) {
        console.log(error);
    }

});

// OBTENER UN SALARIO 
routes_s.get("/salario/:PI_cod_salario", (req, res) => {
    try {
        
        const {PI_cod_salario} = req.params;
        const consulta = 'call TRANSBARA.SELECT_SALARIO(?);';
        conn.query(consulta, [PI_cod_salario], (error, results) => {
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

module.exports = routes_s;