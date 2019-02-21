var express=require('express');
var con= require('../conectiondb/connection.js');
var router=express.Router();

//regaroma.com/tut
router.get('/', function(req,res){
	// res.render('tutor');
	var usuario=req.session.usuario
	res.send("scandal");
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

router.get('/notas', function(req,res){
	var sql='select materias.* from imparte,materias where imparte.id_docente=? && materias.id_materia=imparte.materia'
	con.query(sql,[req.session.usuario], function(err,result){
		res.render('mostrar/listar_materias',{materias:result})
	})
})


module.exports=router;