var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {     
    req.getConnection(function(err,connection){
        var localidad = req.query.term; 
        var cod_provincia = req.query.term2;
        var sql = "SELECT nombre AS value, nombre AS label, id AS value1, provincia_id AS value2, codigopostal AS value3 FROM localidad WHERE provincia_id = '" +  cod_provincia + "%' AND nombre LIKE '" +  localidad + "%' order by  nombre ASC";
        var query = connection.query(sql, function(err,rows)
        {            
            if(err)
                console.log("Error Selecting : %s ",err );
      console.log(rows);
  			res.send(JSON.stringify(rows));	           
    });
    });  
});
module.exports = router;