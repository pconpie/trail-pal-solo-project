'use strict';

app.controller('UserController', ['UserService', 'MapService', function (UserService, MapService) {
  console.log('UserController created');
  var self = this;
  self.favorites = UserService.favorites;
  // UserService.getFavorites();
  self.userService = UserService;
  self.removeFavorite = function (fave) {
    // console.log('fave, ', fave);
    UserService.removeFavorite(fave).then(function () {
      UserService.getFavorites();
    });
  };

  self.userObject = UserService.userObject;
  self.images = MapService.images;

  self.toggleExplored = function (fave) {
    UserService.markExplored(fave).then(function () {
      getFavesAndPictures();
    });
  };

  function getFavesAndPictures() {
    UserService.getFavorites().then(function (response) {
      console.log(response);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = response[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          trail = _step.value;

          MapService.showImages(trail.faveTrailInfo.unique_id);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }).catch(function (err) {
      console.log('fucking err ', err);
    });
  }
  getFavesAndPictures();

  self.rateTrail = function (trail, rating) {
    console.log('trail ', trail, 'rating ', rating);
    UserService.rateTrail(trail, rating);
  };
  // self.imagePosition = 0;
  // self.imageBackward = function(){
  //   self.imagePosition--;
  // }
  // self.imageForward = function(){
  //   self.imagePosition++;
  // }
}]);
