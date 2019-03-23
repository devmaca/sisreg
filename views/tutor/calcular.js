'use strict';

console.log(0, $); //  jQuery
var lon= parseInt(document.getElementById("mitabla").rows.length);

for (let i=2; i<lon; i++){ //recorrer filas
  
    var x = parseInt(document.getElementById("mitabla").rows[i].cells[1].innerHTML);
    var x2 = parseInt(document.getElementById("mitabla").rows[i].cells[2].innerHTML);
    var x3 = parseInt(document.getElementById("mitabla").rows[i].cells[3].innerHTML);
    var x4 = parseInt(document.getElementById("mitabla").rows[i].cells[4].innerHTML);
    var x5 = document.getElementById("mitabla").rows[i].cells[5];
    // sacarPromedio(x,x2,x3,x4);
    if(!x){
    	x=0;
    }
    if(!x2){
    	x2=0;
    }
    if(!x3){
    	x3=0;
    }
    if(!x4){
    	x4=0;
    }
    if(!x5){
    	x5=0;
    }
   sacarPromedio(x, x2, x3, x4);
}

function sacarPromedio(n1,n2,n3,n4){
  var prom = (n1+n2+n3+n4)/4;
  x5.innerHTML = prom;
  console.log(prom)
}