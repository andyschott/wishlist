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

    var items = db.createItem(data.name, data.priority, data.comments);
    return res.json(items);
});

module.exports = router;
