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
            UserService.saveProfilePicture(response).then(UserService.getProfilePicture()).then(self.getProfilePicture());
        });
    }

    self.pictureChosen = false;
    function pictureCheck() {
        if (self.profilePicture.list.length > 0) {
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
                console.log('picture ', self.profilePicture);
                pictureCheck();
            });
    }
    self.getProfilePicture();
}]);