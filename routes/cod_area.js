const express = require('express');
const routes_coda = express.Router();
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

//// Obtener todos los Cod ARea
routes_coda.get("/", (req, res) => {
    try {
        const consulta = 'call TRANSBARA.SELECT_TODOS_COD_AREA';
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

// OBTENER UN CODIGO DE AREA
routes_coda.get("/cod_area/:PI_Cod_Area", (req, res) => {
    try {
        
        const {PI_Cod_Area} = req.params;
        const consulta = 'call TRANSBARA.SELECT_AREA(?);';
        conn.query(consulta, [PI_Cod_Area], (error, results) => {
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



// Insertar COD_AREA

routes_coda.post("/insertar_Cod_area/", (req, res) => {
    try{
        const {Descripcion,Turno} = req.body;
const consulta = 'call TRANSBARA.INSERT_AREA(?,?);';
        conn.query(consulta,[Descripcion,Turno], (err,rows,fields) => {
            if (!err){
                res.json({Status: 'COD_AREA AGREGADO...'});
            } else {
                console.log(err);//"No pudo insertar ningún viaje de empleado");
            }
        });
    }catch (error) {
        console.log(error); 
    }

});

// ACTUALIZAR COD AREA
routes_coda.put("/Update_Codarea/:Cod_Area", (req, res) => {
   
    try{
        const {Descripcion,Turno } = req.body;
        const {Cod_Area} = req.params;
    const query  = 'call TRANSBARA.UPDATE_AREA(?,?,?);';
        conn.query(query, [Cod_Area,Descripcion,Turno], (err, rows, fields) => {
            if (!err){
                res.json({Status: 'COD AREA ACTUALIZADO...'});
            } else {
                console.log(err);//"NO SE ENCONTRÓ NINGÚN DATO.");
            }
            
        });
    }catch (error) {
        console.log(error);
    }

});

//ELIMINAR COD_AREA CON EL MÉTODO DELETE
routes_coda.delete("/eliminar_area/:PI_Cod_Area", (req, res) => {
    try {
        const {PI_Cod_Area} = req.params;
        const consulta = 'call TRANSBARA.DELETE_AREA(?);';
        conn.query(consulta, [PI_Cod_Area], (error, results) => {
            if (error) throw error;
            res.send({Status: 'COD_AREA ELIMINADO...'});
        });
    
    } catch (error) {
        console.log(error);
    }

});

module.exports = routes_coda;