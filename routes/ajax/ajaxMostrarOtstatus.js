var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	req.getConnection(function(err,connection){
        var desc_status = req.query.term;        
        var sql = "SELECT Desc_Status AS value, Desc_Status AS label, idEstados AS value1 FROM estados WHERE Desc_Status LIKE '" +  desc_status + "%' order by  Desc_Status ASC";
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