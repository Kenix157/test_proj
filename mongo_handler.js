var MongoClient = require( 'mongodb' ).MongoClient;

var connection;

module.exports = 
{
	connectToServer: function(url, callback) 
	{
		MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
			connection = client;
			
			callback(err, client);
		} );
	},

	getDb: function() 
	{
		return connection;
	}
};