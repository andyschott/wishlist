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

    db.deleteItem(id, (items) => {
        return res.redirect('/');
    });
});

module.exports = router;
