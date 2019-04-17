var path = require("path");
var express = require("express");
var fs = require('fs');

var app = express();

var port 		= 3100;
var mongo_host	= "mongodb://localhost:27017/mydb";

// Запускаем mongodb.
var mongo			= require('./mongo_handler');

mongo.connectToServer(mongo_host, function(err, client) 
{
	if ( !err )
	{
		// Создаем пользователей
		mongo.getDb().db("test_users", 
		function(err, res) 
		{
			if (err) 
				throw err;
					
			console.log("`test_users` collection created!");
		});
	}
	else
	{
		console.log("Connected to Mongo server FAILED: " + err);
	}
});

// Обрабатываем все запросы post/get
app.get('/', (req, res) => {
	fs.readFile('test.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();
    });
});

app.post('/task', (req, res) => {
	var args = req.query;
	
	var id = args.id;
	
	console.log(id);
	
	res.send({result: 'ok'});
});

app.get('/task/:id', (req, res) => {
	var id = req.params.id;
	
	console.log(id);
	
	res.send({result: 'ok'});
});

app.listen(port);
console.log("listening on port = " + port);

module.exports = app