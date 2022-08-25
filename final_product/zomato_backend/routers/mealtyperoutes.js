const express =require('express');
const mealtyperoutes =require('../controllers/mealtype');
const router = express.Router();

router.get('/',mealtyperoutes.listofmealtypes);





module.exports =router;