var mysql=require('mysql');

var connection=mysql.createConnection({
    host: '159.65.245.55',
    user: 'root',
    password : 'Gomitrof456',
    port : 3306, //port mysql
    database:'otmorris'
});

connection.connect(function (error){
    if (error)
        console.log('Problemas de conexion con mysql');
    else
        console.log('se inicio conexion');
});


module.exports=connection;

