'use strict';

console.log(0, $); //  jQuery

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
  }).fail(function(error) {
    // la peticion api fallo
    console.log(2, "error", error.status, error.statusText);
    alert(`Error ${error.status} ${error.statusText}`)
  }).always(function() {
    console.log(3, "complete");
  });

}
