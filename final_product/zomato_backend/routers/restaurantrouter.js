const express = require('express');
const rest = require('../controllers/REATAURANT')
const router = express.Router();




router.get('',rest.listofrestaurants);
router.get('/:city',rest.listonlycityid);
router.get('/details/:rname',rest.listonlyname);
router.get('',rest.listitems);
router.post('/filter/:pageNo',rest.filter)





module.exports = router;