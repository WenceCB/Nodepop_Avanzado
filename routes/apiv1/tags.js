"use strict";

const express = require('express');
const router = express.Router();

 // Le pedimos a moongose que nos de el modelo de Anuncio

const Anuncio = require('..//../models/Anuncio');

const filter = 'tags';



// GET de mi API /

router.get('/',(req,res,next)  => { 
    
    // Mostrar la lista de tags existentes

    Anuncio.lista_tags(filter).then(lista => {   
        
        // Si se quiere mostrar en JSON descomentar res.json y comentar res.render
        
        //res.json({succes: true, rows: lista});       
        res.render('tags',{lista});
    }).catch( err => {
            console.log('Error ',err);
            next(err); // Para que retorne la página de error
            return;        
    });
});
module.exports = router;