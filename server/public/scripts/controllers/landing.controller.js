app.controller('LandingController', ['MapService', '$location', function (MapService, $location) {
    const self = this;
    self.enterSite = function () {
        $location.path('/map')
    }
    document.getElementById('header').style.display = "none";
}]);
