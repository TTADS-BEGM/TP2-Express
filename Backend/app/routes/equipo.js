var router=require('express').Router()

router.get('/', (req, res, next) => {
  res.send("get equipos");
    //next();
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id
  res.send("get equipo:" + id);
    //next();
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

router.delete('/:id', (req, res, next) => {
  let id = req.params.id
  res.send("delete equipo:"+id);
    //next();
});

module.exports=router;
