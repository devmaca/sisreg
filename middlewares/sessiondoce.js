
var con= require('../conectiondb/connection.js');
module.exports = function(req,res,next){
	var sql='SELECT docentes.*,personas.nombres, personas.paterno FROM docentes, personas WHERE docentes.id_docente = personas.id_persona && personas.id_persona =?'
	console.log('aqui es el midleware. id de persona nro: '+req.session.usuario);
	var docente;
	if(!req.session.usuario){ //si no existe valor no hay usuario
		console.log('USuario no encontrado');

		res.redirect("/login")// vuelve a ruta login

	}
	else{
		con.query(sql,[req.session.usuario], function(err,result){
			if(!result[0]){
				res.send("nooooo puede entrar aqui");
			}else{
			docente=result[0].id_docente;
			console.log("usuario "+req.session.usuario+" inicio sesion...");
			res.locals={user:req.session.usuario,nom:result[0].nombres,ape:result[0].paterno};
			next();
			}
			
		})			 
	}
	

	

}