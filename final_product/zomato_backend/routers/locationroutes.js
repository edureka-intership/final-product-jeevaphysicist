const express =require('express');
const location =require('../controllers/location');

const router =express.Router();

router.get('/',location.listoflocations);





module.exports = router ;