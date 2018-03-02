app.controller('LandingController', ['StateService', 'UserService', '$location', function (StateService, UserService, $location) {
    const self = this;
    UserService.landingPage.is = true;
    self.enterSite = function () {
        $location.path('/map')
        StateService.loadWelcomeModal();
    }
    // if (document.getElementById('header')) {
    //     document.getElementById('header').style.display = "none";
    // }
}]);