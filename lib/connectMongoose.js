"use strict";

const mongoose = require('mongoose');

const conn = mongoose.connection;

conn.on('error', (err) => {
    console.log('Error de conexión ', err);
    process.exit(1);
});

// Si uso on salta cada vez que reconecto, si uso once reconecta solo

conn.once('open', () =>{
    console.log('Conectado a MongoDB');    
})

// La cadena de conexión es como una URL pero con protocolo mongodb

mongoose.connect('mongodb://localhost/nodepop');

// exporto la conexión para poder usarla en el script de Inicio de base de datos

