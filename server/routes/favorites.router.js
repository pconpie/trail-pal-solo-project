const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const axios = require('axios');
const Favorite = require('../models/Favorite');

/* GET REQUESTS */


router.get('/', (req, res) => {
    Favorite.find({}, (error, data)=>{
        if (err) {
            console.log('MongoDB error on get faves', err);
            res.sendStatus(500);
        } else {
            console.log('Found Faves, ', data);
            //res.send(data);
        }
    })
        // .then(function (result) {
        //     res.send('something');
        // })
        // .catch((err) => {
        //     console.log('err on get, ', err);
        // })
}); //end GET


/* POST REQUESTS */
router.post('/', (req, res) => {
    console.log(req.body, 'req');
    let faveData = req.body
    let user = req.user._id;
    console.log('user ', user);
    let newFavorite = new Favorite(faveData);

}); // end post route

/* PUT REQUESTS */
router.put('/', (req, res) => {

});

/* DELETE REQUESTS */
router.delete('/', (req, res) => {

});

/* MISC FUNCTIONS (If any) */


module.exports = router;