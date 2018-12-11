var mysql=require('mysql');

var connection=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : '',
    port : 3306, //port mysql
    database:'otmorris'
});

connection.connect(function (error){
    if (error)
        console.log('Problemas de conexion con mysql : ' + error);
    else
        console.log('se inicio conexion');
});


module.exports=connection;

