var express=require('express');
var con= require('./conectiondb/connection.js');
var router=express.Router();
var fs=require('fs');//nos permitira mover el archivo
// con.connect(function(err){
// 	if (err) console.log(err) ;
// 	console.log('conectado a Mysql! a routes');
// 	});

//sisreg.edu/home2/

router.get("/", function(req,res){
	res.render('home');
})

router.route("/estudiante")
	.get(function(req,res){
		var year;
		con.query('SELECT * FROM gestion',function(err,result2){
			if(err){ throw err;}
			year=result2;
		})
		con.query('SELECT * FROM cursos',function(err,result){
			if(err){ throw err;}
			res.render('persona/estudiante',{cursos:result,gestion:year})
		})
		
	})
	.post(function(req,res){
		var sql="INSERT INTO personas (nombres,paterno,materno,ci,direccion,telefono,genero,fecha_nac,user,pass) VALUE(?,?,?,?,?,?,?,?,?,?)"
		var sql2="INSERT INTO estudiantes (ci,id_curso) VALUES(?,?)"
		con.query(sql,[req.body.nomb,req.body.apep,req.body.apem,req.body.ci,req.body.dir,req.body.tel,req.body.optradio,req.body.fecha,req.body.user,req.body.pass],function(err,result){
			if(err){ throw err;}
			console.log('number of record table persona...'+result.affectedRows);
		})
		con.query(sql2,[req.body.ci,req.body.curso],function(err,result){
			if(err){ throw err;}
			console.log('number of record table estudiantes...'+result.affectedRows);
		})
		res.send('<h1>registrado exitosamente!</h1> <h1><a href="/home/estudiante"><<--volver atras</a></h1>'+req.body.curso)
	})
router.get("/lisest", function(req,res){
	con.query('SELECT nombres,paterno,materno,direccion,telefono,genero,fecha_nac,estudiantes.id_estudiante,estudiantes.ci,cursos.curso FROM personas,estudiantes,cursos WHERE personas.ci=estudiantes.ci && cursos.id_curso=estudiantes.id_curso', function(err, result){
			if(err){ throw err;}
			res.render('mostrar/listar_estud',{personas:result});			
			});
	//res.send("aqui se visualisara la lista de estudiantees registradors en el sistema");
})

router.route("/docente")
	.get(function(req,res){
		res.render('persona/docente')
	})
	.post(function(req,res){
		var sql="INSERT INTO personas (nombres,paterno,materno,ci,direccion,telefono,genero,fecha_nac,user,pass) VALUE(?,?,?,?,?,?,?,?,?,?)"
		var sql2="INSERT INTO docentes (ci) VALUES(?)"
		con.query(sql,[req.body.nomb,req.body.apep,req.body.apem,req.body.ci,req.body.dir,req.body.tel,req.body.optradio,req.body.fecha,req.body.user,req.body.pass],function(err,result){
			if(err){ throw err;}
			console.log('number of record table persona...'+result.affectedRows);
		})
		con.query(sql2,[req.body.ci],function(err,result){
			if(err){ throw err;}
			console.log('number of record table tutor...'+result.affectedRows);
		})
		res.send('<h1>registrado exitosamente!</h1> <h1><a href="/home"><<--volver atras</a></h1>')
	})
router.route("/tutor")
	.get(function(req,res){
		res.render('persona/tutor')
	})
	.post(function(req,res){
		var sql="INSERT INTO personas (nombres,paterno,materno,ci,direccion,telefono,genero,fecha_nac,user,pass) VALUE(?,?,?,?,?,?,?,?,?,?)"
		var sql2="INSERT INTO tutor (ci) VALUES(?)"
		con.query(sql,[req.body.nomb,req.body.apep,req.body.apem,req.body.ci,req.body.dir,req.body.tel,req.body.optradio,req.body.fecha,req.body.user,req.body.pass],function(err,result){
			if(err){ throw err;}
			console.log('number of record table persona...'+result.affectedRows);
		})
		con.query(sql2,[req.body.ci],function(err,result){
			if(err){ throw err;}
			console.log('number of record table tutor...'+result.affectedRows);
		})
		res.send('<h1>registrado exitosamente!</h1> <h1><a href="/home"><<--volver atras</a></h1>')
	})


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
router.route("/mostrar")
	.get(function (req,res) {
		var data={nombres:'miguel', apellidos:'condori', eda:23}
		con.query('SELECT nombres,paterno,materno,direccion,telefono,genero,fecha_nac,administrador.id_administrador,administrador.ci FROM personas,administrador WHERE personas.ci=administrador.ci', function(err, result){
			if(err){ throw err;}
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
//ruta para aignacion de materias a docente
router.route("/asigdoc")
	.get(function(req,res){
		// con.query('Select area from materias', function(err,result){
		// 	if(err){ throw err;}
		// 	res.render('asignacion/asignardoc',{materias:result});
		// })

		res.render('asignacion/buscardoc');
	})
	// .post(function(req,res){
	// 	var sql='Select * from personas where ci=?';
	// 	var sql2='Select area from materias';
	// 	var mat;
	// 	con.query(sql2, function(err,result2){
	// 	if(err){ throw err;} 
	// 	mate=result2;
	// 	})
	// 	con.query(sql,[req.body.doc], function(err,result){
	// 		if(err){ throw err;}
	// 		res.render('buscar',{docente:result,materias:mate});
	// 	})
	// })

router.get("/asigdoc/ci", function(req,res){
		var sql='Select * from personas where ci=?';
		var sql2='Select * from materias';
		var mat;
		con.query(sql2, function(err,result2){
		if(err){ throw err;} 
		mate=result2;
		})
		var valor=req.query.doc;

		con.query(sql,[valor], function(err,result){
			if(err){ throw err;}
			res.render('buscar',{docente:result,materias:mate});
		})
})
//guardar asignacion
router.post("/asigdoc/:id/save", function(req,res){
	res.send('fue asignado exitosamente!...');
	//realizar un insert en la tabla imparte
	//var sql='insert id_docente,mat1,mat2,mat3,mat4,mat5,id_gestion into imparte';
	//con.query(sql)
	console.log(req.body.seleccionado)
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