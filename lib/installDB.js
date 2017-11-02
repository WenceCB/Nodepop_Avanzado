"use strict";


const mongoose = require('mongoose');
const conn = mongoose.connection;
mongoose.connect('mongodb://localhost/nodepop', {
  useMongoClient: true // para que no salga el DeprecationWarning
});
mongoose.Promise = global.Promise;

// Defino Esquemas

const Anuncio = require('../models/Anuncio');
const Usuario = require('../models/Usuario');

// Cargo los datos

const datos = require('../lib/datos');

conn.once('open', async () =>{
  console.log('Conectado a MongoDB', mongoose.connection.name);
  const res = await Anuncio.deleteMany({});
  console.log('Eliminados', res.result.n, 'anuncios');
  const insertados = await Anuncio.insertMany(datos.anuncios);
  console.log(`Insertados ${insertados.length} anuncios`);
  console.log('----- USUARIOS -----');
  const deleted = await Usuario.deleteMany();
  console.log(`Eliminados ${deleted.result.n} usuarios.`);
  const inserted = await Usuario.insertMany([
    { name: 'admin', 
      email: 'admin@example.com',
      password: Usuario.hashPassword('1234') }
  ]);
  console.log(`Insertados ${inserted.length} usuarios.`);
}
 
);

