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
	.get(function(req,res){

		res.render("conductas/ver_conducta")
		
	})
	.post(function(req,res){

	})
router.route("/horarios")
	.get(function(req,res){

		res.render("horarios/ver_horarios")
		
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
		let sql2='SELECT cursos.curso FROM cursos,estudiantes WHERE estudiantes.id_curso=cursos.id_curso && estudiantes.id_estudiante=?'
		let per;
		con.query(sql,[req.params.id], function(err,result){
			con.query(sql2,[req.params.id], function(err,result2){
			res.render('tutor/estudianteId',{personas:result,curso:result2})	
			})
		})
		
		
	})
router.get('/notas/:idEst/:bim', function(req,res){
	var sql='SELECT * FROM calificaciones WHERE id_estudiante=? && bimestre=?'
	con.query(sql,[req.params.idEst,req.params.bim], function(err,result){
		if(result[0]==null){
			// res.send({msg:'NO HAY NOTAS'})
			res.render('tutor/ver_notaidEst',{msg:'TODAVIA NO TIENE NOTAS'})
		}else{
			console.log(result)
			res.render('tutor/ver_notaidEst',{nota:result})
		}
		
	})
})


module.exports=router;