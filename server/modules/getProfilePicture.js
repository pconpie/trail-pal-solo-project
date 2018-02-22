const ProfilePicture = require('../models/ProfilePicture');
const Comment = require('../models/Comment');


function getProfilePicture(arrayOfComments) {
    return new Promise((resolve, reject) => {
        console.log('array of ', arrayOfComments);
        let result = [];
        ProfilePicture.find({},
            (err, pictures) => {
                if (err) {
                    console.log('error getting pictures ', err);
                    reject(err);
                } else {
                    let result = [];
                    arrayOfComments.forEach(comment => {
                        pictures.forEach(picture => {
                            console.log('the thing', comment.comment.userPicture)
                            if (String(comment.comment.userPicture) == 'null' || String(comment.comment.userPicture) == 'undefined'){
                                result.push({
                                    comment
                                })
                            } else if (String(comment.comment.userPicture) == String(picture._id)) {
                                result.push({
                                    comment,
                                    picture
                                })
                            } else {
                                // console.log('Comment'+comment.comment+'has no matching profile picture');
                            }
                        }); //end forEach
                    }); //end forEach
                    console.log('RESULT ', result, 'RESULT')
                    resolve(result); 
                } //end else
            }) //end ProfilePicture find
               
    }); //end Promise
} //end getProfilePicture function


module.exports = getProfilePicture;

// arrayOfComments.forEach(comment => {
//             if (typeof comment.userPicture === 'undefined'){
//                 console.log('picture is null')
//                 result.push({comment});
//             } else {
//                 console.log('HEEEEY')
//                 ProfilePicture.find({},
//                     (err, pictures) => {
//                         if (err) {
//                             console.log('error getting pictures ', err);
//                             reject(err);
//                         } else {
//                             pictures.forEach(picture => {
//                                 if (String(comment.comment.userPicture) == String(picture._id)) {
//                                     result.push({
//                                         comment,
//                                         picture
//                                     })
//                                 } else {
//                                     // console.log('Comment'+comment.comment+'has no matching profile picture');
//                                 }
//                             }); //end forEach
//                         }
//                 })
//             }
//         }); //end forEach
