var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
	req.getConnection(function(error,connection){
       
        var registro={
            producto:req.body.producto,
            descripcion:req.body.descripcion,
            precio:req.body.precio
          };
                   
        var query = connection.query('INSERT INTO productos set ?',registro, function (error,rows){
            if (error)
                console.log("Error Selecting : %s ",error );
            res.send('el producto fue dado de alta');
            
        });  
               
         //console.log(query.sql);
    });
  
});

module.exports = router;