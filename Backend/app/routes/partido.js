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
  Partido.findOne({id_partido: req.params.id}, function (err, result) {
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

  let fecha_horaNuevo=req.body.fecha_hora;
  let equipo_localNuevo=req.body.equipo_local;
  let equipo_visitanteNuevo=req.body.equipo_visitante;
  var partidoNuevo = new Partido({
      fecha_hora: fecha_horaNuevo,
      equipo_local: equipo_localNuevo,
      equipo_visitante: equipo_visitanteNuevo,
  });
  partidoNuevo.save();
  res.send("Partido agregado: " + partidoNuevo);
});

//UPDATE
//PRIMERO HACER ANDAR EL CREATE
router.put('/:id', (req, res, next) =>{
    let query = {"_id": req.params.id};
    let fecha_hora = req.body.fecha_hora;
    let equipo_local = req.body.equipo_local;
    let equipo_visitante = req.body.equipo_visitante;
    Partido.findOneAndUpdate(query, {$set: {fecha_hora: fecha_hora, equipo_local:equipo_local, equipo_visitante:equipo_visitante}},{new: true},function(err, team){
        if(err){
            res.send("Error");
        }
        else{
            res.send(Partido);                
        }
    });
})

//DELETE ONE
router.delete('/:id', (req, res, next) => {
  Partido.findOne({id_partido: req.params.id}, function (err, result) {
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