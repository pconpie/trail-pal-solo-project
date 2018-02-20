const ProfilePicture = require('../models/ProfilePicture');

function getProfilePicture(arrayOfComments) {
    return new Promise((resolve, reject) => {
        ProfilePicture.find({},
            (err, pictures) => {
                if (err) {
                    console.log('error getting pictures ', err);
                    reject(err);
                } else {
                    let result = [];
                    arrayOfComments.forEach(comment => {
                        pictures.forEach(picture => {
                            if (String(comment.comment.userPicture) == String(picture._id)) {
                                result.push({
                                    comment,
                                    picture
                                })
                            } else {
                                console.log('Comment'+comment.comment+'has no matching profile picture');
                            }
                        }); //end forEach
                    }); //end forEach
                    resolve(result);
                } //end else
            }) //end ProfilePicture find
    }); //end Promise
} //end getProfilePicture function

module.exports = getProfilePicture;