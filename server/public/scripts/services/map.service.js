app.service('MapService', ['$http', function ($http) {
    const self = this;
    self.trailInfo = {};
    
    self.getTrailInfo = function(lat, lon, id){
        return $http.get(`/geoInfo/single/${lat}/${lon}/${id}`)
           .then((response) => {
                console.log('get geoInfo response ', response);
                return response.data;
                })
            .catch((err) => {
                console.log('get geoInfo err ', err);
            })
     }

}]);