var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
	req.getConnection(function(err,connection){
    var user = req.body.usuario;
    var pass = req.body.password;              
    var query = connection.query('SELECT * FROM usuario WHERE usuario = ? AND clave = ?',[user,pass],function(err,rows){
        if(err){
            console.log("Error Selecting : %s ",err );
            return;
        }
        if (rows.length == 0){
            res.render('index.hbs', { page_title: 'Login de usuarios',msj: 'Usuario inexistente, verifique los datos e ingrese nuevamente' });
        }else {
            //creamos las variables de session con los datos del formulario
            req.session.user=req.body.user;
            req.session.pass=req.body.pass;
            $('#menu').toggle();
            //$('#login').hide();
            res.render('./sistema');
        }             
    });  
    });  
});

module.exports = router;