var express=require('express');
var con= require('../conectiondb/connection.js');
var router=express.Router();
var moment = require('moment');//manejador de fechas y horas
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
		let sql2="SELECT cursos.* FROM cursos,docentecurso WHERE docentecurso.id_curso=cursos.id_curso && docentecurso.id_docente=?"
		con.query(sql2,[req.session.usuario], function(err, result2){
			if(err){ throw err;}
			res.render("conductas/seleccionar",{cursos:result2})
		});
	})
	.post(function(req,res){
		let sql= 'SELECT personas.* FROM estudiantecurso, personas WHERE estudiantecurso.id_estudiante=personas.id_persona && estudiantecurso.id_curso=?';
		con.query(sql,[req.body.curso], function(err, result){
			if(err){ throw err;}
			else{
				res.render("conductas/estu_conducta",{estudiantescurso:result,curso:req.body.curso})
				// res.send({estudiantescurso:result,curso:req.body.curso});	
			}	
			});
	})

router.route("/conductas/:id")
	.get(function(req,res){
		var r1;//datos_de_estudiante
		var r2;//conducta_de_estudiante
		let sql="SELECT personas.nombres FROM personas WHERE id_persona=? "
		let sql2="SELECT * FROM conducta WHERE id_estudiante=? "
		con.query(sql,[req.params.id], function(err,result){
			r1=result;
			con.query(sql2,[req.params.id], function(err,result2){
				if(!result2){
					r2=null;
				}else{
					r2=result2;
				}
				res.render("conductas/registrar",{r1:r1,r2:r2,est:req.params.id})
			})
			
		})
		
	})
	.post(function(req,res){
		var fecha=moment().format('L');
		let sql="INSERT INTO conducta (descripcion,id_estudiante,fecha) VALUES(?,?,?)"
		con.query(sql,[req.body.conducta,req.params.id,fecha], function(err,result){
			res.redirect("/doce/conductas/"+req.params.id)
		})
		// res.send({conducta:req.body.conducta,fecha:fecha,id_estudiante:req.params.id})
	})

router.route("/conductas/:id/:id2")
	.delete(function(req,res){
		let sql="DELETE FROM conducta WHERE id_conducta=?"
		con.query(sql,[req.params.id2],function(err,result){
			if(err){ throw err;}
			console.log("Numeros de registros borrados: " + result.affectedRows);
			res.redirect('/doce/conductas/'+req.params.id);
		})
		//res.send("se borrara la materia con id: "+req.params.id);
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