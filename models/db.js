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

function getItem(client, itemId, callback) {
    const query = client.query('SELECT * FROM ITEMS WHERE ID=($1)', [itemId]);

    const items = [];
    query.on('row', (row) => {
        items.push(row);
    });

    query.on('end', () => {
        callback(items);
    })
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
    'createItem': function (name, priority, comment, callback) {
        pg.connect(connectionString, (err, client, done) => {
            if (err) {
                return handleError(err, done);
            }

            // Insert the new item
            client.query('INSERT INTO ITEMS(NAME, PRIORITY, COMMENT) VALUES ($1, $2, $3)',
                [name, priority, comment]);

            return getItems(client, (items) => {
                done();
                return callback(items);
            });
        });
    },

    'getItems': function (callback) {        
        pg.connect(connectionString, (err, client, done) => {
            if (err) {
                return handleError(err, done);
            }

            return getItems(client, (items) => {
                done();
                return callback(items);
            });
        });
    },

    'deleteItem': function(id, callback) {
        pg.connect(connectionString, (err, client, done) => {
            if (err) {
                return handleError(err, done);
            }

            // Delete the item
            client.query('DELETE FROM ITEMS WHERE ID = $1', [id]);

            done();
            return callback('OK');
        });
    },

    'editItem' : function(item, callback) {
        pg.connect(connectionString, (err, client, done) => {
            if(err) {
                return handleError(err, done);
            }

            // Edit the item
            const query = client.query("UPDATE ITEMS SET NAME=($1), PRIORITY=($2), COMMENT=($3) WHERE ID=$4",
                [item.name, item.priority, item.comment, item.id]);
            
            query.on('end', () => {
                getItem(client, item.id, (updatedItem) => {
                    done();
                    callback(updatedItem);
                });
            });
        });
    }
};

module.exports = db;
