var express=require('express');
var con= require('../conectiondb/connection.js');
var router=express.Router();

//regaroma.com/doce
router.get('/', function(req,res){
	res.render('doce');
})

module.exports=router;