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
        UserService.getFavorites()
      });
  }

  self.userObject = UserService.userObject;
  self.images = MapService.images;

  self.toggleExplored = function (fave) {
    UserService.markExplored(fave);
  };

  UserService.getFavorites()
    .then((response)=>{
      console.log(response)
      for(trail of response){
        MapService.showImages(trail.faveTrailInfo.unique_id);
      }
    })
    .catch((err)=>{
      console.log('fucking err ', err)
    });

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