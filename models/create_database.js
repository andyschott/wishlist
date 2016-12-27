const pg = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/wishlist';

const client = new pg.Client(connectionString);
client.connect();

const query = client.query(
'CREATE TABLE ITEMS(ID SERIAL PRIMARY KEY, NAME VARCHAR(256) NOT NULL, PRIORITY SMALLINT, COMMENTS TEXT)'
);
query.on('end', () => { client.end(); });
