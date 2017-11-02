/* 'use strict';

module.exports = function() { // devuelve un middleware que si no hay usuario redirige al login
  return function(req, res, next) {
    if (!req.session.authUser) {
      // redirigimos al login
      console.log('Estoy dentro IF');
      res.redirect('/login');
      return;
    }
    console.log('Mirloncho');
    // el usuario está autenticado
    next();
  }
} */