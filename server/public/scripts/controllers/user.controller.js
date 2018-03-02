app.controller('UserController', ['UserService', 'MapService', '$route', function (UserService, MapService, $route) {
  // console.log('UserController created');
  var self = this;
  self.favorites = UserService.favorites;
  // UserService.getFavorites();
  UserService.landingPage.is = false;
  self.userService = UserService;
  self.removeFavorite = function (fave) {
    // console.log('fave, ', fave);
    swal({
        title: "Are you sure you want to delete this favorite?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        className: "warning-alert"
      })
      .then((willDelete) => {
        if (willDelete) {
          UserService.removeFavorite(fave)
            .then(() => {
              UserService.getFavorites()
            });
            getFavesAndPictures();
          swal({
            title: "Your favorite has been removed!",
            className: "warning-alert"
          });
        } else {
          swal({
            title: "Your favorite was not deleted!",
            className: "warning-alert"
          });
        }
      });

  }

  if ($route.current.loadedTemplateUrl == "/views/favorites.html") {
    UserService.currentNavItem.value = "favorites";
  }

  self.userObject = UserService.userObject;
  self.images = MapService.images;
  self.totalImages = MapService.totalImages;

  self.toggleExplored = function (fave) {
    UserService.markExplored(fave)
      .then(() => {
        getFavesAndPictures();
      })
      .catch(()=>{
        swal('Error toggling trail as explored! Please try again later.', '', 'warning');
      });
  };

  function getFavesAndPictures() {
    UserService.getFavorites()
      .then((response) => {
        // console.log(response, 'stuff')
        for (trail of response) {
          MapService.showImages(trail.faveTrailInfo.unique_id);
        }
      })
      .catch((err) => {
        // console.log('error getting favorites ');
        swal('Error getting favorite pictures! Please try again later.', '', 'warning');
      });
  }
  getFavesAndPictures();

  self.rateTrail = function (trail, rating) {
    // console.log('trail ', trail, 'rating ', rating);
    UserService.rateTrail(trail, rating)
      .then(() => {
        getFavesAndPictures();
      })
      .catch(()=>{
        swal('Error rating trail! Please try again later.', '', 'warning');
      })
  }
  // self.imagePosition = 0;
  // self.imageBackward = function(){
  //   self.imagePosition--;
  // }
  // self.imageForward = function(){
  //   self.imagePosition++;
  // }
}]);