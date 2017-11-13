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
  Tipo_evento.findOne({id_tipo_evento: req.params.id}, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } 
    if(result) {
      res.status(200).send(result);
      res.json(result);
    } else {
      res.status(200).send("Ningún Tipo de evento Encontrado");
    } 
  });
});

//CREATE
//NO ESTA FUNCIONANDO
router.post('/', (req, res, next) => {
  let nombreNuevo=req.body.nombre;
  var tipo_eventoNuevo = new Tipo_evento({
      nombre: nombreNuevo,
  });
  tipo_eventoNuevo.save();
  res.send("Tipo de evento agregado: " + tipo_eventoNuevo);
});

//UPDATE
//PRIMERO HACER ANDAR EL CREATE
router.put('/:id', (req, res, next) =>{
    let query = {"_id": req.params.id};
    let nombre = req.body.nombre;
    Tipo_evento.findOneAndUpdate(query, {$set: {nombre: nombre}},{new: true},function(err, team){
        if(err){
            res.send("Error");
        }
        else{
            res.send(Tipo_evento);                
        }
    });
})

//DELETE ONE
router.delete('/:id', (req, res, next) => {
  Tipo_evento.findOne({id_tipo_evento: req.params.id}, function (err, result) {
    if (err) {
      res.status(500).send(err);
    }
    else if(result) {
      result.remove((err, deleteTipoEvento) => {
        if(err) {
          res.status(500).send(err);
        }
        res.status(200).send(deleteTipoEvento);
      })
    }
    else {
      res.send("No existe ese Tipo de evento");
    }
  });
});

module.exports=router;