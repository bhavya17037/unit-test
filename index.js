var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var bodyparser = require('body-parser');



var impObject = {
	'jwtSecret':'xtytzt00700tytx',
	'connStr':'mongodb://localhost/auth_db'
};

mongoose.connect(impObject.connStr);
var db = mongoose.Connection;

var schema = mongoose.Schema;
var userSchema = new schema({
	username: String,
	password: String
});

var user = mongoose.model('USER',userSchema);

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.get('/new',function(req,res){
	res.status(201).sendFile(path.join(__dirname+'/create.html'));
});

app.post('/create',function(req,res){
	var USER = new user({
		username: req.body.username,
		password: req.body.password
	});
	
	user.find({username: req.body.username},function(err,doc){
		if(doc.length > 0){
			res.status(400).json({
				CREATED: false,
				message: "Already exists!"
			});
		}else{
			USER.save(function(err){
				if(err){
				console.log('ERRORRR');
					res.status(400).json({
						CREATED: false
					});
				}else{
					res.status(201).json({
						CREATED: true
					});
				}
			});
		}
	});
});

app.get('/list_users',function(req,res){
	user.find({},function(err,users){
		res.status(201).json(users);
	});
});

app.post('/find',function(req,res){
	user.findOne({username: req.body.username},function(error,usr){
		if(err){
			throw err;
		}
		if(!usr){
			res.status(400).json({
				authsuccess: false,
				message: 'USER NOT FOUND!'
			});
		}else{
			if(usr.password != req.body.password){
				res.status(400).json({
					authsuccess: false,
					message: 'WRONG PASSWORD BITCH'
				});
			}else{
				res.status(201).json({
					authsuccess: true,
					message: req.body.username + ' is present in our records!'
				});
			}		
		}
	});
});

app.listen(2000,'localhost');

module.exports = app