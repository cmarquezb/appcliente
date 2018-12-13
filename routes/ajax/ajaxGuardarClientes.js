var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var smtpTransport = nodemailer.createTransport('smtps://cmarquez.borquez@gmail.com:TomasRoger456@smtp.gmail.com');

/* GET home page. */
router.post('/', function(req, res, next) {
	req.getConnection(function(error,connection){       
        var registro={                  
            idClientes  : req.body.idClientes,
			Nombres     : req.body.Nombres,
			Giro        : req.body.Giro,
			Direccion   : req.body.Direccion,
			Fono        : req.body.Fono,
			celular     : req.body.celular,
			email       : req.body.email      
          };                 
        var query = connection.query('INSERT INTO clientes set ?',registro, function (error,rows){
            if (error){
                console.log("Error Selecting : %s ",error );
            }else{
                smtpTransport.sendMail({
                    from: "cemb<cmarquez.borquez@gmail.com>", 
                    to: "cemb1 <cthan.mb@gmail.com>", // en esta sección debería ir req.body.email
                    subject: "Registro de clientes de Morris", 
                    text: "Sr: "+req.body.Nombres+" , ud. ha sido registrado como nuevo cliente" 
                }, function(error, response){
                    if(error){
                        console.log(error);
                    }else{
                        console.log("Message sent: " + response.message);
                    }
                });
                res.send('el producto fue dado de alta');  
            }          
        });  
    });  
});
module.exports = router;