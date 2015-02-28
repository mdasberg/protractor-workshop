    'use strict';

    angular.module('workshop', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'grandfatherOfAllKnowledge',
        'repeatAfterMe'
    ]).config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/grandfather-of-all-knowledge', {
                templateUrl: 'partials/grandfather.html',
                controller: 'GrandfatherCtrl',
                controllerAs: 'gf'
            })
            .when('/repeat-after-me', {
                templateUrl: 'partials/afterMe.html',
                controller: 'AfterMeCtrl',
                controllerAs: 'af'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);