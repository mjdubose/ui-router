//app.js

var routerApp = angular.module('routerApp', ['ui.router','overflow-marquee']);

routerApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');
    $stateProvider.state('home', {
        url: 'home',
        templateUrl: '/partial-home.html'
    })

        .state('home.list', {
            url: '/list',
            templateUrl: 'partial-home-list.html',
            controller: function ($scope) {
                $scope.dogs = ['Bernse', 'Husky', 'Goldendoodle'];
            }
        })

        .state('home.paragraph', {
            url: '/paragraph',
            template: 'I could sure use some sleep right now'
        })
        .state('about', {
            url: '/about',
            views: {
                //the main templates will be placed here (relatively named)

                '': {templateUrl: 'partial-about.html',
                    controller: (function ($scope, $stateParams) {
                        $scope.textToBeDisplayed = 'HERE IS THE DEFAULT  TEXT that should be far to long for the thing to render';
                    })
                },
                //the child views will be defined here (absolutely named)

                'columnOne@about': {template: 'Look I am a column'},

                // for column two, we'll define a separate controller'

                'columnTwo@about': {
                    templateUrl: 'table-data.html',
                    controller: 'scotchController'
                }
            }
        }).state('party', {
        url: '/party',
        template: '<h1> This is a State</h1>'
    }).state('partyDetail', {
        url: '/party/:partyID/:partyLocation',
        controller: (function ($scope, $stateParams) {
            $scope.id = $stateParams.partyID;
            $scope.location = $stateParams.partyLocations;
        })
    });
});

//lets define the scotch controller that we call up in the about state
routerApp.controller('scotchController', function ($scope) {
    $scope.message = 'test';

    $scope.scotches = [{
        name: 'Macallan 12', price: 50
    }, {
        name: 'Chivas Regal Royal Salue',
        price: 10000
    }, {
        name: 'Glenfiddish 1937',
        price: 20000
    }]
});