var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
	req.getConnection(function(error,connection){       
        var registro={
            idOT                   :req.body.cod_OT,
            idResponsables         :req.body.id_resp,
            idArea                 :req.body.cod_area,
            Estados_idEstados      :req.body.cod_status,
            Equipos_idEquipos      :req.body.cod_equipo,
            Servicios_idServicios  :req.body.cod_service,
            Centro_idCentro        :req.body.cod_ccosto,
            Clientes_idClientes    :req.body.id_clie,
            Fecha                  :req.body.fec_OT,
            HES                    :req.body.cod_hes,
            Valor                  :req.body.cod_valor,
            Observacion            :req.body.cod_observac                       
          };                 
        var query = connection.query('INSERT INTO ot set ?',registro, function (error,rows){
            if (error)
                console.log("Error Selecting : %s ",error );
            res.send('el producto fue dado de alta');            
        });  
    });  
});
module.exports = router;