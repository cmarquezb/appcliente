var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	req.getConnection(function(err,connection){
        var desc_ccosto = req.query.term;        
        var sql = "SELECT Centro_Costo AS value, Centro_Costo AS label, idCentro AS value1 FROM centro WHERE Centro_Costo LIKE '" +  desc_ccosto + "%' order by  Centro_Costo ASC";
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