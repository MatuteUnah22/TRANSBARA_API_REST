const express = require('express');
const app = express();
const conexion = require("mysql");
require('dotenv').config();

//Conexion a la base de datos
var conn = conexion.createConnection(
    {
        host: '142.44.161.115',
        user: 'TRANSBARA',
        password: 'Trans$$532',
        database: 'TRANSBARA',
        port: '3306',
        multipleStatements: true
    }
);

// test de conexion a bd
conn.connect((err)=>{
    if(!err) {
       console.log('CONEXION EXITOSA TRANS. BARAHONA MORAZAN');
    } else {
       console.log('ERROR AL CONECTAR A LA BD');

    }

});

app.get('/', (req, res) => {
   res.send('Módulo de Servicios');
});

//EJECUTAMOS EL SERVER EN UN PUERTO ESPECFICO; PUERTO 3000 (ELSERVICIO NODEJS)
app.listen(3000,()=> console.log('server running puerto: 3000'));

app.get("/usuarios", (req, res) => {
   const consulta = 'call TRANSBARA.SELECT_USUARIO' || {};
  // const { usr_cod_usuario, usr_password, usr_nom_usuario, usr_cod_empleado, usr_cod_estatus, usr_loguead, usr_cod_tipo_usuario, usr_fec_adicion, usr_usr_adicion, usr_fec_modificacion, usr_usr_modificacion, usr_fec_ult_conex } = req.body;
   // const consulta = `call SELECT_USUARIO('${usr_cod_usuario}',${usr_password},${usr_nom_usuario},${usr_cod_empleado},${usr_cod_estatus},${usr_loguead},${usr_cod_tipo_usuario},${usr_fec_adicion},${usr_usr_adicion},${usr_fec_modificacion},${usr_usr_modificacion},${usr_fec_ult_conex})`;
      
   conn.query(consulta, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send("No pudo traer ningún dato de la BD");
        }
    });

});

app.get("/usuarios/:PI_usr_cod_usuario", (req, res) => {
    const {PI_usr_cod_usuario} = req.params;
    const consulta = 'call TRANSBARA.SELECT_USUARIO(?)';
    conn.query(consulta, [PI_usr_cod_usuario], (error, results) => {
         if (error) throw error;
         if (results.length > 0) {
             res.json(results);
         } else {
             res.send("No pudo traer ningún dato de la BD");
         }
     });
 
 });

 app.get("/eliminarunusuario/:PV_usr_cod_usuario", (req, res) => {
    const {PV_usr_cod_usuario} = req.params;
    const consulta = 'call TRANSBARA.DELETE_USUARIO(?)';
    conn.query(consulta, [PV_usr_cod_usuario], (error, results) => {
        if (error) throw error;
        res.send("Usuario eliminado...");
         /*if (results.length > 0) {
            res.json(results);
            //console.log(results[0][0].pe_usuarios);
            console.log("Usuario eliminado...");
        } else {
            res.send("No pudo traer ningún dato de la BD");
        }*/
    });
 
 });

module.exports = app;