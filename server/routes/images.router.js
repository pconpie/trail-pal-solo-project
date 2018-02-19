const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const axios = require('axios');
const Image = require('../models/Image');
const ProfilePicture = require('../models/ProfilePicture');


let isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.send('Must be logged in to add items!');
}

router.get('/trailImage/:id', (req, res) => {
    // console.log('user ', req.user._id);
    let trailId = req.params.id;
    Image.find({
        'trailId': trailId
    }, (err, data) => {
        if (err) {
            console.log('MongoDB error on get images', err);
            res.sendStatus(500);
        } else {
            console.log('Found images, ', data);
            res.send(data);
        }
    })
}); //end GET
router.get('/user', (req, res) => {
    // console.log('user ', req.user._id);
    let userId = req.user._id;
    ProfilePicture.find({
        'userId': userId
    }, (err, data) => {
        if (err) {
            console.log('MongoDB error on get profile images', err);
            res.sendStatus(500);
        } else {
            console.log('Found profile images, ', data);
            res.send(data);
        }
    })
}); //end GET

router.post('/trailImage/:trailId', isAuthenticated, (req, res) => {
    let imageFile = req.body.filesUploaded[0];
    let trailId = req.params.trailId;
    console.log('image ', imageFile);
    console.log('user ', req.user._id);
    let newImage = {
        trailId,
        imageUrl: imageFile.url,
        imageName: imageFile.filename,
        user: req.user._id
    };
    let imageToSave = new Image(newImage);
    imageToSave.save()
        .then(() => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('err on post image ', err);
            res.sendStatus(500);
        });
});

router.post('/user', isAuthenticated, (req, res) => {
    let imageFile = req.body.filesUploaded[0];
    let userId = req.user._id;
    console.log('image ', imageFile);
    console.log('user ', req.user._id);
    let newProfilePicture = {
        userId,
        imageUrl: imageFile.url,
        imageName: imageFile.filename,
        user: req.user._id
    };
    let profilePictureToSave = new ProfilePicture(newProfilePicture);
    profilePictureToSave.save()
        .then(() => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('err on post image ', err);
            res.sendStatus(500);
        });
});

module.exports = router;