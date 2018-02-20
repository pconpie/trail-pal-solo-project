let app = angular.module('app', ['ngRoute', 'ngRateIt', 'ngMaterial']);


app.config(function ($routeProvider, $mdThemingProvider) {
    console.log('config loaded');

    // $mdThemingProvider.theme('default')
    // .dark();

    $routeProvider
        .when('/', {
            templateUrl: '/views/landing-page.html',
            controller: 'LandingController as vm'
        })
        .when('/map', {
            templateUrl: '/views/map.html',
            controller: 'MapController as vm'
        })
        .when('/details/:trail_lat/:trail_lon/:id', {
            templateUrl: '/views/trail-detail.html',
            controller: 'DetailsController as vm'
        })
        .when('/favorites', {
            templateUrl: '/views/favorites.html',
            controller: 'UserController as vm',
            resolve: {
                getuser: function (UserService) {
                    return UserService.getuser();
                }
            }
        })
        .when('/profile', {
            templateUrl: '/views/profile.html',
            controller: 'ProfileController as vm',
            resolve: {
                getuser: function (UserService) {
                    return UserService.getuser();
                }
            }
        })
        .otherwise({
            template: '<h1>404</h1>'
        })


});