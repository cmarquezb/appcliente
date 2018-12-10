var express = require('express');
var router = express.Router();
var bd = require('./bd');

// GET home page. 
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function(req, res, next) {

  var user = req.body.usuario;
  var pass = req.body.password;
  bd.query('SELECT * FROM accesos WHERE User_2 = ? AND clave = ?',[user,pass],function(err,rows)
  {
      
      if(err){
        console.log("Error Selecting : %s ",err );
        return;
      }
      if (rows.length == 0){
        res.render('index.hbs', { page_title: 'Login de usuarios',msj: 'Usuario inexistente, verifique los datos e ingrese nuevamente' });
      }else {
        //creamos las variables de session con los datos del formulario
        req.session.user=req.body.usuario;
        req.session.pass=req.body.password;       
        res.render('./Sistema');
      } 
  });
});


module.exports = router;