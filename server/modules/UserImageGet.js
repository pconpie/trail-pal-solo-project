// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// const axios = require('axios');
const ProfilePicture = require('../models/ProfilePicture');

function userImageGet(req, res) {
    // console.log('user ', req.user._id);
    return new Promise((resolve, reject)=>{
        let userId = req.user._id;
        ProfilePicture.find({
            'userId': userId
        }, (err, data) => {
            if (err) {
                console.log('MongoDB error on get profile images', err);
                reject(err);
            } else {
                let newestPicture = data[data.length-1];
                console.log('last picture ', newestPicture);
                 resolve(newestPicture);
            }
        })
    })
  
}

module.exports = userImageGet;