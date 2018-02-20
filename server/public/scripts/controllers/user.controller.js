app.controller('UserController', ['UserService', 'MapService', function (UserService, MapService) {
  console.log('UserController created');
  var self = this;
  self.favorites = UserService.favorites;
  // UserService.getFavorites();
  self.userService = UserService;
  self.removeFavorite = function (fave) {
    // console.log('fave, ', fave);
    UserService.removeFavorite(fave)
      .then(() => {
        UserService.getFavorites();
      });
  }

  self.userObject = UserService.userObject;

  self.toggleExplored = function (fave) {
    UserService.markExplored(fave);
  };

  self.rateTrail = function (trail, rating){
    console.log('trail ', trail, 'rating ', rating);
    UserService.rateTrail(trail, rating);
  }
  // self.imagePosition = 0;
  // self.imageBackward = function(){
  //   self.imagePosition--;
  // }
  // self.imageForward = function(){
  //   self.imagePosition++;
  // }
}]);