var router=require('express').Router()
var Equipo = mongoose.model('equipo', equipoSchema );

router.get('/', (req, res, next) => {
  res.send("get equipos");
  
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id
  res.send("get equipo:" + id);
    //next();
});

router.post('/', (req, res, next) => {
  let id_equipo=req.body.id;
  let name=req.body.name;
  res.send("post equipo:"+id+" - nombre:"+name);
    //next();
  equipo.create({ nombre: nombre_equipo }, function (err, equipo) {
  if (err) return handleError(err);
});

router.put('/:id', (req, res, next) => {
  let id_equipo = req.params.id;
  let nombre_equipo=req.body.name;
  res.send("put equipo:"+id+" - nombre:"+name);
    //next();
  
});

});

router.delete('/:id', (req, res, next) => {
  let id = req.params.id
  res.send("delete equipo:"+id);
    //next();
});

module.exports=router;