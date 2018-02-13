app.controller('DetailsController', ['$mdDialog', '$http', 'MapService', '$routeParams', function ($mdDialog, $http, MapService, $routeParams) {
    const self = this;
    console.log('in details controller');
    self.trailName = '';
    self.trailDescription = '';
    let lat = $routeParams.trail_lat;
    let lon = $routeParams.trail_lon;
    let id = $routeParams.id;
    self.getTrail = function () {
        MapService.getTrailInfo(lat, lon, id)
            .then(response =>{
                console.log('response ', response);
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
    self.getTrail();

}]);
