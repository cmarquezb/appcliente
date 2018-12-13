$(document).ready(function(){ 
	cargar_all();			
})
			
function cargar_all(){
	var ruta=document.URL.split('/')[3];
	if (ruta == "Ot"){		
		var URL = document.URL.split('/')[3];		
		$.ajax({
			type: "GET", 
			url: URL,
			dataType: "json",
			"success":function(data){ 	}
		})	  
	}else if (ruta == "Clientes"){	
	var URL = document.URL.split('/')[3] + "/mostrar";		
	var formulario = "form_"+document.URL.split('/')[3]; //captura la URL a partir del 3er '/' 
	$.ajax({
		type: "GET", 
		url: URL,
		dataType: "json",
		"success":function(data){ 	  	
		var html = '';
			if(data.length > 0){								
				$.each( data, function( key, value ) {							
					html += '<tr>'					
					html += '<th class="col-xs-1 col-xs-offset-1"><h5>'+value.idClientes+'</h5></th>'					
					html += '<th class="col-xs-7 col-xs-offset-1"><h5>'+value.Nombres+'</h5></th>'						
					html += '<th class="col-xs-1 col-xs-offset-1"><button type="button" id="botones2" class="btn btn-primary btn-block right-block btn-sm" onclick="editarclie('+value.idClientes+','+'\''+value.Nombres+''+'\','+'\''+value.Giro+''+'\','+'\''+value.Direccion+''+'\','+'\''+value.Fono+''+'\','+'\''+value.celular+''+'\','+'\''+value.email+''+'\','+'\''+formulario+'\')">Editar</button></th>'
					html += '<th class="col-xs-1 col-xs-offset-1"><button type="button" id="botones2" class="btn btn-danger btn-block right-block btn-sm" onclick="eliminar('+value.idClientes+')">Eliminar</button></th>'		
					html +='</tr>'					  
				});																
			}
			if(html == '') html = '<tr><td colspan="3" align="center">No se encontraron registros..</td></tr>'
			$("#data tbody").html(html);
		}
		});
	}else{
	var URL = document.URL.split('/')[3] + "/mostrar";
	var formulario = "form_"+document.URL.split('/')[3]; //captura la URL a partir del 3er '/' 
	$.ajax({
		type: "GET", 
		url: URL,
		dataType: "json",
		"success":function(data){ 	  	
		var html = '';
			if(data.length > 0){
				var uno="";
				var dos="";				
					$.each( data, function( key, value ) {
						html += '<tr>'
						$.each( value, function( ky, val ) { //debo recorrer dentro del Json los campos del array
							if ( uno ==""){
								html += '<th colspan="1"><h5>'+val+'</h5></th>'
								uno=val;
							}else{
								html += '<th colspan="7"><h5>'+val+'</h5></th>'
								dos=val;
							}				
						}); 					
						html += '<th colspan="1"><button type="button" id="botones2" class="btn btn-primary btn-block right-block btn-sm" onclick="editar('+uno+','+'\''+dos+'\','+'\''+formulario+'\')">Editar</button></th>'
						html += '<th colspan="1"><button type="button" id="botones2" class="btn btn-danger btn-block right-block btn-sm" onclick="eliminar('+uno+')">Eliminar</button></th>'		
						html +='</tr>'	
						uno="";
						dos="";	  
					});																
			}
			if(html == '') html = '<tr><td colspan="3" align="center">No se encontraron registros..</td></tr>'
			$("#data tbody").html(html);
		}
		});
	}
}

function agregar(){		
	var formulario = "form_"+document.URL.split('/')[3];
	//formulario = formulario.toLowerCase();
	$('#'+formulario).toggle();
	$('#editar').hide();
	$('#guardar1').show();		
	$('#popupbox').show();
	$('#block').show();

}

function cancel(){
	var formulario = "form_"+document.URL.split('/')[3];
	$('#'+formulario).toggle();	
	$("#mensaje").hide();
}

function editar(codigo, desc, form_name){
	$('#'+form_name).toggle();
	$('#guardar1').hide();
	$('#editar').show();
	$("[id*=cod_]").val(codigo); //el valor mostrado estara en el id que contiene la palabra... "cod_" + lo que sea
	$("[id*=desc_]").val(desc); //el valor mostrado estara en el id que contiene la palabra... "desc_" + lo que sea
	$("[id*=cod_]").attr('readonly', true); //solo doy lectura del campo codigo
}

function actualizar(){
	
	var formulario = "form_"+document.URL.split('/')[3];
	//formulario = formulario.toLowerCase();
	var URL = "/"+ document.URL.split('/')[3] + "/editar";
	$.ajax({
		type: "POST",		
		url: URL,
		data: {
		  	codigo :  $("[id*=cod_]").val(),	
			descripcion : $("[id*=desc_]").val()
		},
		"success":function(data){
			$("[id*=cod_]").val('');
			$("[id*=desc_]").val('');
			$('#'+formulario).toggle();
			$("[id*=cod_]").attr('readonly', false);
			$('#mensaje').html(data);
			cargar_all();	
		}
	});
}
function eliminar(codigo){
	var URL = "/"+ document.URL.split('/')[3] + "/baja";	
	$.ajax({
			type: "POST",
			url: URL,
			data: {codigo: codigo },
			"success":function(data){	
			$('#mensaje').html(data);
			$('#mensaje').show();
			cargar_all();	
		}
	});		
}	
	
function guardar(){
	var URL = "/"+ document.URL.split('/')[3] + "/guardar";	
	var formulario = "form_"+document.URL.split('/')[3];	
	$.ajax({
		type: "POST",		
		url: URL,
		data: {
		  	codigo :  $("[id*=cod_]").val(),	
			descripcion : $("[id*=desc_]").val()
		},
		"success":function(data){
			$("[id*=cod_]").val('');
			$("[id*=desc_]").val('');
			$('#'+formulario).toggle();
			$('#mensaje').html(data);
			cargar_all();	
		}
	});
}	
	
function guardarclie(){
	var URL = "/"+ document.URL.split('/')[3] + "/guardar";	
	var formulario = "form_"+document.URL.split('/')[3];
	
	$.ajax({
		type: "POST",		
		url: URL,
		data: {
			idClientes:$('#cod_Clientes').val(),
			Nombres:$('#desc_clie').val(),
			Giro:$('#giro').val(),
			Direccion:$('#direccion').val(),
			Fono:$('#fono').val(),
			celular:$('#celular').val(),
			email:$('#email_clie').val()		  
		},
		"success":function(data){
			$('#cod_Clientes').val('');
			$('#desc_clie').val('');
			$('#giro').val('');
			$('#direccion').val('');
			$('#fono').val('');
			$('#celular').val('');
			$('#email_clie').val('');	
			$('#'+formulario).toggle();
			$('#mensaje').html(data);
			cargar_all();	
		}
	});
}	

function editarclie(idClientes, Nombres, Giro, Direccion, Fono, celular, email , form_name){
	$('#'+form_name).toggle();
	$('#guardar1').hide();
	$('#editar').show();
	$('#cod_Clientes').val(idClientes);
	$('#desc_clie').val(Nombres);
	$('#giro').val(Giro);
	$('#direccion').val(Direccion);
	$('#fono').val(Fono);
	$('#celular').val(celular);
	$('#email_clie').val(email);
	$('#cod_Clientes').attr('readonly', true);	
}

function actualizarclie(){
	
	var formulario = "form_"+document.URL.split('/')[3];
	//formulario = formulario.toLowerCase();
	var URL = "/"+ document.URL.split('/')[3] + "/editar";
	$.ajax({
		type: "POST",		
		url: URL,
		data: {
			idClientes:$('#cod_Clientes').val(),
			Nombres:$('#desc_clie').val(),
			Giro:$('#giro').val(),
			Direccion:$('#direccion').val(),
			Fono:$('#fono').val(),
			celular:$('#celular').val(),
			email:$('#email_clie').val()		  
		},
		"success":function(data){
			$('#cod_Clientes').val('');
			$('#desc_clie').val('');
			$('#giro').val('');
			$('#direccion').val('');
			$('#fono').val('');
			$('#celular').val('');
			$('#email_clie').val('');	
			$('#'+formulario).toggle();
			$('#cod_Clientes').attr('readonly', false);				
			$('#mensaje').html(data);
			cargar_all();	
		}
	});
}

function cancelclie(){
	var formulario = "form_"+document.URL.split('/')[3];
	if($('#cod_Clientes').attr("readonly"))
	{
		$('#cod_Clientes').attr('readonly', false);	
	}
	
	$('#cod_Clientes').val('');
	$('#desc_clie').val('');
	$('#giro').val('');
	$('#direccion').val('');
	$('#fono').val('');
	$('#celular').val('');
	$('#email_clie').val('');
	$('#provincia').val('');
	$('#cod_provincia').val('');
	$('#localidad').val('');
	$('#cod_localidad').val('');
	$('#cod_postal').val('');
	$('#'+formulario).toggle();	
	$("#mensaje").hide();
}

function guardarot(){
	var URL = "/"+ document.URL.split('/')[3] + "/guardar";	
	var formulario = "form_"+document.URL.split('/')[3];
	
	$.ajax({
		type: "POST",		
		url: URL,
		data: {
			idClientes:$('#cod_Clientes').val(),
			Nombres:$('#desc_clie').val(),
			Giro:$('#giro').val(),
			Direccion:$('#direccion').val(),
			Fono:$('#fono').val(),
			celular:$('#celular').val(),
			email:$('#email_clie').val()		  
		},
		"success":function(data){
			$('#cod_Clientes').val('');
			$('#desc_clie').val('');
			$('#giro').val('');
			$('#direccion').val('');
			$('#fono').val('');
			$('#celular').val('');
			$('#email_clie').val('');	
			$('#'+formulario).toggle();
			$('#mensaje').html(data);
			cargar_all();	
		}
	});
}	

function editarot(idClientes, Nombres, Giro, Direccion, Fono, celular, email , form_name){
	$('#'+form_name).toggle();
	$('#guardar1').hide();
	$('#editar').show();
	$('#cod_Clientes').val(idClientes);
	$('#desc_clie').val(Nombres);
	$('#giro').val(Giro);
	$('#direccion').val(Direccion);
	$('#fono').val(Fono);
	$('#celular').val(celular);
	$('#email_clie').val(email);
	$('#cod_Clientes').attr('readonly', true);	
}

function actualizarot(){
	
	var formulario = "form_"+document.URL.split('/')[3];
	//formulario = formulario.toLowerCase();
	var URL = "/"+ document.URL.split('/')[3] + "/editar";
	$.ajax({
		type: "POST",		
		url: URL,
		data: {
			idClientes:$('#cod_Clientes').val(),
			Nombres:$('#desc_clie').val(),
			Giro:$('#giro').val(),
			Direccion:$('#direccion').val(),
			Fono:$('#fono').val(),
			celular:$('#celular').val(),
			email:$('#email_clie').val()		  
		},
		"success":function(data){
			$('#cod_Clientes').val('');
			$('#desc_clie').val('');
			$('#giro').val('');
			$('#direccion').val('');
			$('#fono').val('');
			$('#celular').val('');
			$('#email_clie').val('');	
			$('#'+formulario).toggle();
			$('#cod_Clientes').attr('readonly', false);				
			$('#mensaje').html(data);
			cargar_all();	
		}
	});
}

function cancelot(){
	var formulario = "form_"+document.URL.split('/')[3];
	if($('#cod_Clientes').attr("readonly"))
	{
		$('#cod_Clientes').attr('readonly', false);	
	}
	
	$('#cod_Clientes').val('');
	$('#desc_clie').val('');
	$('#giro').val('');
	$('#direccion').val('');
	$('#fono').val('');
	$('#celular').val('');
	$('#email_clie').val('');
	$('#provincia').val('');
	$('#cod_provincia').val('');
	$('#localidad').val('');
	$('#cod_localidad').val('');
	$('#cod_postal').val('');
	$('#'+formulario).toggle();	
	$("#mensaje").hide();
}