"use strict";

const express = require('express');
const router = express.Router();

// Le pedimos a moongose que nos de el modelo de Anuncio


const Anuncio = require('../../models/Anuncio');


// Construcción de rutas para imágenes

const ruta = '/images/anuncios/';


router.get('/',(req,res,next)  => {
    
        const nombre = req.query.nombre;
        const venta = req.query.venta;
        const tags = req.query.tags;
        const precio = req.query.precio;
    
    
        // Paginar
    
        const skip = parseInt(req.query.skip);
    
        // Limitar
        
        const limit = parseInt(req.query.limit);
    
        // Filtro
    
        const filter = {};
    
        if (nombre){
            filter.nombre = new RegExp('^' +   req.query.nombre,   "i");;
        }
        if (venta){
            filter.venta = venta;
        }
        if (tags){
            filter.tags = tags;
            console.log('Hay tag',tags);
        }
        if (typeof req.query.precio !== 'undefined' && req.query.precio !== '-') {
            if (req.query.precio.indexOf('-') !== -1) {
              filter.precio = {};
              let rango = req.query.precio.split('-');
              if (rango[0] !== '') {
                filter.precio.$gte = rango[0];
              }
        
              if (rango[1] !== '') {
                filter.precio.$lte = rango[1];
              }
            } else {
              filter.precio = req.query.precio;
            }
          }
        // Recuperar una lista de Anuncios
    
        Anuncio.lista(filter, skip, limit).then(lista => {

            // Si se quiere mostrar en JSON descomentar res.json y comentar res.render

            //res.json({succes: true, rows: lista});           
            res.render('anuncios',{lista,ruta});
        }).catch( err => {
                console.log('Error ',err);
                next(err); // Para que retorne la página de error
                return;        
        });
    });


// POST /
// Crear un anuncio

router.post('/',(req,res, next) =>{
    console.log(req.body);

    // Creamos nuevo Anuncio

    const anuncio = new Anuncio(req.body);

    // Lo guardamos en la base de datos

    anuncio.save((err,anuncioGuardado) =>{
        if(err){
            console.log('Error ',err);
            next(err); // Para que retorne la página de error
            return;
        }
        // Si se quiere mostrar en JSON descomentar res.json y comentar res.render

        //res.json({succes: true, resultado: anuncioGuardado});
        res.render('anuncioGuardado',{anuncioGuardado,ruta});
    })
});

module.exports = router;