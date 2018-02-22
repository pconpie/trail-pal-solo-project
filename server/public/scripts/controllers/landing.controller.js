app.controller('LandingController', ['StateService', '$location', function (StateService, $location) {
    const self = this;
    self.enterSite = function () {
        $location.path('/map')
        StateService.loadWelcomeModal();
    }
    document.getElementById('header').style.display = "none";
}]);
