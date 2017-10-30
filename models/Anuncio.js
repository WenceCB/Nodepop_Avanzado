"use strict";

const mongoose = require('mongoose');

// Definir un esquema

const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String] 
});



// Añadimos método estático para buscar por filtro, paginación y límite

anuncioSchema.statics.lista = function (filter, skip, limit, callback){
   const query = Anuncio.find(filter);  
   query.skip(skip);
   query.limit(limit);        
   return query.exec(callback);   
};

// Añadimos método estático para buscar tags

anuncioSchema.statics.lista_tags = function (filter,callback){
    const query = Anuncio.distinct(filter);        
    return query.exec(callback);   
 };

// Crear el modelo

const Anuncio = mongoose.model('Anuncio', anuncioSchema);



// No es necesario exportar el modelo ya que moongose lo conoce

module.exports = Anuncio;