## Practica de Backend Avanzado

En primer lugar, npm install para instalar las dependencias.

--------

Para una mayor comodidad a la hora de trabajar con html, voy a modificar en el motor de vista, la posibilidad de poder trabajar con extesion htlm en lugar de ejs.

en app.js

app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

Ahora cambio las extensiones de las vistas de ejs a html


Internacionalización del frontend

Para ello utilizo la libreria i18n, npm i i18n

Creo archivo de configuracion global en la carpeta lib
i18nConfigure.js

Creo los diccionarios en json para el lenguaje inglés y español, que en principio son los idiomas disponibles para traducir

/locales

en.json
es.json

En el app.js, importo el archivo de configuración y llamo a la función init.

Modifico el header.html para incluir los lenguajes disponibles en la barra de navegación

Antes de lo que quiera traducir, como i18n esta en global, añado al principio de la línea

<%= __('texto a traducir') %>

---------

Arrancamos la base de datos

Ruta de mongo

bin/mongod --dbpath ./data/db --directoryperdb

---------

Creación de test e2e

Creo un directorio e2e

Instalo dependecias de supertest

npm i supertest

Creo en el package.json un script para ejecutar los test

"e2e": "cross-env LOG_FORMAT=nolog mocha **/*.e2e.js --recursive --watch --timeout 10000"

Instalo mockgoose para poder trabajar los test con una base de datos sin alterar la mía

npm i mockgoose

npm run e2e