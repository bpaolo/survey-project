const pgp = require('pg-promise')();
const db = pgp({
	user: 'postgres',
	password: 'survey',
	host: 'localhost',
	port: 5432,
	database: 'survey'
});

module.exports = db;