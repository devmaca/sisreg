
var con= require('../conectiondb/connection.js');
module.exports = function(req,res,next){
	var sql='Select * from personas where id_persona=?'
	console.log('aqui es elmidleware id persona nro: '+req.session.usuario);

	if(!req.session.usuario){ //si no existe valor no hay usuario
		console.log('USuario no encontrado');

		res.redirect("/login")// vuelve a ruta login

	}
	else{
		con.query(sql,[req.session.usuario], function(err,result){

			console.log("usuario inicio sesion...");
			console.log(result[0]);
			res.locals={user1: result.nombres};
			next();
			
		})
		
		 
	}
}