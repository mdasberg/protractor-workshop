'use strict';

describe("Promise exercises", function () {
    describe("The repeat after me", function () {
        beforeEach(function () {
            browser.get('/#/repeat-after-me');
        });

        it("should highlight the user entered sequence in green if matching the original sequence", function () {
            // 1. Find the sequence that you need to repeat after me
            var sequenceElement; /* implement me */
            var sequence = sequenceElement.getText();
            // 2. Handle the promise
            
            // replay the sequence by clicking the correct buttons
            element(by.buttonText(sequence.charAt(0))).click();
            element(by.buttonText(sequence.charAt(1))).click();
            element(by.buttonText(sequence.charAt(2))).click();

            // 3. verify that the entered sequence matches
            var userSequence; /* implement me */
            expect(userSequence.getAttribute('class')).toContain('green');
        });

        it("should highlight the user entered sequence in red if it doesn't match the original sequence", function() {
            // 1. Input a random sequence by clicking the buttons (why is this a poor test? :) )
            var digit = Math.floor((Math.random() * 9) + 1).toString();
            /* implement me */

            // 2. verify that the entered sequence does not match.
            var userSequence; /* implement me */
            expect(userSequence.getAttribute('class')).toContain('red');
        });

        it('should disable all key buttons once the user finished typing the sequence', function() {
            // 1. Copy the implementation of one of the 2 test above
            var digit = Math.floor((Math.random() * 9) + 1).toString();
            /* implement me */

            // 2. iterate through every button and check if it is disabled.
            /* implement me */
        });

        it('should reset the sequence and enable all key buttons once the user clicks on try again', function() {
            // 1. Copy the implementation of one of the 2 test above
            var digit = Math.floor((Math.random() * 9) + 1).toString();
            /* implement me */

            // 2. Click the button with text Try again
            /* implement me */
            
            // 3. verify that the UI has been reset
            /* implement me */
        });
    });
});
