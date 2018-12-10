var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	req.getConnection(function(err,connection){     
        var query = connection.query('SELECT * FROM area order by Desc_Area',function(err,rows)
        {           
            if(err)
                console.log("Error Selecting : %s ",err );
  			res.send(JSON.stringify(rows));				           
    });                
    });  
});

module.exports = router;
