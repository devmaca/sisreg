var mysql= require('mysql');

var con=mysql.createConnection({
	host: "127.0.0.1",
	user: "root",
	password: "",
	database: "limon"
});
con.connect(function(err){
	if (err) console.log(err) ;
	console.log('conectado a Mysql!');
	});
module.exports=con;