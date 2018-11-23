var express=require('express');
var mysql=require('mysql');
var bodyParser=require('body-parser');
var con = mysql.createConnection({
	host: "127.0.0.1",
	user: "root",
	password: "",
	database: "vod"
});
var app=express();
var publicDir = `${__dirname}/public`

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application

app.set('views', './views') // specify the views directory
app.set("view engine", "pug");// register the template engine
app.use("/public",express.static('public'));

con.connect(function(err){
	if (err) console.log(err) ;
	console.log('conectado a Mysql!');
	// var nuevo= "INSERT INTO users (user, pass) VALUES ('miguel', 'miguel')";	
	// con.query(nuevo, function (err, result) {
 	// if (err) throw err;
 	// console.log("1 record inserted");
 	// });	
	});

	app.get("/", function (req,res) {
	//res.write('jdsklfjdslkfjldsfjl');
	//res.send('hola mundo con express');

		res.render("index");
	});
	app.get("/navbar", function (req,res) {
		res.render('home2',{nombre:'miguel alfredo condori alejo'});
	});
	app.get("/login", function(req,res){
		con.query('select * from users',function(err,result){
			console.log(result);
		})
		//res.sendFile(`${publicDir}/login.html`);
		res.render('login');
	})
	app.post("/home", function(req,res){
		var sql = 'Select * from users where user=? and pass=?';
	
		con.query(sql,[req.body.user,req.body.password], function(err, result){
			if(err){ throw err;}
			if(result == 0){
			console.log('usuario no encontrado');
			res.redirect('/login')}
			else{ 
				//res.sendFile(`${publicDir}/home.html`)
				console.log(result[0].user+" accedio al sistema.");
				res.render('home',{nombre:result[0].user})}
		
		});
		
	})
	app.get("/home2", function(req,res){
		res.render('home2')
	})
	app.get("/registro", function(req,res){
		res.send('regitrado!')
	})

	app.get("/admin", function(req,res){
		res.render('persona/administrador');
	})
	//falta validar el ingreso del usuario a esta ruta
	app.get("/estudiante", function(req,res){
		res.render('persona/estudiante')
	})
	app.get("/docente", function(req,res){
		res.render('persona/docente')
	})
app.listen(3000,'localhost');
console.log('el servidor esta corriendo en localhost puerto 3000');