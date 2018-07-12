app.controller('LoginController', ['$location', 'UserService', function ($location, UserService) {
  // console.log('LoginController created');
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

  self.currentNavItem = UserService.currentNavItem;
  let menuIcon = document.getElementById('menu-icon');
  let navMenuLarge = document.getElementById('large-menu-nav');
  let navActive = false;
  self.logout = UserService.logout;
  self.loggedIn = UserService.loggedIn;
  self.myFunction = function() {
    menuIcon.classList.toggle("change");
    self.toggleNavMenu();
}
  self.toggleNavMenu = function () {
    navActive = !navActive;
    if (navActive) {
      navMenuLarge.style.display = 'block';
    } else {
      navMenuLarge.style.display = 'none';
    }
  }
}]);