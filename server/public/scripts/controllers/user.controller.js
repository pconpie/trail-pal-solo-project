app.controller('UserController', ['UserService', 'MapService', function (UserService, MapService) {
  console.log('UserController created');
  var self = this;
  self.favorites = UserService.favorites;
  console.log('self', self.favorites);
  UserService.getFavorites();
  self.userService = UserService;
  self.removeFavorite = function (fave) {
    // console.log('fave, ', fave);
    UserService.removeFavorite(fave)
      .then(()=>{UserService.getFavorites();
        self.getTrailInfo();
      });
  }

  self.userObject = UserService.userObject;

  // self.favoriteList = [];

  
  // self.getTrailInfo = function () {
  //   for (const trail of self.favorites.list) {
  //     MapService.getTrailInfo(trail.favoriteLat, trail.favoriteLon, trail.favoriteID)
  //       .then(response => {
  //         console.log('response ', response);
  //         // console.log('trail ', trail);
  //         trail.description = response.description;
  //         self.favoriteList.push(trail);
  //         // console.log('new trails list', self.favoriteList);
  //       })
  //   }

  // }
  // self.getTrailInfo();

  self.toggleExplored = function (fave) {
      UserService.markExplored(fave);
  };

}]);