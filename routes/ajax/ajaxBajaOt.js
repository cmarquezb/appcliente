var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {	    
    req.getConnection(function (err, connection) {        
        var codigo = req.body.cod_OT;             
        var query = connection.query("DELETE FROM ot WHERE idOT = ? ",codigo, function(err, rows)
        {  
          if (err)
              console.log("Error inserting : %s ",err );         
          res.send('El producto fue dado de baja');          
        });            
    });  
});
module.exports = router;
