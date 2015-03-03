'use strict';

describe("Interaction exercises", function () {
    describe("The grandfather of all knowledge", function () {
        beforeEach(function () {
            browser.get('/#/grandfather-of-all-knowledge');
        });

        it('should answer any question', function () {
            // 1. Find the question input element
            // 2. Enter a question
            // 3. Click the button to submit the question
            // 4. Verify the answer

            var answerElement; /* implement me */
            expect(answerElement.getText()).toBe('Chocolate')
        });

        it('should not be able to ask an empty question', function () {
            // 1. Find the question input element
            // 2. Enter the following question '      ' (just a bunch of spaces)
            // 3. Verify if the button is enabled

            var buttonElement; /* implement me */
            expect(buttonElement.isEnabled()).toBeFalsy();
        });


    });
    describe("The repeat after me", function () {
        beforeEach(function () {
            browser.get('/#/repeat-after-me');
        });

        it("should display 497 as the entered user sequence", function () {
            // 1. Find button 4
            // 2. Click button 4
            // 3. Find button 9
            // 4. Click button 9
            // 5. Find button 7
            // 5. Click button 7
            // 6. Verify the entered user sequence

            var userSequenceElement; /* implement me */
            expect(userSequenceElement.getText()).toBe('497')
        });
    });
});
