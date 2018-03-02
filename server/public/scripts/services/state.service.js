app.service('StateService', ['$http', '$mdToast', '$mdDialog', function ($http, $mdToast, $mdDialog) {
    const self = this;

    self.getStateBounds = function () {
        return $http.get('/onLoad')
            .then((response) => {
                // console.log('response on load ', response.data);
                return response.data;
            })
            .catch((err) => {
                swal('Error loading state data!', '', 'warning');
                console.log('load get err ', err);
            })
    }

    self.loadWelcomeModal = function (ev) {
        $mdDialog.show({
            controller: WelcomeController,
            controllerAs: 'vm',
            templateUrl: '../views/welcome-modal.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
        
    }

    function WelcomeController($mdDialog, StateService) {
        const self = this;

        self.hide = function () {
            $mdDialog.hide();
        };

        self.cancel = function () {
            $mdDialog.cancel();
        };

        self.success = function (answer) {
            console.log('answer', answer);
            swal(answer, '', {
                className: "success-alert",
            });
            // $mdDialog.hide(answer);
        };
        self.error = function (answer) {
            console.log('answer', answer);
            swal(answer, '', 'error', {
                className: "error-alert",
            });
            // $mdDialog.hide(answer);
        };
    }

}]);