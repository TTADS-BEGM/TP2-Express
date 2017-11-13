var router=require('express').Router();

router.use('/api/clients', require('./client'));
router.use('/api/equipos', require('./equipo'));
router.use('/api/eventos', require('./evento'));

module.exports=router;