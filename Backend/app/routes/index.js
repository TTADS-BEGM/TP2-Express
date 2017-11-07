
var express = require('express');
var errors = require('../../components/errors');

module.exports = function(app) {
  app.use('/api/tipo_evento', require('./tipo_evento/'));

// All undefined asset or api routes should return a 404
  app.route('/:url(api)/*')
  .get(errors[404]);

 // All other routes should redirect to the index.html
 app.route('/*')
   .get(errors[404]);

};