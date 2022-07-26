const express = require('express');
const app = express();
const conexion = require("mysql");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const routes = require('./routes/empleados');
const routes_p = require('./routes/proveedores');
const routes_c = require('./routes/clientes');
const routes_ce = require('./routes/cargas_enviar');
const routes_cent = require('./routes/carga_ent');
const routes_ca = require('./routes/cargos');
const routes_es = require('./routes/estados');
const routes_pa = require('./routes/pais');
const routes_tc = require('./routes/tipo_contrato');
const routes_u = require('./routes/usuarios');

// constante para el paquete bodyparser
const bp = require('body-parser');
const routes_us = require('./routes/usuarios');

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

// test de conexion a bd
conn.connect((err)=>{
    if(!err) {
       console.log('CONEXIÓN EXITOSA TRANS. BARAHONA MORAZÁN');
    } else {
       console.log('ERROR AL CONECTAR A LA BD');
    }
});

// MIDDLEWARES
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));
app.use(express.json());

// ROUTES
app.get('/', (req, res) => {
   res.send('API Rest del Módulo de Persona - Empleados');
});

app.use('/empleados', routes);
app.use('/proveedores', routes_p);
app.use('/clientes', routes_c);
app.use('/cargas_enviar', routes_ce);
app.use('/carga_ent', routes_cent);
app.use('/cargos', routes_ca);
app.use('/estados', routes_es);
app.use('/pais', routes_pa);
app.use('/tipo_contrato', routes_tc);
app.use('/usuarios', routes_u);

//======= INICIO DE LA VERIFICACIÓN Y CREARCIÓN DEL TOKEN =======
// LOGIN PARA OBTENER EL TOKEN
app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        nombre: "David",
        email: "matute@unah.hn"
    }

    jwt.sign({user}, 'secretkey', (err, token) => {
        res.json({
            token
        });
    });
    
    //res.json(user);
});

app.post('/api/posts', verifyToken, (req, res) => {
    
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            sendStatus(403);
        } else {
            res.json({
                mensaje: "Post fue creado",
                authData
            })
        }
    });
    
});

// FUNCIÓN PARA LA VERIFICACIÓN DEL TOKEN "Authorization: Bearer <token>
function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }

}

//======= FIN DE LA VERIFICACIÓN Y CREARCIÓN DEL TOKEN =======


//EJECUTAMOS EL SERVER EN UN PUERTO ESPECFICO; PUERTO 3000 (ELSERVICIO NODEJS)
app.listen(3000,()=> console.log('server running puerto: 3000'));

module.exports = app;
