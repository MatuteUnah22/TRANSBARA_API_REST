

// conexion bd
const express = require('express');
const routes_factura = express.Router();
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

 

        routes_factura.post("/login", (req, res) => {
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
             



    

         //update api
         routes_factura.put("/UPDATE_FACTURA/:cod_factura",verifytoken, (req, res) => {
   
         try{
        const { cod_usuario,Numero_factura,cod_tipo_pago,Tipo_gasto,cod_deduciones,Gasto_total,user_adicion,user_modifico} = req.body;
        const {cod_factura} = req.params;
        const query ='call TRANSBARA.UPDATE_FACTURA(?,?,?,?,?,?,?,?,?)';
         conn.query(query, [cod_factura,cod_usuario,Numero_factura,cod_tipo_pago,Tipo_gasto,cod_deduciones,Gasto_total,user_adicion,user_modifico], (err, rows, fields) => {
            if (!err){
                res.json({Status: 'FACTURA ACTUALIZADO...'});
            } else {
                console.log(err);
            }
        });
        }catch (error) {
        console.log(error);
        }

        });






              
            // seleccionar facturas


            routes_factura.get('/SELECT_FACTURA',verifytoken,(req, res) => {
            try {
                
            conn.query('call TRANSBARA.SELECT_TODOS_FACTURAS();', [req.params.cod_factura],(err,results,fields)=> {
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

                // seleccionar una factura
                routes_factura.get('/SELECT_FACTURA1/:cod_factura',verifytoken, (req, res) => {
                try {
                    const sql = 'call TRANSBARA.SELECT_FACTURA(?);';
            conn.query(sql, [req.params.cod_factura],(err,results,fields)=> {
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


                 //borrar 
                 routes_factura.delete('/DELETE_FACTURA/:cod_factura',verifytoken ,(req, res) => {
                    try {
                        const sql = 'call TRANSBARA.DELETE_FACTURA(?);';
                conn.query(sql, [req.params.cod_factura],(err,results,fields)=> {
                        if (!err){
                            res.send("ELIMINADO");
                                 }
                            else{
                                res.send(err);  
                            }
                        });
                    } catch (error) {
                        
                        res.send("ERROR")
                     }
                    });



               
                        

                //insert api
         routes_factura.post("/INSERT_FACTURA/",verifytoken, (req, res) => {
             try{
        const { cod_usuario, Numero_factura, cod_tipo_pago, Tipo_gasto, cod_deduciones, Gasto_total, user_adicion, user_modifico} = req.body;
        console.log(req.body);
        const consulta = 'call TRANSBARA.INSERT_FACTURA(?,?,?,?,?,?,?,?);';
        conn.query(consulta,[cod_usuario,Numero_factura, cod_tipo_pago, Tipo_gasto, cod_deduciones, Gasto_total, user_adicion, user_modifico], (err,rows,fields) => {
            if (!err){
                res.json({Status: 'FACTURA AGREGADO...'});
            } else {
                console.log(err);
            }
        });
    }catch (error) {
        console.log(error);
    }

        });




      

      
      module.exports = routes_factura;