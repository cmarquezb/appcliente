var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	req.getConnection(function(err,connection){
        
        var cod_OT = req.query.term;              
        //var sql = "SELECT idOT AS value, idOT AS label, idOT AS value1, idResponsables AS value2, idArea AS value3, Estados_idEstados AS value4, Equipos_idEquipos AS value5, Servicios_idServicios AS value6, Centro_idCentro AS value7, Clientes_idClientes AS value8, Fecha AS value9, HES AS value10, Valor AS value11, Observacion AS value12 FROM ot WHERE CAST(`idOT` AS CHAR)  LIKE '" +  cod_OT + "%' order by  idOT ASC";
        var sql = "SELECT ot.idOT AS value1, ot.idOT AS label,";
            sql +=" ot.idResponsables AS value2, responsables.Nombres AS value22,";
            sql +=" ot.idArea AS value3, area.Desc_Area AS value33,";
            sql +=" ot.Estados_idEstados AS value4, estados.Desc_Status AS value44,";
            sql +=" ot.Equipos_idEquipos AS value5, equipos.Desc_Equipo AS value55,";
            sql +=" ot.Servicios_idServicios AS value6, servicios.Desc_Servicio AS value66,";
            sql +=" ot.Centro_idCentro AS value7, centro.Centro_Costo AS value77,";
            sql +=" ot.Clientes_idClientes AS value8, clientes.Nombres AS value88,";
            sql +=" ot.Fecha AS value9, ot.HES AS value10, ot.Valor AS value11, ot.Observacion AS value12  FROM ot"; 
            sql +=" INNER JOIN area on area.idArea=ot.idArea";
            sql +=" INNER JOIN centro on centro.idCentro=ot.Centro_idCentro";
            sql +=" INNER JOIN clientes on clientes.idClientes=ot.Clientes_idClientes";
            sql +=" INNER JOIN equipos ON equipos.idEquipos=ot.Equipos_idEquipos";
            sql +=" LEFT JOIN estados on estados.idEstados=ot.Estados_idEstados";
            sql +=" INNER JOIN responsables ON responsables.idResponsables = ot.idResponsables";
            sql +=" LEFT JOIN servicios on servicios.idServicios=ot.Servicios_idServicios";
            sql +=" WHERE CAST(`idOT` AS CHAR)  LIKE '" +  cod_OT + "%' order by  idOT ASC";
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