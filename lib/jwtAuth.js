'use strict';

const jwt = require('jsonwebtoken');

module.exports = function() { // devuelve un middleware que si no hay usuario responde con error
  return function(req, res, next) {
    const token = req.body.token || req.query.token || req.get('x-access-token');
    if (!token) {
      // redirigimos al login
      
      console.log('Error !!!! no hay token !!!!!!!!',error)
      next(err);
      return;
    }
    
    // Tengo token
    jwt.verify(token,process.env.JWT_SECRET, (err,decoded)=>{
      if (err){
        const error = new Error('No se ha podido Codificar el token');
        return next(error);
      }
      // Guardo el id del usuario en una variable que yo quiera en el el request, así el siguiente middleware puede usarlo/sabe quién es
      req.userId = decoded._id;
      next();
    })
  }
}