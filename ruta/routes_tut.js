var express=require('express');
var con= require('../conectiondb/connection.js');
var router=express.Router();

//regaroma.com/tut
router.get('/', function(req,res){

	res.render('tuto')
	// res.send("scandal");
})

router.get('/inicio', function(req,res){
	var sql='SELECT ci FROM personas WHERE id_persona=?'
		let citut;
		con.query(sql,[req.session.usuario], function(err,result){
			citut=result[0].ci;
		
			let sql2="SELECT estudiantes.*,personas.* FROM estudiantes,personas WHERE estudiantes.ci_tutor=? && personas.id_persona=estudiantes.id_estudiante";
			con.query(sql2,[citut], function(err,result2){
				res.render('tutor/ver_estudiante',{personas:result2})
			})
		})
})
router.get('/ver', function(req,res){// para ver datos personales del usuario
	var sql='SELECT * FROM personas WHERE id_persona=?'
	con.query(sql,[req.session.usuario], function(err,result){
		res.render('tutor/mostrar',{persona:result})
		// res.send({persona:result});
	})
	
})
/*para cambiar contrasena*/

router.get("/ver/:id/edit", function (req,res) {//renderizar formulario edit password

	res.render('tutor/edit',{persona:req.params.id});
	// res.send({persona:req.params.id})	
	
})
router.route("/ver/:id")//cambiar password
	.get(function (req,res) {
		res.send("tus password ha sido modificado con exito!!")
	})
	.put(function (req,res){//modificar password
		var sql="UPDATE personas SET pass=? WHERE id_persona=?"
		con.query(sql,[req.body.pass,req.params.id],function(err,result){
			if(err){ throw err;}
			console.log(result.affectedRows + " record(s) updated");
			res.redirect('/doce/ver')
		})
		// res.send(req.params.id)
	})

// conductas

router.route("/conductas/:id")//ver conducta de estudiante
	.get(function(req,res){
		let sql="SELECT * FROM personas WHERE id_persona=? "
		let sql2="SELECT * FROM conducta WHERE id_estudiante=? "
		con.query(sql,[req.params.id], function(err,result){
			r1=result;//objeto datos persona
			con.query(sql2,[req.params.id], function(err,result2){
				if(!result2){
					r2=null;
				}else{
					r2=result2;//objeto conducta de persona
				}
				res.render("tutor/estudiante_conducta",{r1:r1,r2:r2,est:req.params.id})
			})
			
		})
		
	})
	.post(function(req,res){

	})
router.route("/horarios/:id/:idCur")
	.get(function(req,res){
		let sql="SELECT horario.*,materias.area FROM horario,materias WHERE horario.id_curso=? && materias.id_materia=horario.id_materia";
		let sql2="SELECT * FROM cursos WHERE id_curso=?"
		let sql3="SELECT * FROM personas WHERE id_persona=? "
			con.query(sql,[req.params.idCur], function(err,result){
				if(err){ throw err;}
				con.query(sql2,[req.params.idCur], function(err,result2){
					if(err){ throw err;}
					if(!result){
						result=null;
					}
					con.query(sql3,[req.params.id], function(err,result3){
						if(err){ throw err;}
						res.render('tutor/mostrarHorario',{horario:result,curso:result2,estudiante:result3});
						// res.send({horario:result,curso:result2,estudiante:result3})
					})
					
				})
			})
	})
	.post(function(req,res){
		
	})

	//en progreso
router.route("/estudiantes")
	.get(function(req,res){
		var sql='SELECT ci FROM personas WHERE id_persona=?'
		let citut;
		con.query(sql,[req.session.usuario], function(err,result){
			citut=result[0].ci;
		
			let sql2="SELECT estudiantes.*,personas.* FROM estudiantes,personas WHERE estudiantes.ci_tutor=? && personas.id_persona=estudiantes.id_estudiante";
			con.query(sql2,[citut], function(err,result2){
				res.render('tutor/ver_estudiante',{personas:result2})
			})
		})
		
		
	})
	.post(function(req,res){
		
	})
//estudiante nro id
router.route("/estudiante/:id")
	.get(function(req,res){
		var sql='SELECT * FROM personas WHERE id_persona=?'
		let sql2='SELECT cursos.curso,cursos.id_curso FROM cursos,estudiantes WHERE estudiantes.id_curso=cursos.id_curso && estudiantes.id_estudiante=?'
		let per;
		con.query(sql,[req.params.id], function(err,result){
			con.query(sql2,[req.params.id], function(err,result2){
			res.render('tutor/estudianteId',{personas:result,curso:result2})	
			})
		})
		
		
	})
router.get('/notas/:idEst/:bim', function(req,res){
	let sql='SELECT calificaciones.*, materias.area FROM calificaciones,materias WHERE id_estudiante=? && bimestre=? && materias.id_materia=calificaciones.id_materia'
	let sql2='SELECT personas.nombres,personas.paterno,personas.materno,cursos.curso,estudiantes.rude FROM personas,cursos,estudiantes WHERE estudiantes.id_curso=cursos.id_curso && estudiantes.id_estudiante=? && personas.id_persona=?'
	let sql3='SELECT * FROM materias'
	let sql4='SELECT calificaciones.*, materias.area FROM calificaciones,materias WHERE id_estudiante=? && materias.id_materia=calificaciones.id_materia'
	if(req.params.bim==5){//esto para generar un objeto boletin anual de un alumno
		con.query(sql3,[],function(err,result){
			con.query(sql4,[req.params.idEst],function(err,result2){
				var arr=[];
				for(let i=0; i<result.length; i++){//recorriendo objeto materia
					var materia={
								nombre:"",
								b1:null,
								b2:null,
								b3:null,
								b4:null,
								gestion:null
								};
					materia.nombre=result[i].area;
					for(let j=0; j<result2.length; j++){//recorriendo notas de alumno
						if(result[i].id_materia==result2[j].id_materia){
							
							if(result2[j].bimestre==1){
								materia.b1=result2[j].nota;
								materia.gestion=result2[j].gestion;
							}
							if(result2[j].bimestre==2){
								materia.b2=result2[j].nota;
								materia.gestion=result2[j].gestion;
							}
							if(result2[j].bimestre==3){
								materia.b3=result2[j].nota;
								materia.gestion=result2[j].gestion;
							}
							if(result2[j].bimestre==4){
								materia.b4=result2[j].nota;
								materia.gestion=result2[j].gestion;
							}
						}
					}
					arr.push(materia);//empaquetar a un array 
				}//fin for materias
				con.query(sql2,[req.params.idEst,req.params.idEst], function(err,result3){
					console.log(arr);
					// res.send({estudiante:result3,nota:arr});
					res.render('tutor/mostrarBoletinAnual',{estudiante:result3,nota:arr})
				})
				
			})
		})
		// res.send('estamos trabajando en ello')
	}else{
		con.query(sql,[req.params.idEst,req.params.bim], function(err,result){
			if(result[0]==null){
				// res.send({msg:'NO HAY NOTAS'})
				res.render('tutor/ver_notaidEst',{msg:'TODAVIA NO TIENE NOTAS'})
			}else{
				con.query(sql2,[req.params.idEst,req.params.idEst], function(err,result2){
					console.log(result)
					res.render('tutor/ver_notaidEst',{nota:result,estudiante:result2})
				})
				
			}
			
		})
	}
})


module.exports=router;