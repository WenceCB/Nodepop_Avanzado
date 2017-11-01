const request = require('supertest');
const mongoose = require('mongoose');

// Inicializamos mockgoose


const app = require('../app');

describe('Home', function() {
  let agent;
  before(async function() {//
    
    // limpiamos las definiciones de modelos y esquemas de mongoose
    mongoose.models = {};
    mongoose.modelSchemas = {};
    
    agent = request.agent(app);

  });

  // despues de cada test
  afterEach(function() {

  });

// Test para comprobar las llamadas a la API

  it('Should return 500 ', function(done) {
    agent
      .get('/apiv1')     
      .expect(500, done);
  })
  it('Should return 200 ', function(done) {
    agent
      .get('/apiv1/anuncios')     
      .expect(200, done);
  })
  
  it('Should return 200', function(done) {
    agent
      .get('/')
      .expect(404, done);
  })

}); 