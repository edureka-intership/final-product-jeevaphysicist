const usercontroll = require('../controllers/Users');
const socialmediacontrolller =require("../controllers/socialmediauser");
const express = require('express');

const router = express.Router();


router.post('/signup',usercontroll.SignUp);
router.post('/login',usercontroll.Login);
router.post('/socialSignUp',socialmediacontrolller.socilMediaSignUp);
router.post('/socialLogin',socialmediacontrolller.socilMediaLogin);



module.exports = router;