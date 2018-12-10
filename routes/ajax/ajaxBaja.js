var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {	    
    req.getConnection(function (err, connection) {        
        var codigo = req.body.codigo;        
        var query = connection.query("DELETE FROM productos WHERE codigo = ? ",codigo, function(err, rows)
        {  
          if (err)
              console.log("Error inserting : %s ",err );         
          res.send('El producto fue dado de baja');          
        });            
    });  
});
module.exports = router;
