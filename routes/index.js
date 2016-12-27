const express = require('express');
const db = require('../models/db');

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  db.getItems((items) => {
    res.render('index', { items: items });
  });
});

module.exports = router;
