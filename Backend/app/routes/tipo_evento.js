var mongoose = require('mongoose');
var Tipo_evento = mongoose.model('tipo_evento');
var router=require('express').Router()

//GET ALL
router.get('/', (req, res, next) => {
  Tipo_evento.find(function (err, result) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.json(result);
    }
  });
});

//GET ONE
router.get('/:id', (req, res, next) => {
  Tipo_evento.findOne({_id: req.params.id}, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } 
    if(result) {
      res.json(result);
    } else {
      res.send("Ningún Tipo de evento Encontrado");
    } 
  });
});

//CREATE
router.post('/', (req, res, next) => {
  let nombre=req.body.nombre;
  var tipo_eventoNuevo = new Tipo_evento({
      nombre: nombre
  })
  tipo_eventoNuevo.save((err) => {
    if(err){
      res.send(err);
    }
    else {
      res.send(tipo_eventoNuevo);
    }
  })
});
//UPDATE
router.put('/:id', (req, res, next) => {
  Tipo_evento.findOne({_id: req.params.id}, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } 
    else {
      result.nombre = req.body.nombre || result.nombre;
      result.save((err, result) => {
        if(err) {
          res.status(500).send(err)
        }
        else {
          res.status(200).send(result);
        }
      });
    }
  });
});

//DELETE ONE
router.delete('/:id', (req, res, next) => {
  Tipo_evento.findOne({_id: req.params.id}, function (err, result) {
    if (err) {
      res.status(500).send(err);
    }
    else if(result) {
      result.remove((err, deleteTipo_evento) => {
        if(err) {
          res.status(500).send(err);
        }
        res.status(200).send(deleteTipo_evento);
      })
    }
    else {
      res.send("No existe ese tipo de evento");
    }
  });
});


module.exports=router;