(function () {
    //Angular
    var app = angular.module("app-emtalks", ['ngRoute', 'ngAnimate']);

    app.config(function($routeProvider){
        $routeProvider.
            when('/', {
                templateUrl: 'partials/home.html',
                controller: 'MainController'
            }).
            when('/speakers',{
                templateUrl: 'partials/speakers.html',
                controller: 'SpeakersController'
            }).
            when('/details',{
                templateUrl: 'partials/details.html',
            }).
            when('/savethedate',{
                templateUrl: 'partials/savethedate.html',
                controller: 'RegistrationController'
            }).
            //when('/nominate',{
                //templateUrl: 'partials/nominate.html',
                //controller: 'NominateController'
            //}).
            when('/team', {
               templateUrl: 'partials/team.html'
            }).
            when('/AttendeeConfirm', {
               templateUrl: 'partials/attendeeConfirmation.html'
            }).
            when('/duplicate', {
               templateUrl: 'partials/duplicate.html'
            }).
            when('/SpeakerConfirm', {
               templateUrl: 'partials/speakerConfirmation.html'
            }).
            otherwise({
                redirectTo: '/'
            }); 
    });
    
    app.controller("MainController", ["$scope", MainController]);
    app.controller("RegistrationController", ["$scope", "$http", "$location", RegistrationController]);
    app.controller("NominateController", ["$scope", "$http", "$location", NominateController]);
    app.controller("SpeakersController", ["$scope", "$http", "$location", SpeakersController]);
    
}());