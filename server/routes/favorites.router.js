const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const axios = require('axios');
const Favorite = require('../models/Favorite');


let isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.send('Must be logged in to add items!');
}

/* GET REQUESTS */

router.get('/', isAuthenticated, (req, res) => {
    console.log('user ', req.user._id);
    let userId = req.user._id;
    Favorite.find({
        'user': userId
    }, (err, data) => {
        if (err) {
            console.log('MongoDB error on get faves', err);
            res.sendStatus(500);
        } else {
            console.log('Found Faves, ', data);
            res.send(data);
        }
    })
}); //end GET


/* POST REQUESTS */
router.post('/', isAuthenticated, (req, res) => {
    console.log(req.body, 'req');
    console.log('user ', req.user._id);
    let newFavorite = {
        favoriteName: req.body.properties.name,
        favoriteID: req.body.properties.id,
        favoriteLat: req.body.geometry.coordinates[0],
        favoriteLon: req.body.geometry.coordinates[1],
        user: req.user._id
    }
    let faveToSave = new Favorite(newFavorite);
    faveToSave.save()
        .then(() => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('err on post favorite ', err);
            res.sendStatus(500);
            next(err);
        });


}); // end post route

/* PUT REQUESTS */
router.put('/', (req, res) => {

});

/* DELETE REQUESTS */
router.delete('/:id', isAuthenticated, (req, res) => {
    // console.log('req  ', req);
    Favorite.remove(
        {'user': req.user._id,
        '_id': req.params.id},
        (err, data)=>{
            if (err) {
                console.log('error finding user for favorite delete ', err, 'err');
                res.sendStatus(500);
            } else {
                console.log('user found matching favorites ', data, 'data');
                res.send(data);
            }
        }
    
    
    )
});

/* MISC FUNCTIONS (If any) */


module.exports = router;