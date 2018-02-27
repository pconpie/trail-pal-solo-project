app.service('MapService', ['$http', '$mdToast', 'UserService', function ($http, $mdToast, UserService) {
    console.log('MapService')
    const self = this;
    self.trailInfo = {};

    self.showSimpleToast = function () {
        $mdToast.show(
            $mdToast.simple()
            .textContent('Trail Favorited!')
            .hideDelay(3000)
        );
    };
    self.favorites = UserService.favorites;


    self.favoriteTrail = function (fave) {
        console.log('IN map service favorite');
        console.log('fave to post ', fave);
        console.log('favorites ', self.favorites.list);
        let repeat = false;
        self.favorites.list.forEach(element => {
            if (element.faveTrailInfo.unique_id === fave.unique_id) {
                repeat = true;
            }
        });

        if (repeat == false) {
            return $http.post('/favorites', fave)
                .then((response) => {
                    console.log(response);
                    if (response.status == 201) {
                        self.showSimpleToast();
                        // alert('This is a toast...Trail Favorited!');
                    }
                    return response.data;
                })
                .catch((err) => {
                    console.log(err);
                    alert(`Error favoriting this trail! Please try again later.`);
                })
        } else {
            return new Promise((resolve, reject) => {
                if  (localStorage.getItem('loggedIn') == 'true'){
                resolve('Repeat Fave');
                } else {
                    resolve('Must be logged in to add items!');

                }
            });
        }
    }



    self.getTrailInfo = function (lat, lon, id) {
        return $http.get(`/geoInfo/single/${lat}/${lon}/${id}`)
            .then((response) => {
                console.log('get geoInfo response ', response);
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
                // alert(err + '!');
                console.log('err on get comments ', err);
            })
    }

    self.images = {};
    self.totalImages = {
        count: 0
    };
    self.showImages = function (id) {
        return $http.get(`/images/trailImage/${id}`)
            .then((response) => {
                self.images.list = response.data;
                self.totalImages.count = self.images.list.length;
                console.log('total images ', self.totalImages.count);
                console.log('get image response ', response);
            })
            .catch((err) => {
                console.log('get images err ', err);
            })
    }

    self.saveTrailImage = function (trail, image) {
        return $http.post(`/images/trailImage/${trail}`, image)
            .then((response) => {
                // self.showImages();
                console.log('save image response ', response);
            })
            .catch((err) => {
                console.log('err saving image ', err);
            });

    }
}]);