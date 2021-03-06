const express = require('express');
const encryptLib = require('../modules/encryption');
const Person = require('../models/Person');
const userStrategy = require('../strategies/user.strategy');
const isAuthenticated = require('../models/Authenticated');
const ProfilePicture = require('../models/ProfilePicture');


const router = express.Router();


// Handles Ajax request for user information if user is authenticated
router.get('/', (req, res) => {
  // check if logged in
  if (req.isAuthenticated()) {
    // send back user object from database
    res.send(req.user);
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const newPerson = new Person({ username, password });
  newPerson.save()
    .then((response)=>{
        console.log(response, 'from user save')
      let newProfilePicture = {
        user: response._id
    };
    let profilePictureToSave = new ProfilePicture(newProfilePicture);
    profilePictureToSave.save()
        .then(() => {
            console.log('success picture save default to new user')
        })
        .catch((err) => {
            console.log('err picture save default to new user', err);
        });
    })
    .then(() => { res.sendStatus(201); })
    .catch((err) => { next(err); });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.get('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.put('/', isAuthenticated, (req, res)=>{
  // console.log('req user ', req.body);
  Person.findByIdAndUpdate({
    '_id': req.user._id
}, {
    $set: {
        userFullName: req.body.userFullName
    }
}, (err, data) => {
    if (err) {
        console.log('error updating explored  ', err);
        res.sendStatus(500);
    } else {
        res.sendStatus(201);
    }
})})

module.exports = router;
