
const express = require('express');
const database = express();

app.post('/login',function(req,res){
	if(req.body.username=='...'&&req.body.password=='...'){
		res.json({success:1});
	}
});