app.service('MapService', ['$http', function ($http) {
    const self = this;
    self.trailInfo = {};

    self.favoriteTrail = function (fave) {
        console.log('IN map service favorite');
        return $http.post('/favorites', fave)
            .then((response) => {
                console.log(response);
                return response.data;
            })
            .catch((err) => {
                console.log(err);
                alert(`Error favoriting this trail! Please try again later.`);
            })
    }

    self.getTrailInfo = function (lat, lon, id) {
        return $http.get(`/geoInfo/single/${lat}/${lon}/${id}`)
            .then((response) => {
                // console.log('get geoInfo response ', response);
                return response.data;
            })
            .catch((err) => {
                console.log('get geoInfo err ', err);
                alert(`Error getting trail info from server! Please try again later.`);
            })
    }

    self.submitComment = function (comment) {
        console.log('in submit comment ,', comment);
        return $http.post('/comments', comment)
            .then((response) => {
                console.log(response);
                return response.data;
            })
            .catch((err) => {
                console.log(err);
                alert(`Error submitting your comment! Please try again later.`);
            })
    }

    self.trailComments = {};
    self.getComments = function (trailID) {
        return $http.get(`/comments/${trailID}`)
            .then((response) => {
                self.trailComments.list = response.data;
                console.log('get comments ', response.data);
                return response.data;

            })
            .catch((err) => {
                alert(err + '!');
                console.log('err on get comments ', err);
            })
    }

    self.saveTrailImage = function (image) {
        return $http.post('/images', image)
            .then((response) => {
                console.log('save image response ', response);
            })
            .catch((err) => {
                console.log('err saving image ', err);
            });

    }
}]);