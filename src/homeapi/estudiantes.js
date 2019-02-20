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

    let sql = 'SELECT * FROM personas';
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
          datos: result,
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
    let sql = 'SELECT * FROM personas';
    con.query(sql,[], function(err,result) {
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

module.exports.estudiantes = {
  estGet,
  estPost,
  estGetId,
  estPutId,
  estDeleteId,
};
