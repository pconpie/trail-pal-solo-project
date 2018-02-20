app.controller('LandingController', ['StateService', '$location', function (StateService, $location) {
    const self = this;
    self.enterSite = function () {
        $location.path('/map')
    }
    document.getElementById('header').style.display = "none";
}]);
