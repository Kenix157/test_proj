var path = require("path");
var express = require("express");
var fs = require('fs');

var port = 3100;
var app = express();

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