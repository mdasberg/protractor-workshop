'use strict';

var AfterMePO = require("./po/AfterMePO");

describe("The repeat after me", function () {

    var po = new AfterMePO();

    beforeEach(function () {
        browser.get('/#/repeat-after-me');
    });

    it("should indicate that the user entered the correct sequence", function () {
        // 1. Find the sequence that you need to repeat after me
        // 2. Handle the promise
        po.sequence.then(function(sequence) {
            // 3. repeat the sequence
            /* implement me */
        });
        // 4. verify that the entered sequence matches
        expect(po.matches()).toBeTruthy();
    });

    it("should indicate that the user entered an incorrect sequence", function () {
        // 1. Input a random sequence by clicking the buttons using the PO
        /* implement me */
    
        // 2. verify that the entered sequence does not match.
        expect(po.matches()).toBeFalsy();
    });

    it('should disable all key buttons once the user finished typing the sequence', function () {
        // 1. Input a random sequence by using the PO
        // 2. Iterate through every button and check if it is disabled using the PO
        /* implement me */
    });

    it('should reset the sequence and enable all key buttons once the user clicks on try again', function () {
        // 1. Input a random sequence by using the PO
        // 2. Iterate through every button and check if it is disabled using the PO
        // 3. Click the button with text Try Again using the PO
        // 4. Verify that the UI has been reset

        /* implement me */
    });
});
