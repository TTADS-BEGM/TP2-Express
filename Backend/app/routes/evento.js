var mongoose = require('mongoose');
var Evento = mongoose.model('evento');
var router=require('express').Router()

//GET ALL
router.get('/', (req, res, next) => {
  Evento.find(function (err, result) {
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
  Evento.findOne({_id: req.params.id}, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } 
    if(result) {
      res.json(result);
    } else {
      res.send("Ningún Evento Encontrado");
    } 
  });
});

//CREATE
router.post('/', (req, res, next) => {
  let fecha_horaNuevo = req.body.fecha_hora;
  let partidoNuevo = req.body.partido;
  let tipo_eventoNuevo = req.body.tipo_evento;
  var eventoNuevo = new Evento({
      fecha_hora: fecha_horaNuevo,
      partido: partidoNuevo,
      tipo_evento: tipo_eventoNuevo,
  });
  eventoNuevo.save((err)=> {
    if(err){
      res.send(err);
    }else{
      res.send(eventoNuevo);
    }
  })
});

//UPDATE
//PRIMERO HACER ANDAR EL CREATE
router.put('/:id', (req, res, next) =>{
    Evento.findOne({_id: req.params.id},function(err, result){
      if (err) {
        res.status(500).send(err);
      } 
      else {
        result.fecha_hora = req.body.fecha_hora;
        result.partido = req.body.partido;
        result.tipo_evento = req.body.tipo_evento;
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