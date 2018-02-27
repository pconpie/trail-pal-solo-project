const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const axios = require('axios');
const Favorite = require('../models/Favorite');
const isAuthenticated = require('../models/Authenticated');

/* GET REQUESTS */

router.get('/', isAuthenticated, (req, res) => {
    // console.log('user ', req.user._id);
    let userId = req.user._id;
    Favorite.find({
        'user': userId
    }, (err, data) => {
        if (err) {
            console.log('MongoDB error on get faves', err);
            res.sendStatus(500);
        } else {
            // console.log('Found Faves, ', data);
            res.send(data);
        }
    })
}); //end GET


/* POST REQUESTS */
router.post('/', isAuthenticated, (req, res) => {

    // let newFavorite = {};
    // if (req.body.properties) {
    //     newFavorite = {
    //         favoriteName: req.body.properties.name,
    //         favoriteID: req.body.properties.id,
    //         favoriteLat: req.body.geometry.coordinates[0],
    //         favoriteLon: req.body.geometry.coordinates[1],
    //         user: req.user._id
    //     }
    // } else {
    //     newFavorite = {
    //         favoriteName: req.body.name,
    //         favoriteID: req.body.unique_id,
    //         favoriteLat: req.body.lat,
    //         favoriteLon: req.body.lon,
    //         user: req.user._id
    //     }
    // }
    let newFavorite = {
        faveTrailInfo: req.body,
        user: req.user._id
    }
    let faveToSave = new Favorite(newFavorite);
    faveToSave.save()
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('err on post favorite ', err);
            res.sendStatus(500);
            next(err);
        });


}); // end post route

/* PUT REQUESTS */
router.put('/', isAuthenticated, (req, res) => {
    // console.log('req.body ', req.body);
    let newFavorite = new Favorite(req.body);
    let explored = newFavorite.explored;
    Favorite.findByIdAndUpdate({
        '_id': req.body._id
    }, {
        $set: {
            explored: explored
        }
    }, (err, data) => {
        if (err) {
            console.log('error updating explored  ', err);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    })
});
router.put('/rating', isAuthenticated, (req, res) => {
    // console.log('req.body rating ', req.body);
    let ratedFavorite = req.body.trail;
    ratedFavorite.rating = req.body.rating;
    let newFavorite = new Favorite(ratedFavorite);
    let rating = ratedFavorite.rating;
    Favorite.findByIdAndUpdate({
        '_id': ratedFavorite._id
    }, {
        $set: {
            rating: rating
        }
    }, (err, data) => {
        if (err) {
            console.log('error updating explored  ', err);
            res.sendStatus(500);
        } else {
            // console.log('updated rating ', data);
            res.sendStatus(201);
        }
    })
});

/* DELETE REQUESTS */
router.delete('/:id', isAuthenticated, (req, res) => {
    // console.log('req  ', req);
    Favorite.remove({
            'user': req.user._id,
            '_id': req.params.id
        },
        (err, data) => {
            if (err) {
                console.log('error finding user for favorite delete ', err)
                res.sendStatus(500);
            } else {
                res.send(data);
            };
        });
});

/* MISC FUNCTIONS (If any) */


module.exports = router;