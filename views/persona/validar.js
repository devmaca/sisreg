'use strict';

function validarest(elemento) {

    /* recuerda declarar las variables con la sentencia `var` a menos que quieras
       utilizar más tarde estas variables a través del objeto window, lo que se
       conoce como ámbito global o "global scope" */

    var nombre = document.getElementById("nom").value;
    var telefono = document.getElementById("tel").value;
    // var email = document.getElementById("txtemail").value;
    // var estado = document.getElementById("txtestado").value;
    // var numero = document.getElementById("txtnumero").value;
    var direccion = document.getElementById("dir").value;
    // var tipo = document.getElementById("cmbtipo").value;

    /* las variables que tenías aquí no son necesarias, ya que podemos
       manejar la respuesta y los errores dentro del `if` */

    var exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(nombre =="" && telefono == "" && direccion) {

        /* si no pasa el filtro, aplicamos el borde al elemento. si sólo
           le aplicamos el color de borde no se mostrará el borde, ya que además
           del color, debemos decirle que debe tener un borde como tal. en un
           caso de uso real, lo ideal sería añadir una clase al elemento y, con
           css, aplicar los estilos necesarios */

        elemento.style.border = "solid 1px red";

        /* como a estas alturas ya sabemos que no se pasa el filtro podemos mostrar
           el mensaje de error directamente, sin necesidad de variables de control */

        alert('Error del formulario:\n Primero llena el formulario');

        // y finalmente detener el envío del formulario
        return false;
    }

    // pasa el filtro, se envía el formulario
    return true;
}