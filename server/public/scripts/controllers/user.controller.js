app.controller('UserController', ['UserService', 'MapService', function(UserService, MapService) {
  console.log('UserController created');
  var self = this;
  self.favorites = UserService.favorites;
  console.log('self', self.favorites);
  
  self.userService = UserService;
  self.userObject = UserService.userObject;
}]);
