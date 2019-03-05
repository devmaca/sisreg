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
  let alertas = elemento.getElementsByClassName('alert alert-'+tipo);
  if (alertas.length<1) {
    let alert = document.createElement('DIV');
    alert.innerHTML = mensaje;
    alert.setAttribute('id',elemento.name);
    alert.setAttribute('style','position:absolute; width:75%; left:23%; top:0;');
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
    elemento.parentNode.append(alert);
    elemento.setAttribute('onClick',`borrarAlertas(this,'${tipo}')`);
  }
}

function borrarAlertas(elemento, tipo) {
  let alertas = elemento.parentNode.getElementsByClassName('alert alert-'+tipo);
  for (let i=0;i<alertas.length;i++) {
    elemento.parentNode.removeChild(alertas[i]);
  }
}

// Funcion para validar campos del formulario
function validarCampos(form) {
  // la variable form es el objeto formulario (nativo)
  let formValido = true;
  if (!form.nomb.value) {
    formValido = false;
    mostrarAlerta(form.nomb, 'Debes escribir un nombre.','warning');
  }
  if (!form.apep.value && !form.apem.value) {
    formValido = false;
    mostrarAlerta(form.apep, 'Debes escribir por lo menos un apellido.','warning');
    mostrarAlerta(form.apem, 'Debes escribir por lo menos un apellido.','warning');
  }
  if (!form.ci.value) {
    formValido = false;
    mostrarAlerta(form.ci, 'Debes escribir el numero cedula de identidad.','warning');
  }
  if (!form.tel.value) {
    formValido = false;
    mostrarAlerta(form.tel, 'Debes escribir el numero de telefono.','warning');
  }
  if (!form.user.value) {
    formValido = false;
    mostrarAlerta(form.user, 'Debes escribir el nombre de usuario.','danger');
  }
  if (!form.pass.value) {
    formValido = false;
    mostrarAlerta(form.pass, 'Debes escribir una contraseña segura!.','danger', true);
  }
  return formValido;
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
function enviarFormPost(idform) {
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
    $(`#datorecibido`).val(resp.mensaje);
    $( "<h2>" ).text( resp.ms ).appendTo( "body" );
  }).fail(function(error) {
    // la peticion api fallo
    console.log(2, "error", error.status, error.statusText);
    alert(`Error ${error.status} ${error.statusText}`)
  }).always(function() {
    console.log(3, "complete");
  });

}

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
