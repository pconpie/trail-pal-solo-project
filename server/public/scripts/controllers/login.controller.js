app.controller('LoginController', ['$location', 'UserService', function ($location, UserService) {
  console.log('LoginController created');
  var self = this;
  self.userLoggedIn = UserService.userLoggedIn;

  self.loginDialog = function () {
    UserService.loginDialog();
    console.log('login clicked');
  }
  self.user = {
    username: '',
    password: ''
  };

  self.userLoggedIn = UserService.userLoggedIn;
  self.logout = UserService.logout;
  // console.log('logged out, ');
  


}]);