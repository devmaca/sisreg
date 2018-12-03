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

router.get("/estudiante", function(req,res){
		res.render('persona/estudiante')
	})

router.get("/docente", function(req,res){
		res.render('persona/docente')
	})
router.get("/tutor", function(req,res){
		res.render('persona/tutor')
	})
router.get("/curso", function(req,res){
		res.render('curso')
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
		res.send("la id de materia es :"+req.params.title);
	})
	.put(function(req,res){
		
		var sql3="UPDATE materias SET area=? WHERE id_materia=?"
		res.send("se modificara la materia con id: "+req.body.title);

	})
	.delete(function(req,res){
		res.send("se borrara la materia con id: "+req.params.id);
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
router.get("/gestion", function(req,res){
		res.render('gestion')
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

module.exports=router;