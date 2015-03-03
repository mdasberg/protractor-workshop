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
            /* implement me */

            var firstDigit = parseInt(sequence.charAt(0));
            var secondDigit = parseInt(sequence.charAt(1));
            var thirdDigit = parseInt(sequence.charAt(2));

            // replay the sequence by clicking the correct buttons
            var buttons = element.all(by.tagName('button'));
            buttons.get(firstDigit).click();
            buttons.get(secondDigit).click();
            buttons.get(thirdDigit).click();

            // 3. verify that the entered sequence matches
            var userSequence; /* implement me */
            expect(userSequence.getAttribute('class')).toContain('green');
        });

        it("should highlight the user entered sequence in red if it doesn't match the original sequence", function() {
            var firstDigit = Math.floor(Math.random() * 10);
            var secondDigit = Math.floor(Math.random() * 10);
            var thirdDigit = Math.floor(Math.random() * 10);

            // 1. Input a random sequence by clicking the buttons (why is this a poor test? :) )
            /* implement me */

            // 2. verify that the entered sequence does not match.
            var userSequence; /* implement me */
            expect(userSequence.getAttribute('class')).toContain('red');
        });

        it('should disable all key buttons once the user finished typing the sequence', function() {
            // 1. Copy the implementation of one of the 2 test above
            /* implement me */

            // 2. iterate through every button and check if it is disabled.

        });

        it('should reset the sequence and enable all key buttons once the user clicks on try again', function() {
            // 1. Copy the implementation of one of the 2 test above
            /* implement me */

            // 2. Click the button with text Try Again
            /* implement me */

            // 3. verify that the UI has been reset
            /* implement me */
        });
    });
});
