var path = require("path");
var express = require("express");
var fs = require('fs');

var app = express();

var port 		= 3100;
var mongo_db	= "mydb_test";
var mongo_host	= "mongodb://localhost:27017/";

// Запускаем mongodb.
var mongo			= require('./mongo_handler');

mongo.connectToServer(mongo_host, mongo_db, function(err, db) 
{
	if ( !err )
	{
		// Создаем пользователей
		db.createCollection("test_users", 
		function(err, res) 
		{
			if (err) 
				throw err;
					
			console.log("`test_users` collection created!");
		});
		
		console.log("Connected to Mongo server: SUCCESS");
	}
	else
	{
		console.log("Connected to Mongo server: FAILED " + err);
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
	
	var id = Date.now();
	
	// Добавляем в базу
	var data = 
	{
		task_id:	id,
		amount:		100,
		time:		Date.now(),
		currency:	"usd"
	};
								
	mongo.getDb().collection("test_users").insertOne(data);
	
	res.send({result: id});
});

app.get('/task/:id', async (req, res) => {
	var id = req.params.id;
	
	const db_result = await mongo.getDb().collection("test_users").aggregate([
		{ $match: { currency: "usd" } },
		{ $group: { _id: "$task_id", total: { $sum: "$amount" } } }
	]).toArray();
	
	res.send({result: db_result});
});

app.listen(port);
console.log("listening on port = " + port);

module.exports = app