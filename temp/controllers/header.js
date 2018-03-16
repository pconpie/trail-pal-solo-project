'use strict';

app.controller('HeaderController', ['UserService', '$location', function (UserService, $location) {
    var self = this;
    self.landingPage = UserService.landingPage;
}]);
