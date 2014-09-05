// Package inclusion
var express = require('express');

// init vars
var router = express.Router();

// route declaration
router.get('/', function(req, res) {
    res.sendfile('public/index.html');
});

// export route
module.exports = router;