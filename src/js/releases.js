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
    ReleaseService.get({},
        function(data){
            // succes
            vm.releases = data;
            return vm.releases;
        },
        function(error){
            //error flow.
            vm.error = error.data;
            return vm.error;
    });
}

ReleaseService.$inject = ['$resource'];
ReleasesCtrl.$inject = ['ReleaseService'];

angular.module('releases', ['ngResource'])
    .factory('ReleaseService', ReleaseService)
    .controller('ReleasesCtrl', ReleasesCtrl);
