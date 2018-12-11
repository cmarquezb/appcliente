var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {	       
    req.getConnection(function (err, connection) {               
        var codigo = req.body.cod_OT;       
        var data={      
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
        var query = connection.query("UPDATE ot set ? WHERE idOT = ?",[data, codigo], function (err,rows){
            if (err)
                console.log("Error Selecting : %s ",err );            
            res.send('el producto fue dado actualizado');            
        });  
    });  
});
module.exports = router;