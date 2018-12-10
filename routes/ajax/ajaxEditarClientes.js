var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {	       
    req.getConnection(function (err, connection) {               
        var codigo = req.body.idClientes;       
        var data={             
			Nombres : req.body.Nombres,
			Giro : req.body.Giro,
			Direccion : req.body.Direccion,
			Fono : req.body.Fono,
			celular : req.body.celular,
			email : req.body.email                          
          };                              
        var query = connection.query("UPDATE clientes set ? WHERE idClientes = ?",[data, codigo], function (err,rows){
            if (err)
                console.log("Error Selecting : %s ",err );            
            res.send('el producto fue dado actualizado');            
        });  
    });  
});
module.exports = router;