'use strict';

// Declare app level module which depends on filters, and services
angular.module('snifferApp', [
    'ui.router',
    'ui.bootstrap',
    'snifferApp.filters',
    'snifferApp.services',
    'snifferApp.directives',
    'snifferApp.controllers'
]);
//Setting up route
angular.module('snifferApp').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        // For unmatched routes:
        $urlRouterProvider.otherwise('/');

        // states for my app
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'views/home.html',
                controller: 'MonitorController'
            })
            .state('config', {
                url: '/config',
                templateUrl: 'views/config.html',
                controller: 'ConfigController'
            })
            .state('eeprom', {
                url: '/eeprom',
                templateUrl: 'views/eeprom.html',
                controller: 'EepromController'
            })
            .state('ubin', {
                url: '/ubin',
                templateUrl: 'views/ubin.html',
                controller: 'UbinController'
            })
            .state('tracker', {
                url: '/tracker',
                templateUrl: 'views/tracker.html',
                controller: 'TrackerController'
            });
    }
]);

//Setting HTML5 Location Mode
angular.module('snifferApp').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);
