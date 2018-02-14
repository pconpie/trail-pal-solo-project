const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const axios = require('axios');
const Comment = require('../models/Comment');
const Person = require('../models/Person');


let isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.send('Must be logged in to add items!');
}

/* GET REQUESTS */

router.get('/:trailId', (req, res) => {
    console.log('get comments trail id ', req.params.trailId);
    // let trailID = req.body;
    let userId = req.user._id;
    Comment.find({
        'trailID': req.params.trailId
    }, (err, data) => {
        if (err) {
            console.log('MongoDB error on get comments', err);
            res.sendStatus(500);
        } else {
            console.log('Found comments, ', data);
            Person.find({
            }, (err, users) => {
                if (err) {
                    console.log('MongoDB error on get users of comment', err);
                    res.sendStatus(500);
                } else {
                    // console.log('found comment user ', users);
                    let result = [];
                    data.forEach(comment => {
                        users.forEach(user => {
                            if (String(comment.user) == String(user._id)) {
                                result.push({comment, user})
                            }
                        });
                    });
                    res.send(result);
                }
            })
        }
    })
}); //end GET


/* POST REQUESTS */
router.post('/', isAuthenticated, (req, res) => {
    console.log(req.body, 'req');
    console.log('user ', req.user._id);
    let newComment = {
        trailName: req.body.trailInfo.name,
        trailID: req.body.trailInfo.unique_id,
        trailLat: req.body.trailInfo.lat,
        trailLon: req.body.trailInfo.lon,
        comment: req.body.comment,
        user: req.user._id
    }

    let commentToSave = new Comment(newComment);
    commentToSave.save()
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
router.delete('/', (req, res) => {

});

/* MISC FUNCTIONS (If any) */


module.exports = router;