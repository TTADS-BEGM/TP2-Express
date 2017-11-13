var mongoose = require('mongoose');
var Equipo = mongoose.model('equipo');
var router=require('express').Router()

//GET ALL
router.get('/', (req, res, next) => {
  Equipo.find(function (err, result) {
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
  Equipo.findOne({id_equipo: req.params.id}, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } 
    if(result) {
      res.status(200).send(result);
      res.json(result);
    } else {
      res.status(200).send("Ningún Equipo Encontrado");
    } 
  });
});

//CREATE
//NO ESTA FUNCIONANDO
router.post('/', (req, res, next) => {
  /* let nuevoEquipo = new Equipo(req.body);
  nuevoEquipo.save((err, createTipoEvento) => {
    if(err) {
      res.status(500).send(err)
    }
    res.status(200).send(createTipoEvento)
  }) */

  let nombreNuevo=req.body.nombre;
  var equipoNuevo = new Equipo({
      nombre: nombreNuevo,
  });
  equipoNuevo.save();
  res.send("Equipo agregado: " + equipoNuevo);
});

//UPDATE
//PRIMERO HACER ANDAR EL CREATE
router.put('/:id', (req, res, next) => {
  Equipo.findOne({id_equipo: req.params.id}, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } 
    else {
      result.id_equipo = req.body.id_equipo || result.id_equipo;
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
  Equipo.findOne({id_equipo: req.params.id}, function (err, result) {
    if (err) {
      res.status(200).send(err);
    }
    else if(result) {
      result.remove((err, deleteEquipo) => {
        if(err) {
          res.status(500).send(err);
        }
        res.status(200).send(deleteEquipo);
      })
    }
    else {
      res.send("No existe ese equipo");
    }
  });
});

module.exports=router;
