var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	req.getConnection(function(err,connection){
        var desc_service = req.query.term;        
        var sql = "SELECT Desc_Servicio AS value, Desc_Servicio AS label, idServicios AS value1 FROM servicios WHERE Desc_Servicio LIKE '" +  desc_service + "%' order by  Desc_Servicio ASC";
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