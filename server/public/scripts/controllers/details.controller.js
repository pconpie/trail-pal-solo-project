app.controller('DetailsController', ['$mdDialog', '$mdToast', '$http', 'MapService', 'UserService', '$routeParams', '$sce', function ($mdDialog, $mdToast, $http, MapService, UserService, $routeParams, $sce) {
    const self = this;
    console.log('in details controller');
    self.trailComments = MapService.trailComments;
    let lat = $routeParams.trail_lat;
    let lon = $routeParams.trail_lon;
    let id = $routeParams.id;
    self.getTrail = function () {
        MapService.getTrailInfo(lat, lon, id)
            .then(response => {
                console.log('response favorite ', response);
                self.trailInfo = response;
                // if (response.activities.length > 0) {
                //     let activities = response.activities;
                //     for (let i = 0; i < activities.length; i++) {
                //         const element = activities[i];
                //         console.log('activities, ', element);
                // }

            });
    }
    self.getTrail();

    self.renderHTML = function (html) {
        return $sce.trustAsHtml(html);
    };

    self.favoriteTrail = function () {
        MapService.favoriteTrail(self.trailInfo)
            .then((response) => {
                if (response == 'Must be logged in to add items!') {
                    swal('Must be logged in to favorite items! Please login or register to add favorites.', '', 'error', {
                        className: "error-alert",
                    });
                } else {
                    UserService.getFavorites()
                };
            });
    }

    self.comment = '';
    self.submitComment = function () {
        let comment = {};
        comment.comment = self.comment;
        comment.trailInfo = self.trailInfo;
        MapService.submitComment(comment)
            .then((response) => {
                if (response == 'Must be logged in to add items!') {
                    swal('Must be logged in to comment! Please login or register to add comments.', '', 'error', {
                        className: "error-alert",
                    });
                }
            });
        self.getComments(id);
        self.comment = '';
    }
    self.getComments = MapService.getComments;
    self.getComments(id);

    self.getCommentPictures = function () {
        UserService.getProfilePicture();
    }

    self.showImages = MapService.showImages;
    MapService.showImages(id);

    self.images = MapService.images;
    let fsClient = filestack.init('ATXZUruRS5SwZq4htsjJwz');
    self.openPicker = function () {
        fsClient.pick({
            fromSources: ["local_file_system", "url", "imagesearch", "facebook", "instagram", "googledrive", "dropbox", "clouddrive"]
        }).then((response) => {
            console.log('response stack ', response.filesUploaded[0].url);
            let imageUrl = response.filesUploaded[0].url;
            MapService.saveTrailImage(id, response).then(MapService.showImages(id));
        });
    }

    self.imagePosition = 0;
    self.imageBackward = function () {
        if (self.imagePosition === 0) {
            alert('No more images this direction');
        } else {
            self.imagePosition--;
        }
    }
    self.imageForward = function () {
        if (self.imagePosition === MapService.totalImages.count-1) {
            alert('No more images this direction');
        } else {
            self.imagePosition++;
        }
    }

    
}]);