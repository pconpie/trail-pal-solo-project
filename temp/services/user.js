'use strict';

app.service('UserService', ['$http', '$location', '$mdDialog', function ($http, $location, $mdDialog) {
  // console.log('UserService Loaded');
  var self = this;
  self.landingPage = {
    is: false
  };
  self.currentNavItem = {
    value: ""
  };

  self.rateTrail = function (trail, rating) {
    var newTrailRating = {
      trail: trail,
      rating: rating
    };

    return $http.put('/favorites/rating', newTrailRating).then(function (response) {
      // self.newTrailRating.rating = 
      self.getFavorites();
    }).catch(function (err) {
      swal('Error marking trail as explored! Please try again later.', '', 'error', {
        className: "error-alert"
      });
      // console.log('err from explore put ', err);
    });
  };

  self.markExplored = function (fave) {
    fave.explored = !fave.explored;
    return $http.put('/favorites', fave).then(function (response) {
      self.getFavorites();
    }).catch(function (err) {
      swal('Error marking trail as explored! Please try again later.', '', 'error', {
        className: "error-alert"
      });
      // console.log('err from explore put ', err);
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
    var faveId = fave._id;
    return $http.delete('/favorites/' + faveId).then(function (response) {
      return response;
      //Are your sure you want to delete here?
    }).catch(function (err) {
      swal('Error deleting favorite! Please try again later.', '', 'error', {
        className: "error-alert"
      });
      // console.log('delete favorite error ', err);
    });
  };

  self.getFavorites = function () {
    return $http.get('/favorites').then(function (response) {
      // console.log('got all favorites!', response.data);
      self.favorites.list = response.data;
      return response.data;
    }).catch(function (err) {
      swal(err + '!', '', 'error', {
        className: "error-alert"
      });
      // console.log('err on get favorites ', err);
    });
  };

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
    // console.log('UserService -- getuser');
    return $http.get('/api/user').then(function (response) {
      if (response.data.username) {
        // user has a curret session on the server
        self.userObject.userName = response.data.username;
        self.userObject.userFullName = response.data.userFullName;
        // console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
        return response.data;
      } else {
        // console.log('UserService -- getuser -- failure');
        swal('Error getting user information! Please try again later.', '', 'warning');
        // user has no session, bounce them back to the login page
        $location.path("/home");
      }
    }, function (response) {
      // console.log('UserService -- getuser -- failure: ', response);
      swal('Error getting user information! Please try again later.', '', 'warning');
      $location.path("/home");
    });
  };

  self.logout = function () {
    // console.log('UserService -- logout');
    return $http.get('/api/user/logout').then(function (response) {
      // console.log('UserService -- logout -- logged out');
      self.userObject.loggedIn = false;
      localStorage.setItem('loggedIn', false);
      $location.path("/map");
    });
  };

  self.loginDialog = function (ev) {
    $mdDialog.show({
      controller: DialogController,
      controllerAs: 'vm',
      templateUrl: '../views/dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    }).then(function (answer) {
      // swal(answer);
    }, function () {
      self.status = 'You cancelled the dialog.';
    });
  };

  self.message = '';

  function DialogController($mdDialog, UserService) {
    var self = this;
    self.displayLogin = true;
    self.userObject = UserService.userObject;
    self.switchView = function () {
      self.displayLogin = !self.displayLogin;
    };

    self.registerUser = function (user) {
      if (user === undefined || user.username === '' || user.password === '') {
        self.error("Choose a username and password!");
      } else {
        // console.log('sending to server...', user);
        return $http.post('/api/user/register', user).then(function (response) {
          // console.log('success');
          self.success('Successfully registered, you may now login!');
          // $location.path('/home');
        }, function (response) {
          // console.log('error');
          self.error("Username is taken. Please pick a new username and try again.");
        });
      }
    };

    self.favorites = UserService.favorites;

    self.getFavorites = UserService.getFavorites;

    self.login = function (user) {
      // console.log('user ', user);
      if (user === undefined || user.username === '' || user.password === '') {
        self.error("Enter your username and password!");
      } else {
        // console.log('sending login to server...', user);
        return $http.post('/api/user/login', user).then(function (response) {
          if (response.status == 200) {
            self.userObject.loggedIn = true;
            localStorage.setItem('loggedIn', true);
            self.hide();
            // $location.path('/profile');
            self.getFavorites();
          } else {
            // console.log('failure error post: ', response);
            self.error("Incorrect credentials. Please try again.");
          }
        }).catch(function (response) {
          // console.log('failure error: ', response);
          self.error("Incorrect credentials. Please try again.");
        });
      }
    };
    self.hide = function () {
      $mdDialog.hide();
    };

    self.cancel = function () {
      $mdDialog.cancel();
    };

    self.success = function (answer) {
      // console.log('answer', answer);
      swal(answer, '', {
        className: "success-alert"
      });
      // $mdDialog.hide(answer);
    };
    self.error = function (answer) {
      // console.log('answer', answer);
      swal(answer, '', 'error', {
        className: "error-alert"
      });
      // $mdDialog.hide(answer);
    };
  } //end DialogController

  self.profilePicture = {};
  self.getProfilePicture = function () {
    return $http.get('/images/user').then(function (response) {
      self.profilePicture.list = response.data;
      // console.log('get profile image response ', response);
      // console.log('self list', self.profilePicture);
    }).catch(function (err) {
      // console.log('get profile images err ', err);
      swal('Error retrieving profile picture! Please try again later.', '', 'warning');
    });
  };

  self.updateProfilePicture = function (image) {
    return $http.put('/images/user/' + self.profilePicture.list._id, image).then(function (response) {
      // console.log('put request for profile image', response);
    }).catch(function (err) {
      // console.log('put err for profile image', err);
      swal('Error updating profile picture! Please try again later.', '', 'warning');
    });
  };

  self.saveProfilePicture = function (image) {
    return $http.post('/images/user', image).then(function (response) {
      // console.log('save profile image response ', response);
      return response;
    }).catch(function (err) {
      // console.log('err saving profile image ', err);
      swal('Error saving profile picture! Please try again later.', '', 'warning');
    });
  };

  self.updateUserInfo = function (user) {
    // console.log('user ', user);
    return $http.put('/api/user', user).then(function (response) {
      self.userObject.userFullName = user.userFullName;
      // console.log('put user response ', response);
    }).catch(function (err) {
      // console.log('put user err ', err);
      swal('Error updating name! Please try again later.', '', 'warning');
    });
  };
}]);
