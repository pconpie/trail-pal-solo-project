app.controller('ProfileController', ['$location', 'UserService', function ($location, UserService) {
    console.log('ProfileController created');
    var self = this;
    self.userObject = UserService.userObject;
    self.pictureChosen = false;
    self.logout = UserService.logout;
    self.loggedIn = UserService.loggedIn;


    self.profilePicture = UserService.profilePicture;
    let fsClient = filestack.init('ATXZUruRS5SwZq4htsjJwz');
    self.openPicker = function () {
        fsClient.pick({
            fromSources: ["local_file_system", "url", "imagesearch", "facebook", "instagram", "googledrive", "dropbox", "clouddrive"]
        }).then((response) => {
            console.log('response stack ', response.filesUploaded[0].url);
            let imageUrl = response.filesUploaded[0].url;
            //   handleFilestack(response);
            if (self.pictureChosen === true) {
                UserService.updateProfilePicture(response).then(UserService.getProfilePicture()).then(pictureCheck())
            } else if (self.pictureChosen === false) {
                UserService.saveProfilePicture(response).then((response) => {
                    if (response.status == 201) {
                        self.getProfilePicture()
                    } else {
                        console.log('error saving picture');//make alert
                    }
                }).then(pictureCheck());
            } else {
                console.log('Something is messed up with profile pictures!');
            }
        });
    }

    // pictureCheck();

    self.setUserFullName = function (userObject) {
        UserService.updateUserInfo(userObject);
    }

    function pictureCheck() {
        if (self.profilePicture.list) {
            self.pictureChosen = true;
            console.log('HAZ PICTURE', self.pictureChosen);
        } else {
            self.pictureChosen = false
            console.log('NO PICTURE', self.pictureChosen);
        }
    }

    self.getProfilePicture = function () {
        UserService.getProfilePicture()
            .then((response) => {
                // console.log('some response ', response);
                console.log('profile picture loaded', self.profilePicture);
                pictureCheck();

            });
    }
    self.getProfilePicture();

}]);