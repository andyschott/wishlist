const express = require('express');
const db = require('../models/db');

const router = express.Router();

// Create an Item
router.post('/', (req, res, next) => {
    const data = {
        'name': req.body.name,
        'priority': parseInt(req.body.priority),
        'comments': req.body.comments
    };

    db.createItem(data.name, data.priority, data.comments, (items) => {
        return res.json(items);
    });
});

// Return all items, sorted by priority
router.get('/', (req, res, next) => {
    db.getItems((items) => {
        return res.json(items);
    });
});

module.exports = router;
