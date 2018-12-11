var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var hbs = require('hbs');
var connection  = require('express-myconnection'); 
var mysql = require('mysql');

var indexRouter = require('./routes/index');
var AreaRouter = require('./routes/Area');
var CentroRouter = require('./routes/Centro');
var ClientesRouter = require('./routes/Clientes');
var EquiposRouter = require('./routes/Equipos');
var EstadosRouter = require('./routes/Estados');
var OtRouter = require('./routes/Ot');
var ResponsablesRouter = require('./routes/Responsables');
var ServiciosRouter = require('./routes/Servicios');
var SistemaRouter = require('./routes/Sistema');
var contactoRouter = require('./routes/contacto');
var logoutRouter = require('./routes/logout');

var usersRouter = require('./routes/users');

//llamados por ajax
var ajaxMostrarRouter = require('./routes/ajax/ajaxMostrar');
var ajaxGuardarRouter = require('./routes/ajax/ajaxGuardar');
var ajaxEditarRouter = require('./routes/ajax/ajaxEditar');

var ajaxMostrarAreaRouter = require('./routes/ajax/ajaxMostrarArea');
var ajaxGuardarAreaRouter = require('./routes/ajax/ajaxGuardarArea');
var ajaxEditarAreaRouter = require('./routes/ajax/ajaxEditarArea');
var ajaxBajaAreaRouter = require('./routes/ajax/ajaxBajaArea');

var ajaxMostrarCcostosRouter = require('./routes/ajax/ajaxMostrarCcostos');
var ajaxGuardarCcostosRouter = require('./routes/ajax/ajaxGuardarCcostos');
var ajaxEditarCcostosRouter = require('./routes/ajax/ajaxEditarCcostos');
var ajaxBajaCcostosRouter = require('./routes/ajax/ajaxBajaCcostos');

var ajaxMostrarClientesRouter = require('./routes/ajax/ajaxMostrarClientes');
var ajaxGuardarClientesRouter = require('./routes/ajax/ajaxGuardarClientes');
var ajaxEditarClientesRouter = require('./routes/ajax/ajaxEditarClientes');
var ajaxBajaClientesRouter = require('./routes/ajax/ajaxBajaClientes');
var ajaxClientesProvinciaRouter = require('./routes/ajax/ajaxClientesProvincia');
var ajaxClientesLocalidadRouter = require('./routes/ajax/ajaxClientesLocalidad');


var ajaxMostrarEquiposRouter = require('./routes/ajax/ajaxMostrarEquipos');
var ajaxGuardarEquiposRouter = require('./routes/ajax/ajaxGuardarEquipos');
var ajaxEditarEquiposRouter = require('./routes/ajax/ajaxEditarEquipos');
var ajaxBajaEquiposRouter = require('./routes/ajax/ajaxBajaEquipos');

var ajaxMostrarResponsablesRouter = require('./routes/ajax/ajaxMostrarResponsables');
var ajaxGuardarResponsablesRouter = require('./routes/ajax/ajaxGuardarResponsables');
var ajaxEditarResponsablesRouter = require('./routes/ajax/ajaxEditarResponsables');
var ajaxBajaResponsablesRouter = require('./routes/ajax/ajaxBajaResponsables');

var ajaxMostrarServiciosRouter = require('./routes/ajax/ajaxMostrarServicios');
var ajaxGuardarServiciosRouter = require('./routes/ajax/ajaxGuardarServicios');
var ajaxEditarServiciosRouter = require('./routes/ajax/ajaxEditarServicios');
var ajaxBajaServiciosRouter = require('./routes/ajax/ajaxBajaServicios');

var ajaxMostrarEstadosRouter = require('./routes/ajax/ajaxMostrarEstados');
var ajaxGuardarEstadosRouter = require('./routes/ajax/ajaxGuardarEstados');
var ajaxEditarEstadosRouter = require('./routes/ajax/ajaxEditarEstados');
var ajaxBajaEstadosRouter = require('./routes/ajax/ajaxBajaEstados');


var ajaxMostrarOtRouter = require('./routes/ajax/ajaxMostrarOt');
var ajaxMostrarOtccRouter = require('./routes/ajax/ajaxMostrarOtcc');
var ajaxMostrarOttsRouter = require('./routes/ajax/ajaxMostrarOtts');
var ajaxMostrarOtclieRouter = require('./routes/ajax/ajaxMostrarOtclie');
var ajaxMostrarOteqRouter = require('./routes/ajax/ajaxMostrarOteq');
var ajaxMostrarOtstatusRouter = require('./routes/ajax/ajaxMostrarOtstatus');

var app = express();

// view engine setup
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(session({secret: '123456', resave: true, saveUninitialized: true}));

hbs.registerPartials(__dirname + '/views/partials');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(
    
    connection(mysql,{
        
        host: '127.0.0.1',
        user: 'cmarquez',
        password : 'Gomitrof456',
        port : 3306, //port mysql
        database:'otmorris'

    },'pool') //or single

);

app.use('/', indexRouter);
app.use('/contacto', contactoRouter);
app.use('/Area', AreaRouter);
app.use('/Centro', CentroRouter);
app.use('/Clientes', ClientesRouter);
app.use('/Equipos', EquiposRouter);
app.use('/Estados', EstadosRouter);
app.use('/Ot',OtRouter);
app.use('/Responsables', ResponsablesRouter);
app.use('/Servicios', ServiciosRouter); 
app.use('/Sistema', SistemaRouter);
app.use('/users', usersRouter);

//llamados por ajax
app.use('/Area/mostrar', ajaxMostrarAreaRouter);
app.use('/Area/guardar', ajaxGuardarAreaRouter);
app.use('/Area/editar', ajaxEditarAreaRouter);
app.use('/Area/baja', ajaxBajaAreaRouter);

app.use('/Centro/mostrar', ajaxMostrarCcostosRouter);
app.use('/Centro/guardar', ajaxGuardarCcostosRouter);
app.use('/Centro/editar', ajaxEditarCcostosRouter);
app.use('/Centro/baja', ajaxBajaCcostosRouter);

app.use('/Clientes/mostrar', ajaxMostrarClientesRouter);
app.use('/Clientes/guardar', ajaxGuardarClientesRouter);
app.use('/Clientes/editar', ajaxEditarClientesRouter);
app.use('/Clientes/baja', ajaxBajaClientesRouter);

app.use('/Equipos/mostrar', ajaxMostrarEquiposRouter);
app.use('/Equipos/guardar', ajaxGuardarEquiposRouter);
app.use('/Equipos/editar', ajaxEditarEquiposRouter);
app.use('/Equipos/baja', ajaxBajaEquiposRouter);

app.use('/Responsables/mostrar', ajaxMostrarResponsablesRouter);
app.use('/Responsables/guardar', ajaxGuardarResponsablesRouter);
app.use('/Responsables/editar', ajaxEditarResponsablesRouter);
app.use('/Responsables/baja', ajaxBajaResponsablesRouter);

app.use('/Servicios/mostrar', ajaxMostrarServiciosRouter);
app.use('/Servicios/guardar', ajaxGuardarServiciosRouter);
app.use('/Servicios/editar', ajaxEditarServiciosRouter);
app.use('/Servicios/baja', ajaxBajaServiciosRouter);

app.use('/Estados/mostrar', ajaxMostrarEstadosRouter);
app.use('/Estados/guardar', ajaxGuardarEstadosRouter);
app.use('/Estados/editar', ajaxEditarEstadosRouter);
app.use('/Estados/baja', ajaxBajaEstadosRouter);

app.use('/Sistema/mostrar', ajaxMostrarRouter);
app.use('/Sistema/guardar', ajaxGuardarRouter);
app.use('/Sistema/editar', ajaxEditarRouter);
app.use('/Sistema/logout', logoutRouter);

app.use('/Combos', ajaxMostrarOtRouter);
app.use('/Comboscc', ajaxMostrarOtccRouter);
app.use('/Combosts', ajaxMostrarOttsRouter);
app.use('/Combosclie', ajaxMostrarOtclieRouter);
app.use('/Comboseq', ajaxMostrarOteqRouter);
app.use('/Combosstatus', ajaxMostrarOtstatusRouter);
app.use('/Combosprovincia', ajaxClientesProvinciaRouter);
app.use('/Comboslocalidad', ajaxClientesLocalidadRouter);


//app.use('/productos/eliminar', ajaxEliminarRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;