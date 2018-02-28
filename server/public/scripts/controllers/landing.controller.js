app.controller('LandingController', ['StateService', '$location', function (StateService, $location) {
    const self = this;
    self.enterSite = function () {
        $location.path('/map')
        StateService.loadWelcomeModal();
    }
    if (document.getElementById('header')) {
        document.getElementById('header').style.display = "none";
    }
}]);