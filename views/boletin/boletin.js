'use strict';

console.log(0, $); //  jQuery
var lon= parseInt(document.getElementById("mitabla").rows.length);

for (let i=2; i<lon; i++){ //recorrer filas
  
    var x = parseInt(document.getElementById("mitabla").rows[i].cells[1].innerHTML);
    var x2 = parseInt(document.getElementById("mitabla").rows[i].cells[2].innerHTML);
    var x3 = parseInt(document.getElementById("mitabla").rows[i].cells[3].innerHTML);
    var x4 = parseInt(document.getElementById("mitabla").rows[i].cells[4].innerHTML);
    var x5 = document.getElementById("mitabla").rows[i].cells[5];
    sacarPromedio(x,x2,x3,x4);
}

function sacarPromedio(n1,n2,n3,n4){
  var prom = (n1+n2+n3+n4)/4;
  x5.innerHTML = prom;
  console.log(prom)
}

// var x5 = document.getElementById("mitabla").rows[2].cells[5];
// x5.innerHTML = p;
// console.log(p);

function s(elemento, mensaje, tipo, noCerrar) {
  tipo = tipo || 'success';
  //let alertas = elemento.getElementsByClassName('alert alert-'+tipo);
  let cap=elemento.parentNode.getElementsByClassName('text-danger small pt-0 mt-0');
  console.log(cap.length)
  
  // if (alertas.length<1) {
    if (cap.length<1) {
    let alert = document.createElement('p');

    alert.innerHTML = mensaje;
    alert.setAttribute('id',elemento.name);
    alert.setAttribute('style','position:absolute; width:150%; left:10%; top:20;');
    alert.setAttribute('class','text-danger small pt-0 mt-0' )
    
    elemento.parentNode.append(alert);
    elemento.setAttribute('onkeydown',`borrarAlertas(this,'${tipo}')`);
  }
}




// Enviar por post y mostrar alerta
function enviarFormPostAlertas(idform) {
  let formObj = {};
  let form = jQuery(`#${idform}`);
  $.each(form.serializeArray(), function (i, input) {
    formObj[input.name] = input.value;
  });
  console.log('JSON', formObj);

  $.ajax({
    url: `api/docentes`,
    method: 'post', // get | post | put | delete
    data: formObj,
    headers: {
      authorization: 'JWT eyqweqweqweqweoqwiepiqwe='
    },
    xhrFields: {
      withCredentials: true
    }
  }).done(function(resp) {
    // la peticion api se realizo correctamente
    console.log(1, "success", resp);
    alert(resp.ms)

  }).fail(function(error) {
    // la peticion api fallo
    console.log(2, "error", error.status, error.responseJSON);
    let contenedorAlerta = document.getElementById('alertas-api');
    contenedorAlerta.innerHTML=""
    let conten=document.getElementById('form');
    if (contenedorAlerta) {
      if (error.responseJSON && error.responseJSON.mensaje) {

        //mostrarAlertaMultiple(contenedorAlerta, error.responseJSON.mensaje, 'info');
      }
      if (error.responseJSON && error.responseJSON.error && error.responseJSON.error.length) {
        error = error.responseJSON.error;
        validarCampos(conten);
        for (let i=0; i<error.length; i++) {
          // mostrarAlerta(conten, error[i].text, 'danger');
          
          // mostrarAlertaMultiple(contenedorAlerta, error[i].text, 'danger');
        }
      }
    }
  }).always(function() {
    console.log(3, "complete");
  });

}





