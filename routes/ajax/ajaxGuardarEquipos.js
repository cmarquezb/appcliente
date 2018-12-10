var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
	req.getConnection(function(error,connection){       
        var registro={
            idEquipos:req.body.codigo,
            Desc_Equipo:req.body.descripcion            
          };                 
        var query = connection.query('INSERT INTO equipos set ?',registro, function (error,rows){
            if (error)
                console.log("Error Selecting : %s ",error );
            res.send('el producto fue dado de alta');            
        });  
    });  
});
module.exports = router;