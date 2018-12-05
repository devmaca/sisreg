var express=require('express');
//var mysql=require('mysql');
var con= require('./conectiondb/connection.js');
var bodyParser=require('body-parser');
var router_app =require('./routes_app');
var methodOverride = require("method-override");
var app=express();
var publicDir = `${__dirname}/public`

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application

//para usar method put y delete
app.use(methodOverride("_method"));

app.set('views', './views') // specify the views directory
app.set("view engine", "pug");// register the template engine
app.use("/public",express.static('public'));

// con.connect(function(err){
// 	if (err) console.log(err) ;
// 	console.log('conectado a Mysql!');
// 	// var nuevo= "INSERT INTO users (user, pass) VALUES ('miguel', 'miguel')";	
// 	// con.query(nuevo, function (err, result) {
//  	// if (err) throw err;
//  	// console.log("1 record inserted");
//  	// });	
// 	});

	app.get("/", function (req,res) {
	//res.write('jdsklfjdslkfjldsfjl');
	//res.send('hola mundo con express');

		res.render("index");
	});
	app.get("/navbar", function (req,res) {
		res.render('home2',{nombre:'miguel alfredo condori alejo'});
	});
	app.get("/login", function(req,res){
		//SELECT nombres,administrador.ci FROM personas,administrador WHERE personas.ci=administrador.ci;
		//select nombres,paterno, from personas
		con.query('SELECT nombres,administrador.id_administrador FROM personas,administrador WHERE personas.ci=administrador.ci',function(err,result){
			console.log(result);
		})
		//res.sendFile(`${publicDir}/login.html`);
		res.render('login');
	})
	app.post("/session", function(req,res){
		var sql = 'Select * from personas where user=? and pass=?';
	
		con.query(sql,[req.body.user,req.body.password], function(err, result){
			if(err){ throw err;}
			if(result == 0){
			console.log('usuario no encontrado');
			res.redirect('/login')}
			else{ 
				//res.sendFile(`${publicDir}/home.html`)
				console.log(result[0].user+" accedio al sistema.");
				// res.render('inicio',{nombre:result[0].user})
				res.redirect("/home")}
		
		});
		
	})
		
	
	app.post("/registro", function(req,res){
		var sql2 = 'INSERT INTO personas (nombres,paterno,materno,ci,direccion,telefono,genero,fecha_nac,user,pass,rol) VALUES (?,?,?,?,?,?,?,?,?,?,?) ';
		var sql3 = 'INSERT INTO administrador (ci) VALUES(?)';
		var sql4 = 'INSERT INTO director (ci) VALUES(?)';
		var rol =req.body.rol;
		//arreglar esta parte 
		if(rol=="ADMINISTRADOR"){
			//registrar datos personales
			con.query(sql2,[req.body.nomb,req.body.apep,req.body.apem,req.body.ci,req.body.dir,req.body.tel,req.body.optradio,req.body.fecha,req.body.user,req.body.pass,req.body.rol], function(err, result){
			if(err){ throw err;}
			console.log(result);
			console.log('number of record...'+result.affectedRows);
			
			});
			//registrar ci adminstrador	
			con.query(sql3,[req.body.ci], function(err, result){
			if(err){ throw err;}
			console.log(result);
			console.log('number of record...'+result.affectedRows);
			
			});
		
		}else{
			//registrar datos personales
			con.query(sql2,[req.body.nomb,req.body.apep,req.body.apem,req.body.ci,req.body.dir,req.body.tel,req.body.optradio,req.body.fecha,req.body.user,req.body.pass,req.body.rol], function(err, result){
			if(err){ throw err;}
			console.log(result);
			console.log('number of record...'+result.affectedRows);
			});
			//registrar ci director
			con.query(sql4,[req.body.ci], function(err, result){
			if(err){ throw err;}
			console.log(result);
			console.log('number of record...'+result.affectedRows);
			});
		}
		res.send('<h1>registrado exitosamente!</h1> <h1><a href="/login"><<--volver a login</a></h1>');

		})

	app.get("/admin", function(req,res){
		res.render('persona/administrador');
	})
	// app.get("/mostrar", function(req,res){
	// 	var data={nombres:'miguel', apellidos:'condori', eda:23}
	// 	con.query('SELECT nombres,paterno,materno,direccion,telefono,genero,fecha_nac,administrador.id_administrador,administrador.ci FROM personas,administrador WHERE personas.ci=administrador.ci', function(err, result){
	// 		if(err){ throw err;}
	// 		console.log(result);
	// 		res.render('mostrar/listar',{personas:result});			
	// 		});
		
	// })
	//falta validar el ingreso del usuario a esta ruta
	

	app.get("/calificacion", function(req,res){
		res.render('calificaciones')
	})
//app.use('/home2',router_app);
app.use('/home', router_app);
app.listen(3000,'localhost');
console.log('el servidor esta corriendo en localhost puerto 3000');