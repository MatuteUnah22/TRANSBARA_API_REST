// conexion bd
const express = require('express');
const routes_fa_pago = express.Router();
const conexion = require("mysql");
require('dotenv').config();



// conectar a la bd mysql
 const conn = conexion.createConnection({
     host:'142.44.161.115',
     user:'TRANSBARA', 
     password: 'Trans$$532',
     datebase: 'TRANSBARA',
     port: '3306',
     multipleStatements: true
 });

 routes_fa_pago.post("/login", (req, res) => {
    const user = {
        id: 1 ,
    
    }

 jwt.sign({user}, 'secretkey', {expiresIn:'500 s'},(err, token) => {
      res.json({
            token

        });

    
     });

     });


        // Authorization: Bearer <token>
     function verifytoken(req,res,next){
            const bearerHeader =  req.headers['authorization']

          if(typeof bearerHeader !== 'undefined' ){
                const bearerToken = bearerHeader.split("")[1];
                req.token = bearerToken;
                next();
                 }else{
                    res.send(403);
                }
        } 
     
        // apis modulo fa_tipo:pago
      
      routes_fa_pago.get('/SELECT_FA_TIPOPAGO',verifytoken,(req, res) => {
        try {
            
        conn.query('call TRANSBARA.SELECT_FA_TIPO_PAGO();', [req.params.cod_factura],(err,results,fields)=> {
            if (!err){
                res.send(results);
                     }
                else{
                    res.send(err);  
                }
            });
        } catch (error) {
            res.send("ERROR")
         }
        });

        module.exports = routes_fa_pago;