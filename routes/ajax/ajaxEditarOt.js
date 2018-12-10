var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {	       
    req.getConnection(function (err, connection) {               
        var codigo = req.body.codigo;       
        var data={          
            
            idResponsables: req.body.descripcion,
            idArea: req.body.descripcion,
            Estados_idEstados: req.body.descripcion,
            Equipos_idEquipos: req.body.descripcion,
            Servicios_idServicios: req.body.descripcion,
            Centro_idCentro: req.body.descripcion,
            Clientes_idClientes: req.body.descripcion,
            Fecha: req.body.descripcion,
            HES: req.body.descripcion,            
            Observacion : req.body.descripcion         
          };                              
        var query = connection.query("UPDATE ot set ? WHERE idOT = ?",[data, codigo], function (err,rows){
            if (err)
                console.log("Error Selecting : %s ",err );            
            res.send('el producto fue dado actualizado');            
        });  
    });  
});
module.exports = router;