    'use strict';

    angular.module('grandfatherOfAllKnowledge', [])
        .controller("GrandfatherCtrl", GrandfatherCtrl);
    
    function GrandfatherCtrl() {
        this.question = {};
        this.answer = '';

        this.answerQuestion = function () {
            this.answer = "Chocolate!";
        }
    };