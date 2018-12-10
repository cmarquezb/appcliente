var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
	req.getConnection(function(error,connection){       
        var registro={
            idArea:req.body.codigo,
            Desc_Area:req.body.descripcion            
          };                 
        var query = connection.query('INSERT INTO area set ?',registro, function (error,rows){
            if (error)
                console.log("Error Selecting : %s ",error );
            res.send('el producto fue dado de alta');            
        });  
    });  
});
module.exports = router;