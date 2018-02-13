app.controller('LoginController', ['$http', '$location', 'UserService', function($http, $location, UserService) {
  console.log('LoginController created');
  var self = this;
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


}]);
