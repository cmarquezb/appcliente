var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	req.getConnection(function(err,connection){
        var desc_resp = req.query.term;        
        var sql = "SELECT Nombres AS value, Nombres AS label, idResponsables AS value1 FROM responsables WHERE Nombres LIKE '" +  desc_resp + "%' order by  Nombres ASC";
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