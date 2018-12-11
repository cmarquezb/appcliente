var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	req.getConnection(function(err,connection){
        
        var cod_OT = req.query.term;              
        var sql = "SELECT ot.idOT AS value1, ot.idOT AS label,";
            sql +=" ot.idResponsables AS value2, responsables.Nombres AS value22,";
            sql +=" ot.idArea AS value3, area.Desc_Area AS value33,";
            sql +=" ot.Estados_idEstados AS value4, estados.Desc_Status AS value44,";
            sql +=" ot.Equipos_idEquipos AS value5, equipos.Desc_Equipo AS value55,";
            sql +=" ot.Servicios_idServicios AS value6, servicios.Desc_Servicio AS value66," 
            sql +=" ot.Centro_idCentro AS value7, centro.Centro_Costo AS value77,";
            sql +=" ot.Clientes_idClientes AS value8, clientes.Nombres AS value88,";
            sql +=" ot.Fecha AS value9, ot.HES AS value10, ot.Valor AS value11, ot.Observacion AS value12";             
            sql +=" FROM clientes INNER JOIN (centro INNER JOIN (servicios INNER JOIN";
            sql +=" (equipos INNER JOIN (estados INNER JOIN (responsables INNER JOIN";
            sql +=" (area INNER JOIN ot ON area.idArea = ot.idArea) ON responsables.idResponsables";
            sql +=" = ot.idResponsables) ON estados.idEstados = ot.Estados_idEstados)";
            sql +=" ON equipos.idEquipos = ot.Equipos_idEquipos) ON servicios.idServicios = ot.Servicios_idServicios)";
            sql +=" ON centro.idCentro = ot.Centro_idCentro) ON clientes.idClientes = ot.Clientes_idClientes ";
		    sql +="WHERE CAST(ot.idOT AS CHAR) LIKE '" +  cod_OT + "%' order by  idOT ASC";

       // var sql = "SELECT idOT AS value, idOT AS label, idOT AS value1, idResponsables AS value2, idArea AS value3, Estados_idEstados AS value4, Equipos_idEquipos AS value5, 
       // Servicios_idServicios AS value6, Centro_idCentro AS value7, Clientes_idClientes AS value8, Fecha AS value9, HES AS value10, Valor AS value11, Observacio AS value12 FROM ot WHERE idOT  LIKE '" +  cod_OT + "%' order by  idOT ASC";
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