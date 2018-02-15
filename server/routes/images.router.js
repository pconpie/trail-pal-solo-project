const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const axios = require('axios');
const Image = require('../models/Image');


let isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.send('Must be logged in to add items!');
}

router.post('/', isAuthenticated, (req, res) => {
    let imageFile = req.body.filesUploaded[0];
    console.log('image ', imageFile);
    console.log('user ', req.user._id);
    let newImage = {
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

module.exports = router;