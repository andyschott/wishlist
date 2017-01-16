const express = require('express');
const db = require('../models/db');

const router = express.Router();

// Create an Item
router.post('/', (req, res, next) => {
    const data = {
        'name': req.body.name,
        'priority': parseInt(req.body.priority),
        'comment': req.body.comment
    };

    db.createItem(data.name, data.priority, data.comment, (items) => {
        return res.redirect('/');
    });
});

// Return all items, sorted by priority
router.get('/', (req, res, next) => {
    db.getItems((items) => {
        return res.json(items);
    });
});

// Delete an item
router.delete('/:item_id', (req, res, next) => {
    const id = req.params.item_id;

    db.deleteItem(id, (response) => {
        return res.send(response);
    });
});

// Edit an item
router.put('/:item_id', (req, res, next) => {
    const data = {
        'id': req.body.id,
        'name': req.body.name,
        'priority': parseInt(req.body.priority),
        'comment': req.body.comment
    };

    db.editItem(data, (response) => {
        return res.send(response);
    });
});

module.exports = router;
