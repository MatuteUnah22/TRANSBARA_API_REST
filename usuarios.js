// conexion bd

// constante para el paquete de mysql
const mysql = require ('mysql');
const conexion = require("mysql");


// constante para el paquete express
const express = require('express');

// variable para los metodos express
var app = express();

// constante para el paquete bodyparser
const bp = require('body-parser');

// enviando los datos JSON  a nodejs api
app.use(bp.json());


require('dotenv').config();

// conectar a la bd mysql
var mysqlconection = mysql.createConnection({
    //var conn = conexion.createConnection({    
     host:'142.44.161.115',
     user:'TRANSBARA', 
     password: 'Trans$$532',
     datebase: 'TRANSBARA',
     port: '3306',
     multipleStatements: true  // multipleStatements es para cuando estamos trabajando con transacciones en MySql
 });

// test de conexion a bd
mysqlconection.connect((err)=>{
//conn.connect((err)=>{
    if(!err) {
       console.log('CONEXION EXITOSA TRANS. BARAHONA MORAZAN');
    } else {
       console.log('ERROR AL CONECTAR A LA BD');

    }

});

//EJECUTAMOS EL SERVER EN UN PUERTO ESPECFICO; PUERTO 3000 (ELSERVICIO NODEJS)
app.listen(3000,()=> console.log('server running puerto: 3000'))

//Se mostrará un mensaje en pantalla "Módulo de Servicios"
app.get('/', (req, res) => {
    res.send('Módulo de Servicios');
});

// Obenter todo los usuarios 
app.get("/u", (req, res) => {
  try {
    const { usr_cod_usuario, usr_password, usr_nom_usuario, usr_cod_empleado, usr_cod_estatus, usr_loguead, usr_cod_tipo_usuario, usr_fec_adicion, usr_usr_adicion, usr_fec_modificacion, usr_usr_modificacion, usr_fec_ult_conex } = req.body;
    const consulta = `call SELECT_USUARIO ('${usr_cod_usuario}',${usr_password},${usr_nom_usuario},${usr_cod_empleado},${usr_cod_estatus},${usr_loguead},${usr_cod_tipo_usuario},${usr_fec_adicion},${usr_usr_adicion},${usr_fec_modificacion},${usr_usr_modificacion},${usr_fec_ult_conex})`;
    conn.query(consulta, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
            console.log(results[0][0].pe_usuarios);
        }  
    })
  } catch (error) {
    res.send("No se encontró ningún dato o está mala la consulta")
  }

});


// seleccionar  usuario por nombre
app.get("/un_usuario", (req, res) => {
   try {
    const { usr_cod_usuario, usr_password, usr_nom_usuario, usr_cod_empleado, usr_cod_estatus, usr_loguead, usr_cod_tipo_usuario, usr_fec_adicion, usr_usr_adicion, usr_fec_modificacion, usr_usr_modificacion, usr_fec_ult_conex } = req.body;
    const consulta = `call SELECT_USUARIO('${usr_cod_usuario}',${usr_password},${usr_nom_usuario},${usr_cod_empleado},${usr_cod_estatus},${usr_loguead},${usr_cod_tipo_usuario},${usr_fec_adicion},${usr_usr_adicion},${usr_fec_modificacion},${usr_usr_modificacion},${usr_fec_ult_conex})`;
    conn.query(consulta, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.send("0")
        }
    })
   } catch (error) {
    res.send("No se encontró ningún dato o está mala la consulta")
   }
});

// Registro de usuarios en la ruta agregar
app.post("/nuevo", (req, res) => {
    try {
        const { NOM_PERSONA, USER_EMAIL, NUM_CEL, NOM_USUARIO, CLAVE, NOM_IDENTIFICACION, COD_IDENTIFICACION, DIRECCION, COD_ROL,
            COD_MODULO } = req.body;
        var conteoExistencia = `call CONTEO_USUARIO('${NOM_USUARIO}','${USER_EMAIL}');`;
        conn.query(conteoExistencia, (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                if (results[0][0].numero_usuario > 0) {
                    res.send(`El usuario ${NOM_USUARIO} ya existe, favor registra uno nuevo.!`);
                }
                else {
                    const consulta = `call NUEVO_USUARIO('${NOM_PERSONA}','${USER_EMAIL}',${NUM_CEL},'${NOM_USUARIO}','${CLAVE}','${NOM_IDENTIFICACION}','${COD_IDENTIFICACION}','${DIRECCION}',${COD_ROL},1,${COD_MODULO})`;
                    conn.query(consulta, (error, nuevo_usuario) => {
                        if (error) throw error;
                        if (nuevo_usuario.length > 0) {
                            res.json(nuevo_usuario[0]);
                        }
                    });
                }
            }  
        })
    } catch (error) {
        res.send("0");
    }
   
});


// Registro actualizar datos de usuarios
app.put('/actualizar', (req, res) => {
    try {
        const { COD_PERSONA, NOM_PERSONA, USER_EMAIL, NUM_CEL, NOM_USUARIO, NOM_IDENTIFICACION, COD_IDENTIFICACION, DIRECCION, COD_ROL,
            COD_DIRECCION, COD_TIP_IDENTIFICACION, COD_USUARIO, COD_MODULO } = req.body;
        const consulta = `call 	ACTUALIZAR_USUARIO(${COD_PERSONA},'${NOM_PERSONA}','${USER_EMAIL}',${NUM_CEL},'${NOM_USUARIO}','${NOM_IDENTIFICACION}','${COD_IDENTIFICACION}','${DIRECCION}',${COD_ROL},1,${COD_DIRECCION},${COD_TIP_IDENTIFICACION},${COD_USUARIO},${COD_MODULO})`;
    
        conn.query(consulta, error => {
            if (error) throw error;
            res.send("1");
        }); 
    } catch (error) {
        res.send("0");
    }
    
});

// Registro actualizar datos de usuarios
app.put('/actualizar_clave', (req, res) => {
    try {
        const { CLAVE, NOM_USUARIO, COD_USUARIO, COD_MODULO } = req.body;
        const consulta = `call ACTUALIZAR_CLAVE('${CLAVE}','${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
        conn.query(consulta, error => {
            if (error) throw error;
            res.send("Actualizacio de Clave por medio del nombre de usuario");
        });
    } catch (error) {
        res.send("0");

    }

});

// Registro actualizar clave por correo
app.put('/actualizar_clave_correo', (req, res) => {
    try {
        const { CLAVE, CORREO, COD_USUARIO, COD_MODULO } = req.body;
        const consulta = `call 	ACTUALIZAR_CLAVE_CORREO('${CLAVE}','${CORREO}',${COD_USUARIO},${COD_MODULO})`;
        conn.query(consulta, error => {
            if (error) throw error;
            res.send("Actualizacio de Clave por medio de Correo");
        });
    } catch (error) {
        res.send("0");

    }

});


// Obenter preguntas y respuestas de  usuarios 
app.get("/seguridad", (req, res) => {
    try {
        const { NOM_USUARIO, COD_USUARIO, COD_MODULO } = req.body;
    const consulta = `call OBTENER_PREGUNTAS_SEGURIDAD('${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
    conn.query(consulta, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        }
    })
    } catch (error) {
        res.send("0");
    }

});



// Registro de preguntas de  usuario
app.post("/nueva_pregunta", (req, res) => {
  try {
    const { DES_PREGUNTA, DES_RESPUESTA, NOM_USUARIO, COD_USUARIO, COD_MODULO } = req.body;
    const consulta = `call 	NUEVA_PREGUNTA_SEGURIDAD('${DES_PREGUNTA}','${DES_RESPUESTA}','${NOM_USUARIO}',1,${COD_USUARIO},${COD_MODULO})`;
    conn.query(consulta, error => {
        if (error) throw error;
        res.send("1")
    });
  } catch (error) {
    res.send("0");
  }

})

// Registro actualizar preguntas de  usuario
app.put('/actualizar_pregunta', (req, res) => {
   try {
    const { DES_PREGUNTA, DES_RESPUESTA, NOM_USUARIO, COD_USUARIO, COD_MODULO, COD_PREGUNTAS, COD_RESPUESTA, COD_ESTADO } = req.body;
    const consulta = `call ACTUALIZAR_PREGUNTA_SEGURIDAD('${DES_PREGUNTA}','${DES_RESPUESTA}','${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO},${COD_PREGUNTAS},${COD_RESPUESTA},${COD_ESTADO})`;
    conn.query(consulta, error => {
        if (error) throw error;
        res.send("1")
    });
   } catch (error) {
    res.send("0");
   }
});

module.exports = app;