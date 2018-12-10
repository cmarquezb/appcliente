var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	req.getConnection(function(err,connection){
        var desc_equipo = req.query.term;        
        var sql = "SELECT Desc_Equipo AS value, Desc_Equipo AS label, idEquipos AS value1 FROM equipos WHERE Desc_Equipo LIKE '" +  desc_equipo + "%' order by  Desc_Equipo ASC";
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