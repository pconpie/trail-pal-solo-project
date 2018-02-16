app.controller('LoginController', ['$location', 'UserService', function ($location, UserService) {
  console.log('LoginController created');
  var self = this;
  self.userObject = UserService.userObject;

  self.loginDialog = function () {
    UserService.loginDialog();
    // console.log('user logged', self.userObject.loggedIn);
  }
  self.user = {
    username: '',
    password: ''
  };

  self.logout = UserService.logout;
  self.loggedIn = UserService.loggedIn;
}]);