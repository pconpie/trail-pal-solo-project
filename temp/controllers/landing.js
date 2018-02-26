'use strict';

app.controller('LandingController', ['StateService', '$location', function (StateService, $location) {
    var self = this;
    self.enterSite = function () {
        $location.path('/map');
        StateService.loadWelcomeModal();
    };
    document.getElementById('header').style.display = "none";
}]);
