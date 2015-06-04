'use strict';

var AfterMePO = function() {
    this.container = element(by.id("repeat-after-me"));
}

AfterMePO.prototype = Object.create({}, {
    sequence: {
        get: function () {
            /* implement me */
        }
    },
    userSequence: {
        get: function () {
            /* implement me */
        }
    },
    enter: {
        value: function (sequence) {
            var deferred = protractor.promise.defer();
            /* implement me */
            return deferred.promise;
        }
    },
    matches: {
        value: function() {
            var userSequence = this.userSequence;
            var sequence = this.sequence;
            
            return sequence.then(function(expected) {
                /* implement me */
            });
        }
    },
    isDisabled: {
        value: function() {
            /* implement me */
        }
    },
    reset: {
        value: function() {
            var deferred = protractor.promise.defer();
            /* implement me */
            return deferred.promise;
        }
    }
});


module.exports = AfterMePO;