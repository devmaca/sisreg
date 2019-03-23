let con= require('../../conectiondb/connection.js');


// objetos necesarios para  guardar datos
var rol={
  estud:'ESTUDIANTE',
  docen:'DOCENTE',
  tutor:'TUTOR',
  admin:'DIRECTOR'
}
var estado={
    a:'1',
    i:'0'
}

// get, se utiliza para obtener lista de registros
function estGet(req, res, next) {
  try {
    console.log('apiREST params', req.params);
    console.log('apiREST query', req.query);
    let sql = 'SELECT * FROM personas';
    con.query(sql,[], function(err,result) {
      if(err) {
        // Enviar error SQL
        console.error('ERR',err.message);
        res.status(500).send({
          finalizado: true,
          mensaje: 'get Error SQL',
        });
      } else {
        // Manipular resultados
        res.status(200).send({
          finalizado: true,
          mensaje: 'get OK',
          datos: result,
        });
      }
		});

  } catch(e) {
    console.log('ERROR', e);
    res.status(401).send({
      finalizado: true,
      mensaje: 'get Error',
    });
  }
}

// post, se utiliza para insertar nuevo registro
function estPost(req, res, next) {
  try {
    console.log('apiREST params', req.params);
    console.log('apiREST query', req.query);
    console.log('apiREST body', req.body);
    var msg = "ESTUDIANTE REGISTRADO EXITOSAMENTE!"
    if(req.body.nomb==""){
        msg = "no dejar en blanco";
      }
    let error = valEst(req.body);
    if (error) {
      console.log ("MENSAJES DE VALIDACIONES:");
      console.log(error)
      res.status(422).send({
        finalizado: true,
        mensaje: 'Campos imcompletos',
        error: error,
      });
      return;
    }
    // Si no hay errores se puede insertar los datos
    let sql="INSERT INTO personas (nombres,paterno,materno,ci,direccion,telefono,genero,fecha_nac,rol,estado) VALUE(?,?,?,?,?,?,?,?,?,?)"
		let sql2="INSERT INTO estudiantes (id_estudiante,rude,ci_tutor,id_curso) VALUES(?,?,?,?)"
    let sql4 = 'SELECT * FROM personas WHERE ci=?';
    let sql3="SELECT * FROM tutor WHERE ci=?"
    let fecha=req.body.dia+"-"+req.body.mes+"-"+req.body.aa;
    con.query(sql4,[req.body.ci], function(err,result2){
      if(!result2[0]){
        console.log('se puede guardar!!')
        con.query(sql3,[req.body.citut], function(err,result){ 
                if(err){throw err;}
                if(!result[0]){//no existe tutor
                  console.log('no existe')
                  res.status(200).send({
                    finalizado: true,
                    mensaje: 'no existe tutor',
                    datos: result[0],
                    dato2: req.body.citut,
                    ms:msg
                  });
                }else{//si existe tutor
                  console.log(result[0])
                  res.status(200).send({
                    finalizado: true,
                    mensaje: 'si existe tutor',
                    datos: result[0],
                    ms:msg
                  });
                }
        })
      }else{
              res.status(200).send({
                finalizado: true,
                mensaje: 'post ok',
                duplicado: result2[0],
                ms:'YA EXISTE UN CI CON ESE NUMERO INGRESE OTRO CI'
              });
      }
    })
    

  //   let a = con.query(sql,[req.body.nomb,req.body.apep,req.body.apem,req.body.ci,req.body.dir,req.body.tel,req.body.optradio,fecha,rol.estud,estado.a], function(err,result) {
		// 	if(err) {
  //       // Enviar error SQL
  //       console.error('ERR',err.message);
  //       res.status(500).send({
  //         finalizado: true,
  //         mensaje: 'post Error SQL',
  //       });
  //     } else {
  //       // Manipular resultados
  //       let idPer=result.insertId;
  //       console.log('id asignado a la persona :'+idPer);

        

  //         con.query(sql2,[idPer,req.body.rude,req.body.citut,req.body.curso],function(err,result2){
  //           if(err){ throw err;}
  //           //console.log('number of record table estudiantes...'+result.affectedRows);
  //           console.log('number of record table estudiantes...'+result.affectedRows+'Id asignada :'
  //           +idPer);
          
  //           res.status(200).send({
  //             finalizado: true,
  //             mensaje: 'post OK',
  //             ms:msg,
  //             datos: result
  //           });
  //         })
  //     }

		// });
  } catch(e) {
    console.log('ERROR', e);
    res.status(501).send({
      finalizado: true,
      mensaje: 'post Error',
    });
  }
}
function verificarTutor(citutor){
var ban=1;
let sql="SELECT * FROM tutor WHERE ci=?"
    con.query(sql,[citutor], function(err,result){ 
    if(err){throw err;}
    if(!result[0]){
      ban=0;
    }
      console.log(result[0])
  });

  console.log(ban);
  return ban;
}
// getId, se utiliza para obtener datos de un solo registro
function estGetId(req, res, next) {
  try {
    console.log('apiREST params', req.params);
    console.log('apiREST query', req.query);
    let sql = 'SELECT * FROM personas WHERE id_persona=?';
    con.query(sql,[req.params.id], function(err,result) {
      if(err) {
        // Enviar error SQL
        console.error('ERR',err.message);
        res.status(500).send({
          finalizado: true,
          mensaje: 'getId Error SQL',
        });
      } else {
        // Manipular resultados
        res.status(200).send({
          finalizado: true,
          mensaje: 'getId OK',
          datos: result,
        });
      }
		});

  } catch(e) {
    console.log('ERROR', e);
    res.status(501).send({
      finalizado: true,
      mensaje: 'getId Error',
    });
  }
}

// put, se utiliza para modificar un registro
function estPutId(req, res, next) {
  try {
    console.log('apiREST params', req.params);
    console.log('apiREST query', req.query);
    console.log('apiREST body', req.body);

    let sql = 'SELECT * FROM personas';
    con.query(sql,[], function(err,result) {
      if(err) {
        // Enviar error SQL
        console.error('ERR',err.message);
        res.status(500).send({
          finalizado: true,
          mensaje: 'put Error SQL',
        });
      } else {
        // Manipular resultados
        res.status(200).send({
          finalizado: true,
          mensaje: 'put OK',
          datos: result,
        });
      }
		});

  } catch(e) {
    console.log('ERROR', e);
    res.status(501).send({
      finalizado: true,
      mensaje: 'put Error',
    });
  }
}

// delete, se utiliza para eliminar un registro
function estDeleteId(req, res, next) {
  try {
    console.log('apiREST params', req.params);
    console.log('apiREST query', req.query);
    console.log('apiREST body', req.body);

    let sql = 'SELECT * FROM personas';
    con.query(sql,[], function(err,result) {
      if(err) {
        // Enviar error SQL
        console.error('ERR',err.message);
        res.status(500).send({
          finalizado: true,
          mensaje: 'delete Error SQL',
        });
      } else {
        // Manipular resultados
        res.status(200).send({
          finalizado: true,
          mensaje: 'delete OK',
          datos: result,
        });
      }
		});

  } catch(e) {
    console.log('ERROR', e);
    res.status(501).send({
      finalizado: true,
      mensaje: 'delete Error',
    });
  }
}
//para validar solo letras
function validarTexto(parametro){
  var patron = /^[a-zA-Z\s]*$/;
  if(parametro.search(patron)){
    return false;
  } else{
    return true;
  }
}
// Funciones utiles
function valEst(a){
	var ok = true;
  var msg = "Debes escribir algo en los campos:\n";
  var error=[];
	if(a.nomb==""){
		msg += "- nombre\n";
		error.push({text:'Porfavor escribe un nombre'})
		ok=false;
	} else if(validarTexto(a.nomb)== false){
    msg += "- nombre\n";
    error.push({text:'No se permiten numeros en el nombre del estudiante'})
    ok=false
  }
	if(a.apep==""){
		msg += "- apellido\n";
		error.push({text:'Por favor escribe un apellido'})
		ok = false;
	} else if(validarTexto(a.apep)== false){
    msg += "- nombre\n";
    error.push({text:'No se permiten numeros en el apellido paterno del estudiante'})
    ok=false
  }
	if(a.apem==""){
		msg += "- apellido\n";
		error.push({text:'Porfavor escribe un apellido'})
		ok=false;
	} else if(validarTexto(a.apem)== false){
    msg += "- nombre\n";
    error.push({text:'No se permiten numeros en el apellido materno del estudiante'})
    ok=false
  }
	if(a.ci==""){
		msg += "- ci\n";
		error.push({text:'Porfavor escriba numero de carnet'})
		ok=false;
	}
	if(a.dir==""){
		msg += "- direccion\n";
		error.push({text:'Porfavor escriba una direccion'})
		ok=false;
	}
	if(a.tel==""){
		msg += "- telefono\n";
		error.push({text:'Porfavor escribe un telefono'})
		ok=false;
	}
  if(a.optradio==null){
    msg += "- genero\n";
    error.push({text:'Seleccione una opcion en el campo genero'})
    ok=false;
  }
  if(a.rude==""){
    msg += "- RUDE\n";
    error.push({text:'Porfavor rellenar el campo RUDE del estudiante'})
    ok=false;
  }
  // if(a.user==""){
  //   msg += "- User\n";
  //   error.push({text:'Porfavor escriba un nombre de usuario para el usuario'})
  //   ok=false;
  // }
  // if(a.pass==""){
  //   msg += "- Pass\n";
  //   error.push({text:'Porfavor escriba unnombre deusuario para el usuario'})
  //   ok=false;
  // }
  
	if(ok == false){
    // console.log(msg)
    // console.log(ok);
    return a=error;
	}

}




module.exports.estudiantes = {
  estGet,
  estPost,
  estGetId,
  estPutId,
  estDeleteId,
};
