
var router=require('express').Router();

router.use('/api/clients', require('./client'));

module.exports=router;
