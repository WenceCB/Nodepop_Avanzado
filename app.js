var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');

// Cargo archivo de Configuración de i18n
const i18n = require('./lib/i18nConfigure')();

var app = express();

// Modifico el motor de vistas para poder trabajar con ficheros HTML
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Defino la liberia i18n para que actúe al ser llamada desde el request
app.use(i18n.init); 

// Defino donde tengo mis vistas cuando son llamadas

app.use('/', index);
app.use('/apiv1/anuncios', require('./routes/apiv1/anuncios'));
app.use('/apiv1/tags', require('./routes/apiv1/tags'));
app.use('/apiv1/filtrar', require('./routes/apiv1/filtrar'));
app.use('/apiv1/crear', require('./routes/apiv1/crear'));
app.get( '/login',  loginController.index);
app.post('/login',  loginController.post);


app.get('/public/stylesheets/css/bootstrap.min.css', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/stylesheets/css/', 'bootstrap.min.css'));
});

// Conexión a la base de datos

require('./lib/connectMongoose');
require('./models/Anuncio');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  
    if (err.array) { // validation error
      err.status = 422;
      const errInfo = err.array({ onlyFirstError: true })[0];
      err.message = isAPI(req) ?
        { message: 'Not valid', errors: err.mapped()}
        : `Not valid - ${errInfo.param} ${errInfo.msg}`;
    }
    res.status(err.status = 500); 
    
   
  
  
  
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    
    res.render('error');
  });
  
 
  
  module.exports = app;