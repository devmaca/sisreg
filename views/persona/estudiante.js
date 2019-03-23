'use strict';

console.log(0, $); //  jQuery

/* Funcion para generar HTML de alertas
* elemento: Elemento HTML padre
* mensaje: Mensaje a mostrarse
* tipo: info, warning, danger, success. (success por defecto)
* noCerrar: true, false. NO mostrar boton ocultar mensaje. (false por defecto)
*/
function mostrarAlerta(elemento, mensaje, tipo, noCerrar) {
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
    alert.setAttribute('class','text-danger small pt-0 mt-0' )//+ (!noCerrar?'alert-dismissible':'') + ' fade show');
    // alert.setAttribute('role','alert');
    // if (!noCerrar) {
    //   let button = document.createElement('BUTTON');
    //   button.setAttribute('class','close');
    //   button.setAttribute('type','button');
    //   button.setAttribute('data-dismiss','alert');
    //   button.innerHTML = '<span aria-hidden="true">×</span>';
    //   alert.append(button);
    // }
    elemento.parentNode.append(alert);
    elemento.setAttribute('onkeydown',`borrarAlertas(this,'${tipo}')`);
  }
}

function mostrarAlertaMultiple(elemento, mensaje, tipo, noCerrar) {
  tipo = tipo || 'success';
  //let alertas = elemento.getElementsByClassName('alert alert-'+tipo);
  //if (alertas.length<1) {

    let alert = document.createElement('DIV');
    alert.innerHTML = mensaje;
    alert.setAttribute('id',elemento.name);
    alert.setAttribute('style','position:relative; width:75%; left:0;');
    alert.setAttribute('class','alert alert-'+tipo+' ' + (!noCerrar?'alert-dismissible':'') + ' fade show');
    alert.setAttribute('role','alert');
    if (!noCerrar) {
      let button = document.createElement('BUTTON');
      button.setAttribute('class','close');
      button.setAttribute('type','button');
      button.setAttribute('data-dismiss','alert');
      button.innerHTML = '<span aria-hidden="true">×</span>';
      alert.append(button);
    }
    elemento.append(alert);
  //}
}

function borrarAlertas(elemento, tipo) {
  // let alertas = elemento.parentNode.getElementsByClassName('alert alert-'+tipo);
  let alertas = elemento.parentNode.getElementsByClassName('text-danger small pt-0 mt-0');
  for (let i=0;i<alertas.length;i++) {
    elemento.parentNode.removeChild(alertas[i]);
  }
}
//funcion validar solo letras no numeros
function validarTexto(parametro){
  var patron = /^[a-zA-Z\s]*$/;
  if(parametro.search(patron)){
    return false;
  } else{
    return true;
  }
}
// Funcion para validar campos del formulario
function validarCampos(form) {
  // la variable form es el objeto formulario (nativo)
  let formValido = true;
  if (!form.nomb.value) {
    formValido = false;
    mostrarAlerta(form.nomb, 'Debes escribir un nombre.','warning');
  } else if(validarTexto(form.nomb.value)== false){
    mostrarAlerta(form.nomb, 'No se permite datos numericos en este campo', 'warning')
  }
  if (!form.apep.value) {
    formValido = false;
    mostrarAlerta(form.apep, 'Debes escribir por lo menos un apellido p.','warning');
  }
  if (!form.apem.value) {
    formValido = false;
    mostrarAlerta(form.apem, 'Debes escribir por lo menos un apellido m','warning');
  }
  if (!form.ci.value) {
    formValido = false;
    mostrarAlerta(form.ci, 'Debes escribir el numero cedula de identidad.','warning');
  }
  if (!form.tel.value) {
    formValido = false;
    mostrarAlerta(form.tel, 'Debes escribir el numero de telefono.','warning');
  }
  if (!form.dir.value) {
    formValido = false;
    mostrarAlerta(form.dir, 'Debes escribir una direccion.','warning');
  }
  // if (!form.optradio.value) {
  //   formValido = false;
  //   mostrarAlerta(form.optradio, 'Debes seleccionar una opcion.','warning');
  // }
  if (!form.rude.value) {
    formValido = false;
    mostrarAlerta(form.rude, 'Debes escribir un numero.','warning');
  }

  return formValido;
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
    url: `api/estudiantes`,
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
    
    if(!resp.duplicado){//si no hay duplicado
      alert(resp.ms)
      if(!resp.datos){//si no hay tutor
        console.log('no existe tutor')
        console.log(resp.dato2)
        alert(resp.mensaje)
        window.location.replace('http://localhost:3000/home/tutor/'+resp.dato2)

      }else{//si hay tutor
       console.log(resp.datos.ci);
       alert(resp.mensaje)
      }
    }else{//si hay duplicado
      alert(resp.ms);
    }
    

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



// Enviar por get
function enviarFormGet(idform) {
  let formObj = {};
  let form = jQuery(`#${idform}`);
  $.each(form.serializeArray(), function (i, input) {
    formObj[input.name] = input.value;
  });
  console.log('JSON', formObj);
  $.ajax({
    url: `api/estudiantes`,
    method: 'get', // get | post | put | delete
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
    $(`#datorecibido`).val(resp.mensaje);
  }).fail(function(error) {
    // la peticion api fallo
    console.log(2, "error", error.status, error.statusText);
    alert(`Error ${error.status} ${error.statusText}`)
  }).always(function() {
    console.log(3, "complete");
  });

}

// Enviar por post
// function enviarFormPost(idform) {
//   let formObj = {};
//   let form = jQuery(`#${idform}`);
//   $.each(form.serializeArray(), function (i, input) {
//     formObj[input.name] = input.value;
//   });
//   console.log('JSON', formObj);

//   $.ajax({
//     url: `api/estudiantes`,
//     method: 'post', // get | post | put | delete
//     data: formObj,
//     headers: {
//       authorization: 'JWT eyqweqweqweqweoqwiepiqwe='
//     },
//     xhrFields: {
//       withCredentials: true
//     }
//   }).done(function(resp) {
//     // la peticion api se realizo correctamente
//     console.log(1, "success", resp);
//     $(`#datorecibido`).val(resp.mensaje);
//     $( "<h2>" ).text( resp.ms ).appendTo( "body" );
//   }).fail(function(error) {
//     // la peticion api fallo
//     console.log(2, "error", error.status, error.statusText);
//     alert(`Error ${error.status} ${error.statusText}`)
//   }).always(function() {
//     console.log(3, "complete");
//   });

// }

// Enviar por get con id
function enviarFormGetId(idform, idregistro) {
  let formObj = {};
  let form = jQuery(`#${idform}`);
  $.each(form.serializeArray(), function (i, input) {
    formObj[input.name] = input.value;
  });
  console.log('JSON', formObj);
  $.ajax({
    url: `api/estudiantes/${idregistro}`,
    method: 'get', // get | post | put | delete
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
    $(`#datorecibido`).val(resp.mensaje);
  }).fail(function(error) {
    // la peticion api fallo
    console.log(2, "error", error.status, error.statusText);
    alert(`Error ${error.status} ${error.statusText}`)
  }).always(function() {
    console.log(3, "complete");
  });

}

// Enviar por put
function enviarFormPut(idform, idregistro) {
  let formObj = {};
  let form = jQuery(`#${idform}`);
  $.each(form.serializeArray(), function (i, input) {
    formObj[input.name] = input.value;
  });
  console.log('JSON', formObj);
  $.ajax({
    url: `api/estudiantes/${idregistro}`,
    method: 'put', // get | post | put | delete
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
    $(`#datorecibido`).val(resp.mensaje);
  }).fail(function(error) {
    // la peticion api fallo
    console.log(2, "error", error.status, error.statusText);
    alert(`Error ${error.status} ${error.statusText}`)
  }).always(function() {
    console.log(3, "complete");
  });

}

// Enviar por post
function enviarFormDelete(idform, idregistro) {
  let formObj = {};
  let form = jQuery(`#${idform}`);
  $.each(form.serializeArray(), function (i, input) {
    formObj[input.name] = input.value;
  });
  console.log('JSON', formObj);
  $.ajax({
    url: `api/estudiantes/${idregistro}`,
    method: 'delete', // get | post | put | delete
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
    $(`#datorecibido`).val(resp.mensaje);
  }).fail(function(error) {
    // la peticion api fallo
    console.log(2, "error", error.status, error.statusText);
    alert(`Error ${error.status} ${error.statusText}`)
  }).always(function() {
    console.log(3, "complete");
  });

}

//para validar campos numeros
document.getElementById('id_ci').addEventListener("keypress", soloNumeros, false);
document.getElementById('rude').addEventListener("keypress", soloNumeros, false);
document.getElementById('tel').addEventListener("keypress", soloNumeros, false);


//Solo permite introducir numeros.
function soloNumeros(e){
  var key = window.event ? e.which : e.keyCode;
  if (key < 48 || key > 57) {
    e.preventDefault();
  }
}




