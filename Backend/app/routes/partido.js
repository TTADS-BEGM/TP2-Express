var mongoose = require('mongoose');
var Partido = mongoose.model('partido');
var router=require('express').Router()

//GET ALL
router.get('/', (req, res, next) => {
  Partido.
  find().
  populate('equipo_local').
  populate('equipo_visitante').
  populate({
    path: 'eventos',
    populate: { path: 'equipo' },
    
  }).
  populate({
    path: 'eventos',
    populate: { path: 'tipo_evento' }
  }).
  exec(function (err, partido) {
    if (err) {
      res.send(err);
    }
    else if(partido.length == 0) {
      res.send("Ningún partido encontrado");
    }
    else {
      res.json(partido);
    }
  });
});

//GET ALL ACTIVE GAMES
router.get('/active', (req, res, next) => {
  var today = new Date();
  Partido.
  where('fecha_hora').gt(today.getTime() - (6300000)).    //105*60*1000
  lt(today.getTime()).
  sort({fecha_hora: 'asc'}).
  populate('equipo_local').
  populate('equipo_visitante').
  populate({
    path: 'eventos',
    populate: { path: 'equipo' }   
  }).
  populate({
    path: 'eventos',
    populate: { path: 'tipo_evento' }
  })
  .exec(function (err, partido) {
    if (err) {
      res.send(err);
    }
    else if(partido.length == 0) {
      res.send("Ningún partido encontrado");
    }
    else {
      res.json(partido);
    }
  });
});

//GET ONE
router.get('/:id', (req, res, next) => {
  Partido.
    findOne({_id: req.params.id}).
    populate('equipo_local').
    populate('equipo_visitante').
    populate({
    path: 'eventos',
    populate: { path: 'equipo' },
    options: { sort: { fecha_hora: 'asc' }}
    }).
    populate({
      path: 'eventos',
      populate: { path: 'tipo_evento' },
      options: { sort: { fecha_hora: 'asc' }}
    }).
    exec(function (err, partido) {
      if (err) {
        res.send(err);
      }
      else if(partido == null) {
        res.send("Ningún partido encontrado");
      }
      else {
        res.json(partido);
      }
    });
});

//CREATE
router.post('/', (req, res, next) => {
  let fecha_hora=req.body.fecha_hora;
  let equipo_local =req.body.equipo_local;
  let equipo_visitante = req.body.equipo_visitante; 
  var partidoNuevo = new Partido({
      fecha_hora: fecha_hora,
      equipo_local: equipo_local,
      equipo_visitante: equipo_visitante
  })
  partidoNuevo.save((err, resultado) => {
    if(err){
      res.send(err);
    }
    else {
      res.send(resultado);
    }
  })
});

//UPDATE
router.put('/:id', (req, res, next) => {
  Partido.findOne({_id: req.params.id}, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } 
    else if (result) {
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
    else {
      res.send("El partido que desea modificar no existe");
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
      });
    }
    else {
      res.send("No existe ese Partido");
    }
  });
});

module.exports=router;