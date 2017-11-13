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
  Evento.findOne({id_evento: req.params.id}, function (err, result) {
    if (err) {
      res.status(200).send(err);
    } 
    if(result) {
      res.status(200).send(result);
      res.json(result);
    } else {
      res.status(200).send("Ningún Evento Encontrado");
    } 
  });
});

//CREATE
//NO ESTA FUNCIONANDO
router.post('/', (req, res, next) => {
  let fecha_horaNuevo = req.body.fecha_hora;
  let partidoNuevo = req.body.partido;
  let tipo_eventoNuevo = req.body.tipo_evento;
  var eventoNuevo = new Evento({
      fecha_hora: fecha_horaNuevo,
      partido: partidoNuevo,
      tipo_evento: tipo_eventoNuevo,
  });
  eventoNuevo.save();
  res.send("Evento agregado: " + eventoNuevo);
});

//UPDATE
//PRIMERO HACER ANDAR EL CREATE
router.put('/:id', (req, res, next) =>{
    let query = {"_id": req.params.id};
    let fecha_hora = req.body.fecha_hora;
    let partido = req.body.partido;
    let tipo_evento = req.body.tipo_evento;
    Evento.findOneAndUpdate(query, {$set: {fecha_hora: fecha_hora, partido:partido, tipo_evento:tipo_evento}},{new: true},function(err, team){
        if(err){
            res.send("Error");
        }
        else{
            res.send(Evento);                
        }
    });
})

//DELETE ONE
router.delete('/:id', (req, res, next) => {
  Evento.findOne({id_evento: req.params.id}, function (err, result) {
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