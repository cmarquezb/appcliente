var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
	req.getConnection(function(err,connection){
        var codigo = req.body.codigo;
        var registro={
            producto:req.body.producto,
            descripcion:req.body.descripcion,
            precio:req.body.precio
          };                       
        var query = connection.query('UPDATE productos set ? WHERE codigo = ?',[registro,codigo], function (err,rows){
            if (err)
                console.log("Error Selecting : %s ",err );            
            res.send('el producto fue dado actualizado');
            
        });  
    });  
});
module.exports = router;