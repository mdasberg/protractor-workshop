    'use strict';

    angular.module("repeatAfterMe", [])
        .controller("AfterMeCtrl", AfterMeCtrl);

    function AfterMeCtrl() {
        var MAX_ALLOWED_DIGIT = 9;
        var SEQUENCE_LENGTH = 3;

        this.sequence = generateSequence(SEQUENCE_LENGTH);
        this.userSequence = "";

        function generateSequence(length) {
            var sequence = "";
            var number;

            for (var i = 0; i < length; i++) {
                number = Math.floor((Math.random() * MAX_ALLOWED_DIGIT) + 1);
                sequence = sequence.concat(number);
            }

            return sequence;
        }

        this.updateUserSequence = function(char) {
            this.userSequence = this.userSequence.concat(char);
        }

        this.disableButton = function() {
            return (this.userSequence.length === SEQUENCE_LENGTH);
        }

        this.resetSequence = function() {
            this.sequence = generateSequence(SEQUENCE_LENGTH);
            this.userSequence = "";
        }

        this.isAMatch = function() {
            return (this.sequence === this.userSequence);
        }
    }


