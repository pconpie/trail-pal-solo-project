app.service('UserService', ['$http', '$location', '$mdDialog', function ($http, $location, $mdDialog) {
  console.log('UserService Loaded');
  var self = this;
  self.markExplored = function(fave){
    fave.explored = !fave.explored;
    console.log('fave.explored ', fave.explored);
    $http.put(`/favorites`, fave)
      .then((response)=>{
        self.getFavorites();
      })
      .catch((err)=>{
        console.log('err from explore put ', err);
      });
  };

  localStorage.getItem('loggedIn');
  // console.log(localStorage.getItem('loggedIn'));
  
  self.favorites = { list: [] };
  self.removeFavorite = function (fave) {
    let faveId = fave._id;
    $http.delete(`/favorites/${faveId}`)
      .then((response)=>{
        self.getFavorites();
        console.log('delete favorite response ', response);
      })
      .catch((err)=>{
        alert('Error deleting favorite! Please try again later.')
        console.log('delete favorite error ', err);
      })
  }

  self.getFavorites = function () {
    $http.get('/favorites')
      .then((response) => {
        self.favorites.list = response.data;
        console.log('get favorites ', response);
      })
      .catch((err) => {
        alert(err + '!');
        console.log('err on get favorites ', err);
      })
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
      self.userObject.loggedIn = false;
      $location.path("/");
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
    self.userObject = UserService.userObject;
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
    self.favorites = UserService.favorites;

    self.getFavorites = UserService.getFavorites;

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
                console.log('user', self.userObject.loggedIn);
                self.userObject.loggedIn = true;
                localStorage.setItem('loggedIn', true);
                console.log('user', self.userObject.loggedIn);
                self.hide();
                $location.path('/favorites');
                self.getFavorites();
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