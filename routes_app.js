var express=require('express');
var con= require('./conectiondb/connection.js');
var router=express.Router();
var moment = require('moment');//manejador de fechas y horas
var fs=require('fs');//nos permitira mover el archivo
// con.connect(function(err){
// 	if (err) console.log(err) ;
// 	console.log('conectado a Mysql! a routes');
// 	});

//regaroma.com/home2/

router.get("/", function(req,res){
	res.render('home');
})
var idPer;
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

//registrar estudiante
router.route("/estudiante")
	.get(function(req,res){

		con.query('SELECT * FROM cursos',function(err,result){
			if(err){ throw err;}
			console.log('cursos :');
			console.log(result);
			res.render('persona/estudiante',{cursos:result})
		})

	})
	.post(function(req,res){
		var sql="INSERT INTO personas (nombres,paterno,materno,ci,direccion,telefono,genero,fecha_nac,user,pass,rol,estado) VALUE(?,?,?,?,?,?,?,?,?,?,?,?)"
		var sql2="INSERT INTO estudiantes (id_estudiante,rude,ci_tutor) VALUES(?,?,?)"
		var sql3="INSERT INTO estudiantecurso (id_estudiante,id_curso,gestion) VALUES(?,?,?)"
		var gestion=moment().format('YYYY');
		con.query(sql,[req.body.nomb,req.body.apep,req.body.apem,req.body.ci,req.body.dir,req.body.tel,req.body.optradio,req.body.fecha,req.body.user,req.body.pass,rol.estud,estado.a],function(err,result){
			if(err){ throw err;}
			//console.log('number of record table persona...'+result.affectedRows);
			idPer=result.insertId;
			console.log('id asignado a la persona :'+idPer);

			con.query(sql2,[idPer,req.body.rude,req.body.citut],function(err,result){
			if(err){ throw err;}
			//console.log('number of record table estudiantes...'+result.affectedRows);
			console.log('number of record table estudiantes...'+result.affectedRows+'Id asignada :'
				+idPer);
			})
			con.query(sql3,[idPer,req.body.curso,gestion],function(err,result){
			if(err){ throw err;}
			console.log('asignado a curso '+req.body.curso);
			})
		})


		res.send('<h1>registrado exitosamente!</h1> <h1><a href="/home/estudiante"><<--volver atras</a></h1>'+req.body.curso)
	})
//registrar docentes

router.route("/docente")
	.get(function(req,res){
		res.render('persona/docente')
	})
	.post(function(req,res){
		var sql="INSERT INTO personas (nombres,paterno,materno,ci,direccion,telefono,genero,fecha_nac,user,pass,rol,estado) VALUE(?,?,?,?,?,?,?,?,?,?,?,?)"
		var sql2="INSERT INTO docentes (id_docente) VALUES(?)"
		con.query(sql,[req.body.nomb,req.body.apep,req.body.apem,req.body.ci,req.body.dir,req.body.tel,req.body.optradio,req.body.fecha,req.body.user,req.body.pass,rol.docen,estado.a],function(err,result){
			if(err){ throw err;}
			idPer=result.insertId;
			console.log('number of record table persona...'+result.affectedRows);

			con.query(sql2,[idPer],function(err,result){
			if(err){ throw err;}
			console.log('numero de registros en tabla docente...'+result.affectedRows+' Id asignada :'
				+idPer);
		})
		})

		res.send('<h1>docente registrado exitosamente!</h1> <h1><a href="/home"><<--volver atras</a></h1>')
	})
//registrar  tutores
router.route("/tutor")
	.get(function(req,res){
		res.render('persona/tutor')
	})
	.post(function(req,res){
		var sql="INSERT INTO personas (nombres,paterno,materno,ci,direccion,telefono,genero,fecha_nac,user,pass,rol,estado) VALUE(?,?,?,?,?,?,?,?,?,?,?,?)"
		var sql2="INSERT INTO tutor (id_tutor,ci) VALUES(?,?)"
		con.query(sql,[req.body.nomb,req.body.apep,req.body.apem,req.body.ci,req.body.dir,req.body.tel,req.body.optradio,req.body.fecha,req.body.user,req.body.pass,rol.tutor,estado.a],function(err,result){
			if(err){ throw err;}
			idPer=result.insertId;
			console.log('number of record table persona...'+result.affectedRows);

			con.query(sql2,[idPer,req.body.ci],function(err,result){
			if(err){ throw err;}
			console.log('number of record table tutor...'+result.affectedRows+' Id asignada :'
				+idPer);
			})
		})

		res.send('<h1>registrado exitosamente!</h1> <h1><a href="/home"><<--volver atras</a></h1>')
	})
//registrar cursos
router.route("/curso")
	.get(function(req,res){
		var sql="SELECT * FROM cursos"
		con.query(sql,function(err,result){
			if(err){ throw err;}
			res.render('curso',{cursos:result})
		})

	})
	.post(function(req,res){
		var sql="INSERT INTO cursos (curso) VALUE(?)";
		var unir= req.body.nivel+" "+req.body.para;
		con.query(sql,[unir],function(err,result){
			if(err){throw err;}
			else{
				console.log('number of record in table cursos...'+result.affectedRows);
				res.redirect('/home/curso');
				}
		})

	})


router.get("/materias/:id/edit", function (req,res) {
	console.log(" la id extraida de la url es :"+req.params.id);
	var sqlid="SELECT * FROM materias WHERE id_materia=?";
	con.query(sqlid,[req.params.id], function(err,result){
		if(err){ throw err;}
		console.log(result);
		res.render('materia/edit',{materia:result});
	})
})


router.route("/materias/:id")
	.get(function(req,res){
		res.send("la id de materia es :"+req.params.title+" la materia es"+req.body.area);
	})
	.put(function(req,res){
		var sql="UPDATE materias SET area=? WHERE id_materia=?"
		con.query(sql,[req.body.area,req.params.id],function(err,result){
			if(err){ throw err;}
			console.log(result.affectedRows + " record(s) updated");
			res.redirect('/home/materias')
		})
	//	res.send("se modificara la materia con id: "+req.params.id+" la materia "+req.body.area);

	})
	.delete(function(req,res){
		var sql="DELETE FROM materias WHERE id_materia=?"
		con.query(sql,[req.params.id],function(err,result){
			if(err){ throw err;}
			console.log("Numeros de registros borrados: " + result.affectedRows);
			res.redirect('/home/materias');
		})
		//res.send("se borrara la materia con id: "+req.params.id);
	})
//registrar materias
router.route("/materias")
	.get(function(req,res){
		con.query('Select * from materias', function(err, result){
			if(err){ throw err;}
			console.log(result);
			 res.render('materias',{materias:result});

			});

	})
	.post(function(req,res){
		var sql = 'INSERT INTO materias (area) VALUES(?)';
		con.query(sql,[req.body.area], function(err, result){
			if(err){ throw err;}
			else{
			console.log(result);
			console.log('number of record...'+result.affectedRows);
			res.redirect('materias');
			}
			});
	})
	//registrar gestion
router.route("/gestion")
	.get(function(req,res){
		con.query('Select * from gestion', function(err, result){
			if(err){ throw err;}
			console.log(result);
			 res.render('gestion',{gestion:result});
			});
	})
	.post(function(req,res){
		var sql = 'INSERT INTO gestion (year) VALUES(?)';
		con.query(sql,[req.body.ges], function(err, result){
			if(err){ throw err;}
			else{
			console.log('number of record...'+result.affectedRows);
			res.redirect('gestion');
			}
			});
	})

// router.get("/mostrar",function(req,res){
// 	var data={nombres:'miguel', apellidos:'condori', eda:23}
// 		con.query('SELECT nombres,paterno,materno,direccion,telefono,genero,fecha_nac,administrador.id_administrador,administrador.ci FROM personas,administrador WHERE personas.ci=administrador.ci', function(err, result){
// 			if(err){ throw err;}
// 			console.log(result);
// 			res.render('mostrar/listar',{personas:result});
// 			});
// })
/*REST*/
//lista de tabla administradores
router.route("/lisadm")
	.get(function (req,res) {
		con.query('SELECT nombres,paterno,materno,direccion,telefono,genero,fecha_nac,administrador.id_administrador FROM personas,administrador WHERE personas.id_persona=administrador.id_administrador', function(err, result){
			if(err){ throw err;}
			console.log('*** lista administrador ***:');
			console.log(result);
			res.render('mostrar/listar',{personas:result});
			});
	})
	.post(function (req,res) {
		res.send('add the book');
	})
	.put(function (req,res) {
		res.send('update the book');
	})
	.delete(function (req,res) {
		res.send('remove the book');
	});
//listar tabla estudiantes
router.get("/lisest", function(req,res){
	var sql='SELECT personas.*,estudiantes.id_estudiante FROM personas,estudiantes WHERE personas.id_persona=estudiantes.id_estudiante && personas.estado=?';
	var activos='1';
	con.query(sql,[activos], function(err, result){
			if(err){ throw err;}
			console.log('*** lista estudiante ***:');
			console.log(result.length);
			res.render('mostrar/listar_estud',{personas:result});
			// res.send({estudiante:result})
			});
	//res.send("aqui se visualisara la lista de estudiantees registradors en el sistema");
})
/*editar datos de estudiante*/
router.get("/lisest/:id/edit", function(req,res){
	var sql='SELECT cursos.* FROM cursos,estudiantecurso WHERE estudiantecurso.id_curso=cursos.id_curso && estudiantecurso.id_estudiante=? '
	var sql2='SELECT * FROM personas WHERE id_persona=?';
	con.query(sql,[req.params.id], function(err, result){
			if(err){ throw err;}
			//res.render('mostrar/listar_estud',{personas:result});
		con.query(sql2,[req.params.id], function(err, result2){
		if(err){ throw err;}
		res.render('edit/estudiante',{curso:result,estudiante:result2});
		//res.send({curso:result,estudiante:result2});
		});

	});
	//res.send("aqui se visualisara la lista de estudiantees registradors en el sistema");
})
/*actualiza datos de estudiante*/
router.route("/lisest/:id")
	.get(function(req,res){
		res.send("la id de materia es :"+req.params.title+" la materia es"+req.body.area);
	})
	.put(function(req,res){
		var sql="UPDATE personas SET nombres=?, paterno=?, materno=?, direccion=?, telefono=?, fecha_nac=? WHERE id_persona=?"
		con.query(sql,[req.body.nomb,req.body.apep,req.body.apem,req.body.dir,req.body.tel,req.body.fecha,req.params.id],function(err,result){
			if(err){ throw err;}
			console.log(result.affectedRows + " record(s) updated");
			res.redirect('/home/lisest')
		})
	//	res.send("se modificara la materia con id: "+req.params.id+" la materia "+req.body.area);

	})
	.delete(function(req,res){
		var sql="UPDATE personas SET estado=? WHERE id_persona=? "
		var inactivo='0';
		con.query(sql,[inactivo,req.params.id],function(err,result){
			if(err){ throw err;}
			console.log("Numeros de registros borrados: " + result.affectedRows);
			res.redirect('/home/lisest');
		})
		//res.send("se borrara la materia con id: "+req.params.id);
	})


//listar tabla doxentes
router.get("/lisdoc", function(req,res){
	var sql='SELECT id_persona,nombres,paterno,materno,direccion,telefono,genero,fecha_nac,ci,docentes.id_docente FROM personas,docentes WHERE personas.id_persona=docentes.id_docente';
	con.query(sql, function(err, result){
			if(err){ throw err;}
			console.log('*** lista docente ***:');
			console.log(result);
			res.render('mostrar/listar_doc',{personas:result});
			});
	//res.send("aqui se visualisara la lista de estudiantees registradors en el sistema");
})
//listar tabla tutores
router.get("/listut", function(req,res){
	var sql='SELECT id_persona,nombres,paterno,materno,direccion,telefono,genero,fecha_nac,tutor.id_tutor FROM personas,tutor WHERE personas.id_persona=tutor.id_tutor';
	con.query(sql, function(err, result){
			if(err){ throw err;}
			console.log('***lista tutor *** :');
			console.log(result);
			res.render('mostrar/listar_tut',{personas:result});
			});
	//res.send("aqui se visualisara la lista de estudiantees registradors en el sistema");
})
//ruta para aignacion de materias a docente
router.route("/asigdoc")
	.get(function(req,res){
		res.render('asignacion/buscardoc');
	})
	.post(function(req,res){

	})
/*en esta ruta realiza la busqueda de usuario docente registrados
donde:
- comprueba si el valor insertado en el campo de texto es un docente
- comprueba si el usuario docente tiene materias asignadas
- comprueba si el usuario docente tiene cursos asignados
- envia los resultados de la consultas realizadas a la vista /asignardoc.pug
*/
router.get("/asigdoc/ci", function(req,res){
		var sql='Select docentes.*, personas.* from docentes,personas where docentes.id_docente=personas.id_persona && personas.ci=?';
		var sql2='Select * from materias';
		var sql3='SELECT imparte.materia,materias.area FROM imparte,materias WHERE imparte.id_docente=? && materias.id_materia=imparte.materia'
		var sql4='SELECT * FROM cursos';
		var sql5='SELECT cursos.*,docentecurso.* FROM cursos,docentecurso WHERE cursos.id_curso=docentecurso.id_curso && docentecurso.id_docente=?'
		var mate;
		var cur;
		var valor=req.query.doc;

		con.query(sql2, function(err,result2){
		if(err){ throw err;}
		mate=result2;
		con.query(sql4, function(err,result4){
			cur=result4;
		})
			con.query(sql,[valor], function(err,result){
				if(err){ throw err;}
				if(!result[0]){ res.send('<h1>Este usario no es docente!</h1> <h1><a href="/home/asigdoc/"><<--volver atras</a></h1>')}
				else{
				var id_persona=result[0].id_persona;
				con.query(sql3,[id_persona], function(err,result3){
					//console.log(result3);
					for (i=0;i<result3.length;i++){
						console.log(result3[i]);
					}
					console.log(result3.length);
					con.query(sql5,[id_persona], function(err,result5){
						res.render('asignacion/asignardoc',{docente:result,materias:mate,imparte:result3,cursos:cur,docur:result5});
					})
				})

				}
			})

		})
		//falta
		// con.query(sql3,[id_persona], function(err,result3){

		// })
})
//aqui se guardan los datos de las asignaciones de materias a docentes
router.post("/asigdoc/:id/save", function(req,res){

	var sql='INSERT INTO imparte (id_docente,materia,gestion) VALUE(?,?,?)'
	var mat=req.body.selec;
	var gestion=moment().format('YYYY');
	console.log(req.body.selec);

	for (const its of req.body.selec){
		console.log("valores de variable selec :"+its)

	con.query(sql,[req.params.id,its,gestion] ,function(err,result){
		if(err){ throw err;}
		//console.log(result);
	})
	}
	res.send('fue asignado exitosamente!...');
	for (const lib of mat){
		console.log(lib);}

})
router.post("/asigdoc/:id/savecurso", function(req,res){

	var sql='INSERT INTO docentecurso (id_docente,id_curso) VALUE(?,?)'
	console.log(req.body.selec2);

	for (const its of req.body.selec2){
		console.log("valores de variable selec :"+its)

	con.query(sql,[req.params.id,its] ,function(err,result){
		if(err){ throw err;}
		//console.log(result);
	})
	}
	res.send('fue asignado exitosamente!...');

})

router.route("/asigtut")
	.get(function(req,res){
		res.render('asignacion/asignartutor');
	})
	.post(function(req,res){

	})

module.exports=router;
