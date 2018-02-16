app.service('UserService', ['$http', '$location', '$mdDialog', function ($http, $location, $mdDialog) {
  console.log('UserService Loaded');
  var self = this;

  self.markExplored = function (fave) {
    fave.explored = !fave.explored;
    return $http.put(`/favorites`, fave)
      .then((response) => {
        self.getFavorites();
      })
      .catch((err) => {
        alert(`Error marking trail as explored! Please try again later.`)
        console.log('err from explore put ', err);
      });
  };
  
  self.loggedIn = {
    is: localStorage.getItem('loggedIn')
  };
  
  localStorage.getItem('loggedIn');

  self.favorites = {
    list: []
  };
  self.removeFavorite = function (fave) {
    let faveId = fave._id;
    return $http.delete(`/favorites/${faveId}`)
      .then((response) => {
          return response;
//        //Are your sure you want to delete here?
      })
      .catch((err) => {
        alert('Error deleting favorite! Please try again later.')
        console.log('delete favorite error ', err);
      });
  }

  self.getFavorites = function () {
    $http.get('/favorites')
      .then((response) => {
        console.log('got em!');
        self.favorites.list = response.data;
        return response.data;
      })
      .catch((err) => {
        alert(err + '!');
        console.log('err on get favorites ', err);
      });
  }

  if (localStorage.getItem('loggedIn') == 'true') {
    self.userObject = {
      loggedIn: true
    };
    self.getFavorites();

  } else {
    self.userObject = {
      loggedIn: false
    };
  }

  self.getuser = function () {
    console.log('UserService -- getuser');
    return $http.get('/api/user')
      .then(function (response) {
          if (response.data.username) {
            // user has a curret session on the server
            self.userObject.userName = response.data.username;
            console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
            return response.data;
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
    return $http.get('/api/user/logout')
      .then(function (response) {
        console.log('UserService -- logout -- logged out');
        self.userObject.loggedIn = false;
        localStorage.setItem('loggedIn', false);
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
        // alert(answer);
      }, function () {
        self.status = 'You cancelled the dialog.';
      });
  };

  self.message = '';

  function DialogController($mdDialog, UserService) {
    const self = this;
    self.displayLogin = true;
    self.userObject = UserService.userObject;
    self.switchView = function () {
      self.displayLogin = !self.displayLogin;
    }

    self.registerUser = function (user) {
      if (user.username === '' || user.password === '') {
        self.answer("Choose a username and password!");
      } else {
        console.log('sending to server...', user);
        return $http.post('/api/user/register', user)
          .then(function (response) {
              console.log('success');
              self.answer(`Successfully registered, you may now login!`);
              // $location.path('/home');
            },
            function (response) {
              console.log('error');
              self.answer("Something went wrong. Please try again.");
            });
      }
    }
    self.favorites = UserService.favorites;

    self.getFavorites = UserService.getFavorites;

    self.login = function (user) {
      console.log('user ', user);
      if (user.username === '' || user.password === '') {
        self.answer("Enter your username and password!");
      } else {
        console.log('sending login to server...', user);
        return $http.post('/api/user/login', user)
          .then(
            function (response) {
              if (response.status == 200) {
                self.userObject.loggedIn = true;
                localStorage.setItem('loggedIn', true);
                self.hide();
                $location.path('/favorites');
                self.getFavorites();
              } else {
                console.log('failure error post: ', response);
                self.answer("Incorrect credentials. Please try again.");
              }
            })
          .catch(function (response) {
            console.log('failure error: ', response);
            self.answer("Incorrect credentials. Please try again.");
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
      alert(answer);
      // $mdDialog.hide(answer);
    };
  }
}]);