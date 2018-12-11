var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	req.getConnection(function(err,connection){
        var desc_area = req.query.term;        
        var sql = "SELECT Desc_Area AS value, Desc_Area AS label, idArea AS value1 FROM area WHERE Desc_Area LIKE '" +  desc_area + "%' order by  Desc_Area ASC";
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