const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const stateBounds = require('../modules/stateBounds');


/* GET REQUESTS */
router.get('/', (req, res) => {
    res.send(stateBounds);
}); //end GET



module.exports = router;