/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

  
  const Tipo_Evento = require("../../../models/tipo_evento");

// Get list of things
function createRouteConfigs(app) {
  var routeConfigs = {};
  routeConfigs.get = get;
  routeConfigs.index = index;
  routeConfigs.update = update;
  routeConfigs.deleteOne = deleteOne;
  routeConfigs.create = create;


    function deleteOne(req, res){
      Tipo_Evento.findOne({id_tipo_evento: req.params.id}, function (err, result) {
          if (err) {
            res.status(200).send(err)
          }
          else {
          result.remove((err, deleteTipoElemento) => {
            if(err) {
              res.status(500).send(err)
            }
            res.status(200).send(deleteTipoElemento)
          })
    };
    });
  }
    function get(req, res) {
        Tipo_Evento.findOne({id_tipo_evento: req.params.id}, function (err, result) {
          if (err) {
            res.status(200).send(err)
          } 
          if(result) {
            res.status(200).send(result)
            res.json(result) 
          } else {
            res.status(200).send("Ningún Tipo Evento Encontrado")
          } 
    });
    }

    function update(req, res) {
      Tipo_Evento.findOne({id_tipo_evento: req.params.id}, function (err, result) {
        if (err) {
          res.status(500).send(err);
        } else {
          result.id_tipo_evento = req.body.id || result.id_tipo_evento;
          result.nombre = req.body.nombre || result.nombre;

          result.save((err, result) => {
            if(err) {
              res.status(500).send(err)
            }
            res.status(200).send(result);
          });
        }
      })
  }

    function create(req, res) {
      let tipo_evento = new Tipo_Evento(req.body); 
      tipo_evento.save((err, createTipoEvento) => {
        if(err) {
          res.status(500).send(err)
        }
        res.status(200).send(createTipoEvento)
      })
    }

    function index(req, res) {
      Tipo_Evento.find(function (err, result) {
            if (err) {
              res.status(500).send(err)
            }
            else {
              res.status(200).send(result)
              res.json(result) 
            }
        });
      }
    return routeConfigs;
}

module.exports = createRouteConfigs;
