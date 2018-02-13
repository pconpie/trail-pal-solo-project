app.service('UserService', ['$http', '$location', '$mdDialog', function ($http, $location, $mdDialog) {
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};
  self.userLoggedIn = true;

  self.getuser = function () {
    console.log('UserService -- getuser');
    $http.get('/api/user')
      .then(function (response) {
          if (response.data.username) {
            // user has a curret session on the server
            self.userObject.userName = response.data.username;
            console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
          } else {
            console.log('UserService -- getuser -- failure');
            // user has no session, bounce them back to the login page
            $location.path("/home");
          }
        },
        function (response) {
          console.log('UserService -- getuser -- failure: ', response);
          $location.path("/home");
        });
  }

  self.logout = function () {
    console.log('UserService -- logout');
    $http.get('/api/user/logout').then(function (response) {
      console.log('UserService -- logout -- logged out');
      self.userLoggedIn = false;
      $location.path("/map");
    });
  }

  self.loginDialog = function (ev) {
    $mdDialog.show({
        controller: DialogController,
        controllerAs: 'vm',
        templateUrl: '../views/dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
      })
      .then(function (answer) {
        alert('clicked');
      }, function () {
        self.status = 'You cancelled the dialog.';
      });
  };

  self.message = '';

  function DialogController($mdDialog, UserService) {
    const self = this;
    self.displayLogin = true;
    self.userLoggedIn = UserService.userLoggedIn;
    self.switchView = function () {
      console.log('switch');
      self.displayLogin = !self.displayLogin;
      console.log(self.displayLogin);

    }
    
    self.registerUser = function (user) {
      if (user.username === '' || user.password === '') {
        self.message = "Choose a username and password!";
      } else {
        console.log('sending to server...', user);
        $http.post('/api/user/register', user)
          .then(function (response) {
              console.log('success');
              // $location.path('/home');
            },
            function (response) {
              console.log('error');
              self.message = "Something went wrong. Please try again."
            });
      }
    }

    self.login = function (user) {
      console.log('user ', user);
      if (user.username === '' || user.password === '') {
        self.message = "Enter your username and password!";
      } else {
        console.log('sending login to server...', user);
        $http.post('/api/user/login', user).then(
            function (response) {
              if (response.status == 200) {
                console.log('success: ', response.data);
                // location works with SPA (ng-route)
                console.log('user', self.userLoggedIn);
                self.userLoggedIn = !self.userLoggedIn;
                console.log('user', self.userLoggedIn);
                $location.path('/favorites');
              } else {
                console.log('failure error post: ', response);
                self.message = "Incorrect credentials. Please try again.";
              }
            })
          .catch(function (response) {
            console.log('failure error: ', response);
            self.message = "Incorrect credentials. Please try again.";
          });
      }

    };
    self.hide = function () {
      $mdDialog.hide();
    };

    self.cancel = function () {
      $mdDialog.cancel();
    };

    self.answer = function (answer) {
      console.log('answer', answer);
      $mdDialog.hide(answer);
    };
  }
}]);