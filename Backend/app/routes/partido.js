var mongoose = require('mongoose');
var Partido = mongoose.model('partido');
var router=require('express').Router()

//GET ALL
router.get('/', (req, res, next) => {
  Partido.find(function (err, result) {
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
  Partido.findOne({_id: req.params.id}, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } 
    if(result) {
      res.json(result);
    } else {
      res.send("Ningún Partido Encontrado");
    } 
  });
});

//CREATE
router.post('/', (req, res, next) => {
  let fecha_hora=req.body.fecha_hora;
  let equipo_local =req.body.equipo_local;
  let equipo_visitante = req.body.equipo_visitante;
/*   let eventos = req.body.eventos;  SE AGREGAN DESPUES
 */  
  var partidoNuevo = new Partido({
      fecha_hora: fecha_hora,
      equipo_local: equipo_local,
      equipo_visitante: equipo_visitante
  })
  partidoNuevo.save((err) => {
    if(err){
      res.send(err);
    }
    else {
      res.send(partidoNuevo);
    }
  })
});

//UPDATE
router.put('/:id', (req, res, next) => {
  Partido.findOne({_id: req.params.id}, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } 
    else {
      result.fecha_hora = req.body.fecha_hora || result.fecha_hora;
      result.equipo_local = req.body.equipo_local || result.equipo_local;
      result.equipo_visitante = req.body.equipo_visitante || result.equipo_visitante;
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
  Partido.findOne({_id: req.params.id}, function (err, result) {
    if (err) {
      res.status(500).send(err);
    }
    else if(result) {
      result.remove((err, deletePartido) => {
        if(err) {
          res.status(500).send(err);
        }
        res.status(200).send(deletePartido);
      })
    }
    else {
      res.send("No existe ese Partido");
    }
  });
});

module.exports=router;