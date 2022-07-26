const express = require('express');
const routes_ve = express.Router();
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

// Insertar Viajes empleados

routes_ve.post("/insertar_Pla_viajes_empleados/", (req, res) => {
    try{
        const {Cod_empleado,destino_viaje,Distancia_km,fecha_salida,fecha_llegada} = req.body;
        const consulta = 'call TRANSBARA.INSERT_VIAJES_EMPLEADOS(?,?,?,?,?);';
        conn.query(consulta,[Cod_empleado,destino_viaje,Distancia_km,fecha_salida,fecha_llegada], (err,rows,fields) => {
            if (!err){
                res.json({Status: 'VIAJES DE EMPLEADO AGREGADO...'});
            } else {
                console.log("No pudo insertar ningún viaje de empleado");
            }
        });
    }catch (error) {
        console.log(error); 
    }

});


//// Obtener todos los viajes por empleados 
routes_ve.get("/", (req, res) => {
    try {
        const consulta = 'call TRANSBARA.SELECT_TODOS_VIAJES_POR_EMPLEADOS';
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

// OBTENER UN VIAJE POR EMPLEADO
routes_ve.get("/viajesempleado/:PI_Cod_viaje", (req, res) => {
    try {
        
        const {PI_Cod_viaje} = req.params;
        const consulta = 'call TRANSBARA.SELECT_VIAJES_POR_EMPLEADO(?);';
        conn.query(consulta, [PI_Cod_viaje], (error, results) => {
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


//ELIMINAR VIAJES CON EL MÉTODO DELETE
routes_ve.delete("/eliminar_viajes/:PI_Cod_viaje", (req, res) => {
    try {
        const {PI_Cod_viaje} = req.params;
        const consulta = 'call TRANSBARA.DELETE_VIAJES_POR_EMPLEADO(?);';
        conn.query(consulta, [PI_Cod_viaje], (error, results) => {
            if (error) throw error;
            res.send({Status: 'VIAJE ELIMINADO...'});
        });
    
    } catch (error) {
        console.log(error);
    }

});

// ACTUALIZAR VIAJE EMPLEADO
routes_ve.put("/Update_viaje/:Cod_viaje", (req, res) => {
   
    try{
        const {Cod_empleado,destino_viaje,Distancia_km,fecha_salida,fecha_llegada } = req.body;
        const {Cod_viaje} = req.params;
        const query  = 'call TRANSBARA.UPDATE_VIAJES_POR_EMPLEADOS(?,?,?,?,?,?);';
        conn.query(query, [Cod_viaje,Cod_empleado,destino_viaje,Distancia_km,fecha_salida,fecha_llegada], (err, rows, fields) => {
            if (!err){
                res.json({Status: 'VIAJE DE EMPLEADO ACTUALIZADO...'});
            } else {
                console.log(err);//"NO SE ENCONTRÓ NINGÚN DATO.");
            }
            
        });
    }catch (error) {
        console.log(error);
    }

});

module.exports = routes_ve;