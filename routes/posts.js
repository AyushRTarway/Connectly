const express = require('express');
const router = express.Router();
const passport = require('passport');

const postcontrolller = require('../controllers/post_controller');

router.post('/create',passport.checkAuthentication,postcontrolller.create);
router.get('/destroy/:id',passport.checkAuthentication,postcontrolller.destroy);

 

module.exports = router;