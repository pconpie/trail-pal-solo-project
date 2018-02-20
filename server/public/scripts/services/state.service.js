app.service('StateService', ['$http', '$mdToast', function ($http, $mdToast) {
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
}]);