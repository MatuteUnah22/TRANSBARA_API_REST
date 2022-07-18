const express = require('express');
const routes = express.Router();
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
    try {

        const consulta = 'call TRANSBARA.SELECT_TODOS_EMPLEADOS';
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

// INSERTAR UN USUARIO CON EL MÉTODO "POST"
routes.post("/insertar_empleado/", (req, res) => {
    try{
        const { emp_nom_empleado, emp_id_empleado, emp_email_empleado, emp_estado_civil, emp_cod_estatus, emp_cod_cargo, emp_tipo_contrato, emp_usr_adicion, emp_usr_modificacion, des_cargo, estatus, des_tipo_contrato } = req.params;
        console.log(req.body);
        const consulta = 'call TRANSBARA.INSERT_EMPLEADO(?,?,?,?,?,?,?,?,?,?,?,?);';
        conn.query(consulta,[emp_nom_empleado, emp_id_empleado, emp_email_empleado, emp_estado_civil, emp_cod_estatus, emp_cod_cargo, emp_tipo_contrato, emp_usr_adicion, emp_usr_modificacion, des_cargo, estatus, des_tipo_contrato], (err,rows,fields) => {
            if (!err){
                res.json({Status: 'COLABORADOR AGREGADO...'});
            } else {
                console.log("No pudo insertar ningún colaborador");
            }
        });
    }catch (error) {
        console.log(error);
    }

});

// OBTENER UN USUARIO CON UN PARAMETRO EN ESPECÍFICO CON EL MÉTODO "GET"
routes.get("/obtener_empleado/:PI_emp_cod_empleado", (req, res) => {
    const {PI_emp_cod_empleado} = req.params;
    const consulta = 'call TRANSBARA.SELECT_EMPLEADO(?)';
    conn.query(consulta, [PI_emp_cod_empleado], (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send("No pudo traer ningún dato de la BD");
        }
    });

});

// ACTUALIZAR USUARIO CON EL MÉTODO "PUT"
routes.put("/actualizar_empleado/:emp_cod_empleado", (req, res) => {
   
    try{
        const {emp_nom_empleado, emp_id_empleado, emp_email_empleado, emp_estado_civil, emp_cod_estatus, emp_cod_cargo, emp_tipo_contrato, emp_usr_adicion, emp_usr_modificacion, des_cargo, estatus, des_tipo_contrato } = req.body;
        const {emp_cod_empleado} = req.params;
        const consulta  = 'call TRANSBARA.UPDATE_USUARIO(?,?,?,?,?,?,?,?,?,?,?,?,?)';
        conn.query(consulta, [emp_cod_empleado,emp_nom_empleado, emp_id_empleado, emp_email_empleado, emp_estado_civil, emp_cod_estatus, emp_cod_cargo, emp_tipo_contrato, emp_usr_adicion, emp_usr_modificacion, des_cargo, estatus, des_tipo_contrato], (err, rows, fields) => {
            if (!err){
                res.json({Status: 'COLABORADOR ACTUALIZADO...'});
            } else {
                console.log("NO SE ACTUALIZÓ NINGÚN DATO DEL COLABORADOR.");
            }
        });
    }catch (error) {
        console.log(error);
    }

});


// ELIMINAR USUARIO CON EL MÉTODO DELETE
routes.delete("/eliminar_empleado/:PI_emp_cod_empleado", (req, res) => {
    try {
        
        const {PI_emp_cod_empleado} = req.params;
        const consulta = 'call TRANSBARA.DELETE_EMPLEADO(?)';
        conn.query(consulta, [PI_emp_cod_empleado], (error, results) => {
            if (error) throw error;
            res.send("Empleado eliminado...");
        });

    } catch (error) {
        
    }    
 
});

module.exports = routes;