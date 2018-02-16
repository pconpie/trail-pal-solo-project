app.controller('DetailsController', ['$mdDialog', '$http', 'MapService', '$routeParams', '$sce', function ($mdDialog, $http, MapService, $routeParams, $sce) {
    const self = this;
    console.log('in details controller');
    self.trailComments = MapService.trailComments;
    self.trailName = '';
    self.trailDescription = '';
    let lat = $routeParams.trail_lat;
    let lon = $routeParams.trail_lon;
    let id = $routeParams.id;
    self.getTrail = function () {
        MapService.getTrailInfo(lat, lon, id)
            .then(response => {
                console.log('response favorite ', response);
                self.trailInfo = response;
                self.trailName = self.trailInfo.name;
                self.trailDescription = self.trailInfo.description;
                // if (response.activities.length > 0) {
                //     let activities = response.activities;
                //     for (let i = 0; i < activities.length; i++) {
                //         const element = activities[i];
                //         console.log('activities, ', element);
                // }

            });
    }

    self.renderHTML = function (html){
        return $sce.trustAsHtml(html);
    };

    self.favoriteTrail = function () {
        MapService.favoriteTrail(self.trailInfo)
            .then((response)=>{
                if (response == 'Must be logged in to add items!') {
                    alert('Must be logged in to favorite items! Please login or register to add favorites.');
                }
            });
    }

    self.getTrail();
    self.comment = '';
    self.submitComment = function () {
        let comment = {};
        comment.comment = self.comment;
        comment.trailInfo = self.trailInfo;
        MapService.submitComment(comment)
            .then((response)=>{
                if (response == 'Must be logged in to add items!') {
                    alert('Must be logged in to comment! Please login or register to add comments.');
                }
            });
        self.getComments(id);
        self.comment = '';
    }
    self.getComments = MapService.getComments;
    self.getComments(id);

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
            //   handleFilestack(response);
            MapService.saveTrailImage(id, response).then(MapService.showImages(id));
        });
    }
}]);