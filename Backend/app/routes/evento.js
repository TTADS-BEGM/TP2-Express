var mongoose = require('mongoose');
var Evento = mongoose.model('evento');
var Partido = mongoose.model('partido');
var router=require('express').Router()

//GET ALL
router.get('/', (req, res, next) => {
  Evento.
    find().
    populate('tipo_evento').
    populate('partido').
    populate('equipo').
    exec(function (err, evento) {
      if (err) {
        res.send(err);
      }
      else if(!evento) {
        res.send("Ningún evento encontrado");
      }
      else {
        res.json(evento);
      }
    });
});

//GET ONE
router.get('/:id', (req, res, next) => {
  Evento.
    findOne({_id: req.params.id}).
    populate('tipo_evento').
    populate('partido').
    populate('equipo').
    exec(function (err, evento) {
      if (err) {
        res.send(err);
      }
      else if(!evento) {
        res.send("Ningún evento encontrado");
      }
      else {
        res.json(evento);
      }
    });
});

//CREATE
router.post('/', (req, res, next) => {
  let fecha_horaNuevo = req.body.fecha_hora;
  let partidoNuevo = req.body.partido;
  let tipo_eventoNuevo = req.body.tipo_evento;
  let equipoNuevo = req.body.equipo;
  var eventoNuevo = new Evento({
      fecha_hora: fecha_horaNuevo,
      partido: partidoNuevo,
      tipo_evento: tipo_eventoNuevo,
      equipo: equipoNuevo
  });
  eventoNuevo.save((err)=> {
    if(err){
      res.send(err);
    }
    else {
      Partido.findOne({_id: req.body.partido}, function(err, result){
        if(err){
          res.send(err);
        }
        else {
          result.eventos.push(eventoNuevo);
          result.save((err, resultado) => {
            if(err) {
              res.status(500).send(err)
            }
            else {
              res.send(eventoNuevo);
            }
          })
        }
      })
    }
  })
});

//UPDATE
router.put('/:id', (req, res, next) =>{
    Evento.findOne({_id: req.params.id},function(err, result){
      if (err) {
        res.status(500).send(err);
      } 
      else {
        result.fecha_hora = req.body.fecha_hora || result.fecha_hora;
        result.partido = req.body.partido || result.partido;
        result.tipo_evento = req.body.tipo_evento || result.tipo_evento;
        result.equipo = req.body.equipo || result.equipo;
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
})


//DELETE ONE
router.delete('/:id', (req, res, next) => {
  Evento.findOne({_id: req.params.id}, function (err, result) {
    if (err) {
      res.status(500).send(err);
    }
    else if(result) {                                                                                               
      result.remove((err, deleteEvento) => {
        if(err) {
          res.status(500).send(err);
        }
        res.status(200).send(deleteEvento);
      })
    }
    else {
      res.send("No existe ese Evento");
    }
  });
});

module.exports=router;                                                                                              