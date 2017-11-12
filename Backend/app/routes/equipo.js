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
      res.status(200).send(err);
    } 
    if(result) {
      res.status(200).send(result);
      res.json(result);
    } else {
      res.status(200).send("Ningún Equipo Encontrado");
    } 
  });
});

router.post('/', (req, res, next) => {
  let id=req.body.id;
  let name=req.body.name;
  res.send("post equipo:"+id+" - name:"+name);
    //next();
});

router.put('/:id', (req, res, next) => {
  let id = req.params.id
  let name=req.body.name;
  res.send("put equipo:"+id+" - name:"+name);
    //next();
});

//DELETE ONE
router.delete('/:id', (req, res, next) => {
  Equipo.findOne({id_equipo: req.params.id}, function (err, result) {
    if (err) {
      res.status(200).send(err);
    }
    else if(result) {
      result.remove((err, deleteTipoElemento) => {
        if(err) {
          res.status(500).send(err);
        }
        res.status(200).send(deleteTipoElemento);
      })
    }
    else {
      res.send("No existe ese equipo");
    }
  });
});

module.exports=router;
