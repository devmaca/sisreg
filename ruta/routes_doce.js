var express=require('express');
var con= require('../conectiondb/connection.js');
var router=express.Router();

//regaroma.com/doce
router.get('/', function(req,res){
	res.render('doce');
})
// para ver datos personales del usuario
router.get('/ver', function(req,res){
	var sql='SELECT * FROM personas WHERE id_persona=?'
	con.query(sql,[req.session.usuario], function(err,result){
		res.render('usuario/mostrar',{persona:result})
		// res.send({persona:result});
	})
	
})
/*para cambiar contrasena*/

router.get("/ver/:id/edit", function (req,res) {

	res.render('usuario/edit',{persona:req.params.id});
	// res.send({persona:req.params.id})	
	
})
router.route("/ver/:id")
	.get(function (req,res) {
		res.send("tus password ha sido modificado con exito!!")
	})
	.put(function (req,res){
		var sql="UPDATE personas SET pass=? WHERE id_persona=?"
		con.query(sql,[req.body.pass,req.params.id],function(err,result){
			if(err){ throw err;}
			console.log(result.affectedRows + " record(s) updated");
			res.redirect('/doce/ver')
		})
		// res.send(req.params.id)
	})

router.get("/ver/:id/edit", function (req,res) {

	res.render('usuario/edit',{persona:req.params.id});
	// res.send({persona:req.params.id})	
	
})
// conductas

router.route("/conductas")
	.get(function(req,res){
		// con.query('Select * from materias', function(err, result){
		// 	if(err){ throw err;}
		// 	console.log(result);
		// 	 res.render('materias',{materias:result});

		// 	});
		res.render("conductas/ver_conducta")
		
	})
	.post(function(req,res){
		// var sql = 'INSERT INTO materias (area) VALUES(?)';
		// con.query(sql,[req.body.area], function(err, result){
		// 	if(err){ throw err;}
		// 	else{
		// 	console.log(result);
		// 	console.log('number of record...'+result.affectedRows);
		// 	res.redirect('materias');	
		// 	}		
		// 	});
	})
router.route("/horarios")
	.get(function(req,res){
		// con.query('Select * from materias', function(err, result){
		// 	if(err){ throw err;}
		// 	console.log(result);
		// 	 res.render('materias',{materias:result});

		// 	});
		res.render("horarios/ver_horarios")
		
	})
	.post(function(req,res){
		// var sql = 'INSERT INTO materias (area) VALUES(?)';
		// con.query(sql,[req.body.area], function(err, result){
		// 	if(err){ throw err;}
		// 	else{
		// 	console.log(result);
		// 	console.log('number of record...'+result.affectedRows);
		// 	res.redirect('materias');	
		// 	}		
		// 	});
	})

router.get('/mismaterias', function(req,res){
	var sql='select materias.* from imparte,materias where imparte.id_docente=? && materias.id_materia=imparte.materia'
	con.query(sql,[req.session.usuario], function(err,result){
		res.render('mostrar/listar_materias',{materias:result})
	})
})
/*mostrar materias del docente*/
router.get("/mostrar/:id", function (req,res) {
	
	var sql='SELECT * FROM materias WHERE id_materia=?';
	var sqlid="SELECT * FROM cursos,docentecurso WHERE docentecurso.id_curso=cursos.id_curso && docentecurso.id_docente=?";
	con.query(sql,[req.params.id], function(err,result){
		if(err){ throw err;}
	
		con.query(sqlid,[req.session.usuario], function(err,result2){
			if(err){ throw err;}
			console.log(result);
			res.render('mostrar/list_curso_doc',{curso:result2,materia:result});	
		})

	})
})
/*mostrar estudiantes de cursos
	el parametro :id es la id de la materia
	el parametro :id2 es la id del curso*/
const arr=[];	
router.route("/mostrar/:id/:id2")
	.get(function (req,res) {
		var sql="SELECT * FROM materias WHERE id_materia=?"
		var sql2="SELECT * FROM cursos WHERE id_curso=?";
		var sql3='SELECT personas.* FROM estudiantecurso, personas WHERE estudiantecurso.id_estudiante=personas.id_persona && estudiantecurso.id_curso=?';
		//var sql4='SELECT nota FROM `calificaciones` WHERE id_estudiante=? && bimestre=? && id_materia=?';
		con.query(sql,[req.params.id], function(err,result){
			if(err){ throw err;}
			console.log(result);
			con.query(sql2,[req.params.id2], function(err,result2){
				if(err){ throw err;}
				console.log(result2);
				con.query(sql3,[req.params.id2], function(err,result3){
					if(err){ throw err;}
					console.log(result.nombres);
					arr.push(result);
					arr.push(result2);
					arr.push(result3);

					 res.render('mostrar/list_curso_est',{materia:result,curso:result2,estudiante:result3});
					// res.send({materia:result,curso:result2,estu:result3})
				})
			})

		})
	})
	.post(function (req,res){
		// var sql="INSERT INTO calificaciones (nota,bimestre,id_materia,id_estudiante,gestion) VALUES(?,?,?,?,?)"
		// con.query(sql,[nota,req.params.id,req,params.id2], function(err,result){
		// 	res.send({nota:result});
		//})
		
		console.log(req.body.nota);
		console.log(req.body)
		console.log(req.params)
		console.log(req.query)
		console.log(req.json)
		res.send(arr)
	})


// router.get("/mostrar/:id/:id2/edit", function(req,res){
	
// 	var sql4='SELECT nota FROM `calificaciones` WHERE id_estudiante=? && bimestre=? && id_materia=?'
// 	con.query(sql,[req.params.id], function(err, result){
// 			if(err){ throw err;}
// 			//res.render('mostrar/listar_estud',{personas:result});			
// 		con.query(sql2,[req.params.id], function(err, result2){
// 		if(err){ throw err;}
// 		res.render('edit/estudiante',{curso:result,estudiante:result2});			
// 		//res.send({curso:result,estudiante:result2});
// 		});
		
// 	});
// 	//res.send("aqui se visualisara la lista de estudiantees registradors en el sistema");
// })
module.exports=router;