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

    self.submitComment = function (comment){
        console.log('in submit comment ,', comment);
        $http.post('/comments', comment)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    self.trailComments = {};
    self.getComments = function (trailID) {
        $http.get(`/comments/${trailID}`)
          .then((response) => {
            self.trailComments.list = response.data;
            console.log('get comments ', response.data);
          })
          .catch((err) => {
            alert(err + '!');
            console.log('err on get comments ', err);
          })
      }

}]);