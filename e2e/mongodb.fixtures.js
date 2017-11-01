
const mongoose = require('mongoose');
const Usuario = require('../models/Usuario');

module.exports.initUsuarios = async function () {
    await Usuario.deleteMany();
    await Usuario.insertMany([
        {name:'admin',
        email:'admin@example.com',
        password: Usuario.hashPassword('12334')}
    ]);
} 