var express=require('express');
var con= require('../conectiondb/connection.js');
var router=express.Router();
var moment = require('moment');//manejador de fechas y horas
//regaroma.com/doce
router.get('/', function(req,res){
	// res.send({user:req.session.usuario})
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
// conductas

router.route("/conductas")
	.get(function(req,res){//seleccionar cursos docente
		let sql2="SELECT cursos.* FROM cursos,docentecurso WHERE docentecurso.id_curso=cursos.id_curso && docentecurso.id_docente=?"
		con.query(sql2,[req.session.usuario], function(err, result2){
			if(err){ throw err;}
			res.render("conductas/seleccionar",{cursos:result2})
		});
	})
	.post(function(req,res){//post seleccionar estudiante
		let sql= 'SELECT personas.* FROM estudiantes, personas WHERE estudiantes.id_estudiante=personas.id_persona && estudiantes.id_curso=?';
		con.query(sql,[req.body.curso], function(err, result){
			if(err){ throw err;}
			else{
				res.render("conductas/estu_conducta",{estudiantescurso:result,curso:req.body.curso})
				// res.send({estudiantescurso:result,curso:req.body.curso});	
			}	
			});
	})

router.route("/conductas/:id")
	.get(function(req,res){ //mostrar conducta
		var r1;//datos_de_estudiante
		var r2;//conducta_de_estudiante
		let sql="SELECT * FROM personas WHERE id_persona=? "
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
	.post(function(req,res){//registrar conducta
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
		var sql='select materias.* from imparte,materias where imparte.id_docente=? && materias.id_materia=imparte.materia'
		con.query(sql,[req.session.usuario], function(err,result){
			res.render('horarios/ver_horarios',{materias:result})
		})
		// con.query('Select * from materias', function(err, result){
		// 	if(err){ throw err;}
		// 	console.log(result);
		// 	 res.render('materias',{materias:result});

		// 	});
		
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
var bim=[1,2,3,4];// bimestres
router.get("/mostrar/:id", function (req,res) {
	
	var sql='SELECT * FROM materias WHERE id_materia=?';
	var sqlid="SELECT * FROM cursos,docentecurso WHERE docentecurso.id_curso=cursos.id_curso && docentecurso.id_docente=?";
	con.query(sql,[req.params.id], function(err,result){
		if(err){ throw err;}
	
		con.query(sqlid,[req.session.usuario], function(err,result2){
			if(err){ throw err;}
			console.log(result);
			res.render('mostrar/list_curso_doc',{curso:result2,materia:result,bim:bim});	
		})

	})
})
/*mostrar estudiantes de cursos
	el parametro :id es la id de la materia
*/
router.route("/notas/:id")
	.get(function (req,res) {
		var sql="SELECT * FROM materias WHERE id_materia=?"
		var sql2="SELECT * FROM cursos WHERE id_curso=?";
		var sql3='SELECT personas.* FROM estudiantes, personas WHERE estudiantes.id_estudiante=personas.id_persona && estudiantes.id_curso=?';
		var sql4='SELECT id_calificacion,id_estudiante,nota FROM `calificaciones` WHERE bimestre=? && id_materia=?';
		console.log("bimestre : "+req.query.bim)
		var bimestre=req.query.bim;
		con.query(sql,[req.params.id], function(err,result){
			if(err){ throw err;}
			console.log(result);
			con.query(sql2,[req.query.cur], function(err,result2){
				if(err){ throw err;}
				console.log(result2);
				con.query(sql3,[req.query.cur], function(err,result3){
					if(err){ throw err;}
					con.query(sql4,[bimestre,req.params.id], function(err,result4){
						if(err){ throw err;}
						var boletin=[];
						for (var i=0;i<result3.length;i++){	
							var b=0;
							var b2={
									nota:0,
									descripcion:'no tiene nota aun'}
							var aux={};
							for (var j=0; j<result4.length; j++){
								if(result4[j].id_estudiante==result3[i].id_persona){
									b=1;
									aux=result4[j];
								}
							}
							if(b==0){//no tiene nota
								console.log(b2)
								boletin[i]= Object.assign(result3[i],b2)
							}
							if(b==1){//si tiene nota
								boletin[i]= Object.assign(result3[i],aux)
							}
								
						}
							// res.send({bole:boletin});
							res.render('mostrar/list_curso_est',{materia:result,curso:result2,bimestre:bimestre,est:boletin})
					})
						
						// var c=0;
						// var boletin=[];
						// for (const ob1 of result4){
						// 	for (const ob2 of result3){
						// 		if(ob1.id_estudiante==ob2.id_persona){
						// 			boletin[c]= Object.assign(ob1,ob2);
						// 			c++;
						// 		}
						// 	}
						// }
						// res.render('mostrar/list_curso_est',{materia:result,curso:result2,estu:result3,bimestre:bimestre,notas:result4})
				})
					
					// res.render('mostrar/list_curso_est',{materia:result,curso:result2,estudiante:result3,bimestre:bimestre});
					// res.send({materia:result,curso:result2,estu:result3,bimestre:bimestre})
			})
		})

	})
	.post(function (req,res){
		var fecha=moment().format('YYYY');
		var cal={
			id_est:req.body.id_est,
			nota:req.body.nota,
			bimestre:req.body.bim,
			id_mat:req.params.id,
			id_cur:req.body.cur
		}
		var sql="INSERT INTO calificaciones (nota,bimestre,id_materia,id_estudiante,gestion) VALUES(?,?,?,?,?)"
		con.query(sql,[cal.nota,cal.bimestre,cal.id_mat,cal.id_est,fecha], function(err,result){
			// res.send({nota:result});
			res.redirect('/doce/notas/'+req.params.id+'?cur='+cal.id_cur+'&bim='+cal.bimestre);
		})
	})
	.put(function (req,res){
		let sql='UPDATE calificaciones SET nota=? WHERE id_calificacion=?'
		con.query(sql,[req.body.nota,req.params.id], function(err,result){
			console.log(result.affectedRows + " record(s) updated");
			res.redirect('/doce/notas/'+req.body.mat+'?cur='+req.body.cur+'&bim='+req.body.bim);
		})
	})

/*el parametro :id es la id de la calificacion*/
router.get("/notas/:cal/:curso/edit", function(req,res){
	var sql='SELECT calificaciones.* FROM calificaciones WHERE id_calificacion=? '
	con.query(sql,[req.params.cal], function(err, result){
			if(err){ throw err;}
			
		res.render('edit/nota',{cal:result,curso:req.params.curso});
	});
	
})

router.route('/bol')
	.get(function(req,res){
		//let sql='SELECT * FROM `calificaciones` WHERE  id_materia=?'
		let sql2='SELECT * FROM cursos,docentecurso WHERE docentecurso.id_curso=cursos.id_curso && docentecurso.id_docente=?';
		let sql3= 'SELECT materias.* FROM imparte,materias where imparte.id_docente=? && materias.id_materia=imparte.materia'
		con.query(sql2,[req.session.usuario], function(err,result){
			if(err){ throw err;}
			con.query(sql3,[req.session.usuario], function(err,result2){
				if(err){ throw err;}
				res.render('boletin/seleccionar', {curso:result,materia:result2})
				// res.send({curso:result,materia:result2})
			})
		})
	})
	.post(function(req,res){
		let sql='SELECT * FROM `calificaciones` WHERE id_materia=?';
		let sql2='SELECT personas.* FROM estudiantes, personas WHERE estudiantes.id_estudiante=personas.id_persona && estudiantes.id_curso=?'
		con.query(sql,[req.body.mat], function(err,result){
			if(err){ throw err;}
			if(result==0){console.log("no hay notas en esta materia")
				res.send('no hay notas')}
			else{
			con.query(sql2,[req.body.cur], function(err,result2){
				if(err){ throw err;}
				var bolet=[];
				if(result2==0){console.log("no hay alumnos en este curso seleccionado")
				// res.send({bol:bolet})
					res.render('boletin/ver_boletin',{bol:bolet})
				}
				else{
					
					for(var i=0;i<result2.length;i++){//iterar objeto estudiantes
						var arr=[];
						
						for(var j=0;j<result.length;j++){//recorrer objeto calificaciones
							if(result[j].id_estudiante==result2[i].id_persona){
								arr.push(result[j]);
							}
						}
						// console.log(arr);
						var b={boletin:arr};
						bolet[i]=Object.assign(result2[i],b);
						// bolet[i]= Object.assign(result2[i],b3[i])
					}
					console.log(bolet);
					console.log(bolet[0].boletin[1].nota);
					// res.send({bol:bolet});
					res.render('boletin/ver_boletin',{bol:bolet,curso:req.body.cur,materia:req.body.mat})
					}
			})  }//fin else
		})
		
	})
module.exports=router;