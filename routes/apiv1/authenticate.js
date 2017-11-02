'use strict';

const Usuario = require('../../models/Usuario');
const i18n = require('../../lib/i18nConfigure')();
const jwt = require('jsonwebtoken');

class LoginController {
  index(req, res, next) {   
    res.locals.email = 'admin@example.com'; // para que la vista tenga el email
    res.locals.error = '';
    res.render('login');
  }  

  // POST LoginJWT
  async postLoginJWT(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    // Hash de la password
    const hashedPassword = Usuario.hashPassword(password);

    const user = await Usuario.findOne({ email: email, password: hashedPassword });

    if (!user) {
      // Respondemos que no son válidas las credenciales      
      res.status(401).json({
        ok:false,
        error: 'Unauthorized'});  
      return;
    }

    // El usuario está y la password coincide, creamos token
    console.log('El user._id es ',user._id);
    jwt.sign({_id: user._id},      
      process.env.JWT_SECRET,
      {expiresIn:'1d'},
      (err,token) =>{
        if (err){          
          return next(err);
        }
      // Respondo con JWT
        res.json({
          ok:true,
          token: token
        })
       
        
    })     
  } 
}

module.exports = new LoginController();
