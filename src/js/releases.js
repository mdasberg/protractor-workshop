'use strict';

function ReleaseService($resource) {
    return $resource('https://api.github.com/repos/angular/protractor/tags', {}, {
        get: {
            method: 'GET',
            isArray: true
        }
    });
}

function ReleasesCtrl(ReleaseService) {
    var vm = this;
    vm.releases = ReleaseService.get({});
}

ReleaseService.$inject = ['$resource'];
ReleasesCtrl.$inject = ['ReleaseService'];

angular.module('releases', ['ngResource'])
    .factory('ReleaseService', ReleaseService)
    .controller('ReleasesCtrl', ReleasesCtrl);
