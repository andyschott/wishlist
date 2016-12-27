const pg = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/wishlist';

function getItems(client, done) {
    const query = client.query('SELECT * FROM ITEMS ORDER BY PRIORITY ASC');

    const items = [];
    query.on('row', (row) => { items.push(row); });

    query.on('end', () => {
        done();
        return items;
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
    'createItem': function (name, priority, comments) {
        pg.connect(connectionString, (err, client, done) => {
            if (err) {
                handleError(err, done);
            }

            // Insert the new item
            client.query('INSERT INTO ITEMS(NAME, PRIORITY, COMMENTS) VALUES ($1, $2, $3)',
                [name, priority, comments]);

            return getItems(client, done);
        });
    },

    'getItems': function () {
        pg.connect(connectionString, (err, client, done) => {
            if (err) {
                handleError(err, done);
            }

            return getItems(client, done);
        });
    }
};

module.exports = db;
