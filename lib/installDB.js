"use strict";


const mongoose = require('mongoose');
const conn = mongoose.connection;
mongoose.connect('mongodb://localhost/nodepop');


// Definir un esquema

const Anuncio = require('..//models/Anuncio');

// Cargo los datos

const datos = require('../lib/datos');

conn.once('open', async () =>{
  console.log('Conectado a MongoDB');
  const res = await Anuncio.deleteMany({});
  console.log('Eliminados', res.result.n, 'anuncios');
  const insertados = await Anuncio.insertMany(datos.anuncios);
  console.log(`Insertados ${insertados.length} anuncios`);
 
});

