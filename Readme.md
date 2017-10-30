## Practica de Backend Avanzado

En primer lugar, npm install para instalar las dependencias.

--------

Para una mayor comodidad a la hora de trabajar con html, voy a modificar en el motor de vista, la posibilidad de poder trabajar con extesion htlm en lugar de ejs.

en app.js

app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

Ahora cambio las extensiones de las vistas de ejs a html

---------

Arrancamos la base de datos

Ruta de mongo

bin/mongod --dbpath ./data/db --directoryperdb

---------

Internacionalización del frontend

Para ello utilizo la libreria i18n, npm i i18n