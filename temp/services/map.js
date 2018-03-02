'use strict';

app.service('MapService', ['$http', '$mdToast', 'UserService', function ($http, $mdToast, UserService) {
    // console.log('MapService')
    var self = this;
    self.trailInfo = {};

    self.showSimpleToast = function () {
        $mdToast.show($mdToast.simple().textContent('Trail Favorited!').hideDelay(3000));
    };
    self.favorites = UserService.favorites;

    self.favoriteTrail = function (fave) {
        // console.log('IN map service favorite');
        // console.log('fave to post ', fave);
        // console.log('favorites ', self.favorites.list);
        var repeat = false;
        self.favorites.list.forEach(function (element) {
            if (element.faveTrailInfo.unique_id === fave.unique_id) {
                repeat = true;
            }
        });

        if (repeat == false) {
            return $http.post('/favorites', fave).then(function (response) {
                // console.log(response);
                if (response.status == 201) {
                    self.showSimpleToast();
                    // alert('This is a toast...Trail Favorited!');
                }
                return response.data;
            }).catch(function (err) {
                // console.log(err);
                swal('Error favoriting this trail! Please try again later.', '', 'warning');
            });
        } else {
            return new Promise(function (resolve, reject) {
                if (localStorage.getItem('loggedIn') == 'true') {
                    resolve('Repeat Fave');
                } else {
                    resolve('Must be logged in to add items!');
                }
            });
        }
    };

    self.getTrailInfo = function (lat, lon, id) {
        return $http.get('/geoInfo/single/' + lat + '/' + lon + '/' + id).then(function (response) {
            // console.log('get geoInfo response ', response);
            return response.data;
        }).catch(function (err) {
            // console.log('get geoInfo err ', err);
            swal('Error getting trail information from server! Please try again later.', '', 'warning');
        });
    };

    self.submitComment = function (comment) {
        // console.log('in submit comment ,', comment);
        return $http.post('/comments', comment).then(function (response) {
            // console.log(response);
            return response.data;
        }).catch(function (err) {
            // console.log(err);
            swal('Error submitting your comment! Please try again later.', '', 'warning');
        });
    };

    self.trailComments = {};
    self.getComments = function (trailID) {
        return $http.get('/comments/' + trailID).then(function (response) {
            self.trailComments.list = response.data;
            // console.log('get comments ', response.data);
            return response.data;
        }).catch(function (err) {
            // alert(err + '!');
            // console.log('err on get comments ', err);
            swal('Error getting comments! Please try again later.', '', 'warning');
        });
    };

    self.images = {};
    self.totalImages = {
        count: 0
    };
    self.showImages = function (id) {
        return $http.get('/images/trailImage/' + id).then(function (response) {
            self.images.list = response.data;
            self.totalImages.count = self.images.list.length;
            // console.log('total images ', self.totalImages.count);
            // console.log('get image response ', response);
        }).catch(function (err) {
            // console.log('get images err ', err);
            swal('Error getting trail pictures! Please try again later.', '', 'warning');
        });
    };

    self.saveTrailImage = function (trail, image) {
        return $http.post('/images/trailImage/' + trail, image).then(function (response) {
            // self.showImages();
            // console.log('save image response ', response);
        }).catch(function (err) {
            // console.log('err saving image ', err);
            swal('Error saving trail picture! Please try again later.', '', 'warning');
        });
    };
}]);
