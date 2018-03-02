app.controller('HeaderController', ['UserService', '$location', function (UserService, $location) {
    const self = this;
    self.landingPage = UserService.landingPage;
}]);