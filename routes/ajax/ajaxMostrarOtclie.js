var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	req.getConnection(function(err,connection){
        var desc_clie = req.query.term;        
        var sql = "SELECT Nombres AS value, Nombres AS label, idClientes AS value1 FROM clientes WHERE Nombres LIKE '" +  desc_clie + "%' order by  Nombres ASC";
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