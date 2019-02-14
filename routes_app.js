var express=require('express');
var con= require('./conectiondb/connection.js');
var router=express.Router();
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
var rol1='ESTUDIANTE';
var rol2='DOCENTE';
var rol3='TUTOR';
var rol4='ADMINISTRADOR';
//registrar estudiante
router.route("/estudiante")
	.get(function(req,res){
		var year;
		con.query('SELECT * FROM gestion',function(err,result2){
			if(err){ throw err;}
			year=result2;
		})
		con.query('SELECT * FROM cursos',function(err,result){
			if(err){ throw err;}
			console.log('cursos :');
			console.log(result);
			res.render('persona/estudiante',{cursos:result,gestion:year})
		})
		
	})
	.post(function(req,res){
		var sql="INSERT INTO personas (nombres,paterno,materno,ci,direccion,telefono,genero,fecha_nac,user,pass) VALUE(?,?,?,?,?,?,?,?,?,?)"
		var sql2="INSERT INTO estudiantes (id_estudiante,id_curso) VALUES(?,?)"
		
		
		con.query(sql,[req.body.nomb,req.body.apep,req.body.apem,req.body.ci,req.body.dir,req.body.tel,req.body.optradio,req.body.fecha,req.body.user,req.body.pass],function(err,result){
			if(err){ throw err;}
			//console.log('number of record table persona...'+result.affectedRows);
			idPer=result.insertId;
			console.log('id asignado a la persona :'+idPer);

			con.query(sql2,[idPer,req.body.curso],function(err,result){
			if(err){ throw err;}
			//console.log('number of record table estudiantes...'+result.affectedRows);
			console.log('number of record table estudiantes...'+result.affectedRows+'Id asignada :'
				+idPer);
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
		var staet='1';
		con.query(sql,[req.body.nomb,req.body.apep,req.body.apem,req.body.ci,req.body.dir,req.body.tel,req.body.optradio,req.body.fecha,req.body.user,req.body.pass,rol2,staet],function(err,result){
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
		var sql="INSERT INTO personas (nombres,paterno,materno,ci,direccion,telefono,genero,fecha_nac,user,pass) VALUE(?,?,?,?,?,?,?,?,?,?)"
		var sql2="INSERT INTO tutor (id_tutor,ci) VALUES(??)"
		con.query(sql,[req.body.nomb,req.body.apep,req.body.apem,req.body.ci,req.body.dir,req.body.tel,req.body.optradio,req.body.fecha,req.body.user,req.body.pass],function(err,result){
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
	var sql='SELECT id_persona,nombres,paterno,materno,direccion,telefono,genero,fecha_nac,estudiantes.id_estudiante,estudiantes.ci,cursos.curso FROM personas,estudiantes,cursos WHERE personas.id_persona=estudiantes.id_estudiante && cursos.id_curso=estudiantes.id_curso';
	con.query(sql, function(err, result){
			if(err){ throw err;}
			console.log('*** lista estudiante ***:');
			console.log(result);
			res.render('mostrar/listar_estud',{personas:result});			
			});
	//res.send("aqui se visualisara la lista de estudiantees registradors en el sistema");
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
//muestra los valores encontrados en la busqueda de la tabla personas
router.get("/asigdoc/ci", function(req,res){
		var sql='Select * from personas where ci=?';
		var sql2='Select * from materias';
		var sql3='Select materia from imparte where id_docente=?'
		var mate;
		var valor=req.query.doc;
		con.query(sql2, function(err,result2){
		if(err){ throw err;} 
		mate=result2;
			con.query(sql,[valor], function(err,result){
				if(err){ throw err;}
				var id_persona=result[0].id_persona;
				con.query(sql3,[id_persona], function(err,result3){
					//console.log(result3);
					for (i=0;i<result3.length;i++){
						console.log(result3[i]);
					}  
					console.log(result3.length);
					res.render('asignacion/asignardoc',{docente:result,materias:mate,imparte:result3});

				})
			})

		})
		//falta
		// con.query(sql3,[id_persona], function(err,result3){

		// })
})
//aqui se guardan los datos de las asignaciones de materias a docentes
router.post("/asigdoc/:id/save", function(req,res){
	
	var sql='INSERT INTO imparte (id_docente,materia) VALUE(?,?)'
	var mat=req.body.selec;
	console.log(req.body.selec);

	for (const its of req.body.selec){
		console.log("valores de variable selec :"+its)
	
	con.query(sql,[req.params.id,its] ,function(err,result){
		if(err){ throw err;}
		//console.log(result);
	})
	}
	res.send('fue asignado exitosamente!...');
	for (const lib of mat){
		console.log(lib);}

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
router.route("/asigtut")
	.get(function(req,res){
		res.render('asignacion/asignartutor');
	})
	.post(function(req,res){

	})

module.exports=router;