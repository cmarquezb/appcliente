var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
	req.getConnection(function(error,connection){       
        var registro={                  
            idClientes : req.body.idClientes,
			Nombres : req.body.Nombres,
			Giro : req.body.Giro,
			Direccion : req.body.Direccion,
			Fono : req.body.Fono,
			celular : req.body.celular,
			email : req.body.email      
          };                 
        var query = connection.query('INSERT INTO clientes set ?',registro, function (error,rows){
            if (error)
                console.log("Error Selecting : %s ",error );
            res.send('el producto fue dado de alta');            
        });  
    });  
});
module.exports = router;