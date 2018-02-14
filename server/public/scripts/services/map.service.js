app.service('MapService', ['$http', function ($http) {
    const self = this;
    self.trailInfo = {};

    // self.getFavorites = function (){
    //     $http.get('/favorites')
    //         .then((response)=>{
    //             console.log('get favorites ', response);
    //         })
    //         .catch((err)=>{
    //             console.log('err on get favorites ', err);
    //         })
    // }
    // self.getFavorites();
    self.favoriteTrail = function (fave) {
        console.log('IN map service favorite');
        $http.post('/favorites', fave)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    self.getTrailInfo = function (lat, lon, id) {
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