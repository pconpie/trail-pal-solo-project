const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const axios = require('axios');
const stateBounds = require('../modules/stateBounds');


/* GET REQUESTS */
router.get('/', (req, res) => {
    // console.log('user ', req.user._id);
    res.send(stateBounds);
}); //end GET



module.exports = router;