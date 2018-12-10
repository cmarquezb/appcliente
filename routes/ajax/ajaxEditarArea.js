var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {	       
    req.getConnection(function (err, connection) {               
        var codigo = req.body.codigo;       
        var data={           
            Desc_Area: req.body.descripcion          
          };                              
        var query = connection.query("UPDATE area set ? WHERE idArea = ?",[data, codigo], function (err,rows){
            if (err)
                console.log("Error Selecting : %s ",err );            
            res.send('el producto fue dado actualizado');            
        });  
    });  
});
module.exports = router;