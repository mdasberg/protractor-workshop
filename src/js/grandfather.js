'use strict';

function GrandfatherCtrl($scope) {
    var vm = this;
    vm.question = {};
    vm.answer = undefined;
    
    vm.answerQuestion = function () {
        this.answer = 'Chocolate!';
    }

    $scope.$watch('gf.question.text', function(current, original) {
        if(original !== current) {
            vm.answer = undefined;
        }
    });
}

GrandfatherCtrl.$inject = ['$scope'];

angular.module('grandfatherOfAllKnowledge', [])
    .controller('GrandfatherCtrl', GrandfatherCtrl);
    
   