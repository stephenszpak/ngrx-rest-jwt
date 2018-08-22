const express = require('express');
const router = express.Router();
const CONFIG = require('../config/config');

const UserController = require('../users/user.controller');

router.get('/', function(req,res,next) {
  res.json({ status: "succss", message: "API", data: { "version_number": "v0.0.1"}})
})

//user auth

router.post('/users/authenticate', UserController.login);
router.post('/users/register', UserController.create);
router.get('/users', UserController.getAll);
router.get('/users/:id', UserController.getById);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.remove);

module.exports = router;
