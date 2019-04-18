var MongoClient = require( 'mongodb' ).MongoClient;

var connection;

module.exports = 
{
	connectToServer: function(url, db_name, callback) 
	{
		MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
			var db = client.db(db_name);
			
			connection = db;
		
			callback(err, db);
		} );
	},

	getDb: function() 
	{
		return connection;
	}
};