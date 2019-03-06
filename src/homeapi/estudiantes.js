let con= require('../../conectiondb/connection.js');

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
    var msg = ""
    if(req.body.nomb==""){
        msg = "no dejar en blanco";
      }
    let error = valEst(req.body);
    if (error) {
      res.status(422).send({
        finalizado: true,
        mensaje: 'Campos imcompletos',
        error: error,
      });
      return;
    }
    // Si no hay errores se puede insertar los datos
    let sql="INSERT INTO personas (nombres,paterno,materno,ci,direccion,telefono,genero,fecha_nac,user,pass,rol,estado) VALUE(?,?,?,?,?,?,?,?,?,?,?,?)"
		let sql2="INSERT INTO estudiantes (id_estudiante,rude,ci_tutor,id_curso) VALUES(?,?,?,?)"
    sql = 'SELECT * FROM personas';
    //let sql = 'INSERT INTO personas (nombres,paterno,materno,ci,direccion,telefono,genero,fecha_nac,user,pass,rol,estado) VALUE(?,?,?,?,?,?,?,?,?,?,?,?)'
    let a = con.query(sql,[], function(err,result) {
			if(err) {
        // Enviar error SQL
        console.error('ERR',err.message);
        res.status(500).send({
          finalizado: true,
          mensaje: 'post Error SQL',
        });
      } else {
        // Manipular resultados
        res.status(200).send({
          finalizado: true,
          mensaje: 'post OK',
          ms:msg,
          datos: result
        });
      }

		});
  } catch(e) {
    console.log('ERROR', e);
    res.status(501).send({
      finalizado: true,
      mensaje: 'post Error',
    });
  }
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


// Funciones utiles
function valEst(a){
	var ok = true;
  var msg = "Debes escribir algo en los campos:\n";
  var error=[];
	if(a.nomb==""){
		msg += "- nombre\n";
		error.push({text:'Porfavor escribe un nombre'})
		ok=false;
	}
	if(a.apep==""){
		msg += "- apellido\n";
		error.push({text:'Por favor escribe un apellido'})
		ok = false;
	}
	if(a.apem==""){
		msg += "- apellido\n";
		error.push({text:'Porfavor escribe un apellido'})
		ok=false;
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
