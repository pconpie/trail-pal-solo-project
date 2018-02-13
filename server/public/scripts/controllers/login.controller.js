app.controller('LoginController', ['$location', 'UserService', function ($location, UserService) {
  console.log('LoginController created');
  var self = this;
  self.userObject = UserService.userObject;

  self.loginDialog = function () {
    UserService.loginDialog();
    console.log('user logged', self.userObject.loggedIn);
    
    console.log('login clicked');
  }
  self.user = {
    username: '',
    password: ''
  };

  self.logout = UserService.logout;
  // console.log('logged out, ');
  


}]);