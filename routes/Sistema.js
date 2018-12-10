var express = require('express');
var router = express.Router();
var session = require('./index');
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(session.user);
  if (session.user) {
    res.render('Sistema', { title: 'Express' });
  } else {
    res.render('index.hbs', { page_title: 'Login de usuarios',msj: 'Para acceder a este contenido tiene que estar logueado' });
  }
});

module.exports = router;