var express=require('express');
var con= require('../conectiondb/connection.js');
var router=express.Router();

//regaroma.com/doce
router.get('/', function(req,res){
	res.render('doce');
})

router.get('/mismaterias', function(req,res){
	var sql='select materias.* from imparte,materias where imparte.id_docente=? && materias.id_materia=imparte.materia'
	con.query(sql,[req.session.usuario], function(err,result){
		res.render('mostrar/listar_materias',{materias:result})
	})
	
})

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
router.get("/mostrar/:id/:id2", function (req,res) {
	
	//var sql='SELECT personas.*,estudiantes.id_estudiante FROM personas,estudiantes,estudiantecurso WHERE personas.id_persona=estudiantes.id_estudiante && estudiantecurso.id_curso=?';
	var sql="SELECT * FROM materias WHERE id_materia=?"
	var sql2="SELECT * FROM cursos WHERE id_curso=?";
	con.query(sql,[req.params.id], function(err,result){
		if(err){ throw err;}
	
		con.query(sql2,[req.params.id2], function(err,result2){
			if(err){ throw err;}
			console.log(result);
			res.render('mostrar/list_curso_est',{materia:result,curso:result2});	
		})

	})
})
module.exports=router;