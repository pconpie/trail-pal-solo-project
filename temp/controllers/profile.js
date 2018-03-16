'use strict';

app.controller('ProfileController', ['$location', 'UserService', '$route', function ($location, UserService, $route) {
    // console.log('ProfileController created');
    var self = this;
    self.userObject = UserService.userObject;
    self.pictureChosen = false;
    self.logout = UserService.logout;
    self.loggedIn = UserService.loggedIn;
    UserService.landingPage.is = false;

    self.favorites = UserService.favorites;

    if ($route.current.loadedTemplateUrl == "/views/profile.html") {
        UserService.currentNavItem.value = "profile";
    }

    self.profilePicture = UserService.profilePicture;
    var fsClient = filestack.init('ATXZUruRS5SwZq4htsjJwz');
    self.openPicker = function () {
        fsClient.pick({
            fromSources: ["local_file_system", "url", "imagesearch", "facebook", "instagram", "googledrive", "dropbox", "clouddrive"]
        }).then(function (response) {
            // console.log('response stack ', response.filesUploaded[0].url);
            var imageUrl = response.filesUploaded[0].url;
            //   handleFilestack(response);
            if (self.pictureChosen === true) {
                UserService.updateProfilePicture(response).then(UserService.getProfilePicture()).then(pictureCheck());
            } else if (self.pictureChosen === false) {
                UserService.saveProfilePicture(response).then(function (response) {
                    if (response.status == 201) {
                        self.getProfilePicture();
                    } else {
                        console.log('error saving picture'); //make alert
                        swal('Error saving new profile picture! Please try again later.', '', 'warning');
                    }
                }).then(pictureCheck());
            } else {
                // console.log('Something is messed up with profile pictures!');
                swal('Error saving new profile picture! Please try again later.', '', 'warning');
            }
        });
    };

    // pictureCheck();

    self.setUserFullName = function (userObject) {
        UserService.updateUserInfo(userObject);
    };

    function pictureCheck() {
        if (self.profilePicture.list) {
            self.pictureChosen = true;
            // console.log('HAZ PICTURE', self.pictureChosen);
        } else {
            self.pictureChosen = false;
            // console.log('NO PICTURE', self.pictureChosen);
        }
    }

    self.getProfilePicture = function () {
        UserService.getProfilePicture().then(function (response) {
            // console.log('some response ', response);
            // console.log('profile picture loaded', self.profilePicture);
            pictureCheck();
        }).catch(function () {
            swal('Error getting user profile picture! Please try again later.', '', 'warning');
        });
    };
    self.getProfilePicture();
}]);
