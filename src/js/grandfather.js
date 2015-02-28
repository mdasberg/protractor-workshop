'use strict';

function GrandfatherCtrl() {
    this.question = {};
    this.answer = '';

    this.answerQuestion = function () {
        this.answer = 'Chocolate!';
    }
}

angular.module('grandfatherOfAllKnowledge', [])
    .controller('GrandfatherCtrl', GrandfatherCtrl);
    
   