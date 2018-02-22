const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const axios = require('axios');
const Comment = require('../models/Comment');
const Person = require('../models/Person');
const UserImageGet = require('../modules/UserImageGet');
const getProfilePicture = require('../modules/getProfilePicture');
const isAuthenticated = require('../models/Authenticated');

/* GET REQUESTS */

router.get('/:trailId', (req, res) => {
    // console.log('get comments trail id ', req.params.trailId);
    // let trailID = req.body;
    // let userId = req.user._id;
    Comment.find({
        'trailID': req.params.trailId
    }, (err, data) => {
        if (err) {
            console.log('MongoDB error on get comments', err);
            res.sendStatus(500);
        } else {
            // console.log('Found comments, ', data);
            Person.find({}, (err, users) => {
                if (err) {
                    console.log('MongoDB error on get users of comment', err);
                    res.sendStatus(500);
                } else {
                    // console.log('found comment user ', users);
                    let result = [];
                    data.forEach(comment => {
                        users.forEach(user => {
                            if (String(comment.user) == String(user._id)) {
                                result.push({
                                    comment,
                                    user
                                })
                            }
                        });
                    });
                    getProfilePicture(result).then((response) => {
                        res.send(response)
                    }).catch((err) => {
                        console.log('error getting pics ', err)
                    });

                    // res.send(getProfilePicture(result));
                }
            })
        }
    })
}); //end GET

/* POST REQUESTS */
router.post('/', isAuthenticated, (req, res) => {
    UserImageGet(req)
        .then((response) => {
            // let userPicture = response;
            let newComment = {
                trailName: req.body.trailInfo.name,
                trailID: req.body.trailInfo.unique_id,
                trailLat: req.body.trailInfo.lat,
                trailLon: req.body.trailInfo.lon,
                comment: req.body.comment,
                userPicture: response._id,
                user: req.user._id
            }
            // console.log('comment info, ', userPicture, 'and ', newComment);

            let commentToSave = new Comment(newComment);
            commentToSave.save()
                .then(() => {
                    res.sendStatus(201);
                })
                .catch((err) => {
                    console.log('err on post favorite ', err);
                    res.sendStatus(500);
                    // next(err);
                });
        })
        .catch((err) => {
            console.log('promise err ', err);
            res.sendStatus(500);
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