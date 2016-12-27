const pg = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/wishlist';

function getItems(client, callback) {
    const query = client.query('SELECT * FROM ITEMS ORDER BY PRIORITY ASC');

    const items = [];
    query.on('row', (row) => { items.push(row); });

    query.on('end', () => {
        callback(items);
    });
}

function handleError(err, done) {
    done();
    console.log(err);
    return {
        'success': false,
        'data': err
    };
}

const db = {
    'createItem': function (name, priority, comments, callback) {
        pg.connect(connectionString, (err, client, done) => {
            if (err) {
                handleError(err, done);
            }

            // Insert the new item
            client.query('INSERT INTO ITEMS(NAME, PRIORITY, COMMENTS) VALUES ($1, $2, $3)',
                [name, priority, comments]);

            return getItems(client, (items) => {
                done();
                return callback(items);
            });
        });
    },

    'getItems': function (callback) {        
        pg.connect(connectionString, (err, client, done) => {
            if (err) {
                handleError(err, done);
            }

            return getItems(client, (items) => {
                done();
                return callback(items);
            });
        });
    }
};

module.exports = db;
