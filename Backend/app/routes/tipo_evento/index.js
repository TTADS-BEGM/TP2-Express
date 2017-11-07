'use strict';

var express = require('express');

var router = express.Router();
function createRouter(app) {

    var controller = require('./tipo_evento.controller')(app) ;
    router.get('/', controller.index);
    router.get('/:id', controller.get);
    router.delete('/:id', controller.deleteOne);
    router.put('/:id', controller.update);
    router.post('/', controller.create);
    return router;
}
module.exports = createRouter;
