const menu = require('../controllers/menu');
const express =require('express');

const router =express.Router();

router.get('/:rname',menu.getallmenuitems);

module.exports = router;