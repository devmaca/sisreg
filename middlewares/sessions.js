
var con= require('../conectiondb/connection.js');
module.exports = function(req,res,next){
	var sql='Select * from administrador where id_administrador=?'
	console.log('aqui es el midleware. id de persona nro: '+req.session.usuario);
	var admin;
	if(!req.session.usuario){ //si no existe valor no hay usuario
		console.log('USuario no encontrado');

		res.redirect("/login")// vuelve a ruta login

	}
	else{

		con.query(sql,[req.session.usuario], function(err,result){
			console.log("usuario "+req.session.usuario+" inicio sesion...");
			if(!result[0]){
				res.send("no puede entrar aqui");
			}else{
				console.log(result[0].ci);
				admin=result[0].id_administrador;
				res.locals={user1: result[0].ci};		
				next();
			}
			
			
			
		})
		
		 
	}
	// if (req.session.usuario==admin) {
	// 	next();
	// }
	// else{
	// 	res.send("usted no tiene permiso de entrar a esta ruta");
	// }
}