'use strict';

var AfterMePO = require("./po/AfterMePO");

describe("The repeat after me", function () {

    var po = new AfterMePO();

    beforeEach(function () {
        browser.get('/#/repeat-after-me');
    });

    it("should highlight the user entered sequence in green if matching the original sequence", function () {
        // 1. Find the sequence that you need to repeat after me
        // 2. Handle the promise
        po.getSequence().then(function(sequence) {
            // 3. repeat the sequence
        });
        // 4. verify that the entered sequence matches
        expect(po.getUserSequence().getAttribute('class')).toContain('green');
    });

    it("should highlight the user entered sequence in red if it doesn't match the original sequence", function () {
        // 1. Input a random sequence by clicking the buttons using the PO
        /* implement me */

        // 2. verify that the entered sequence does not match.
        expect(po.getUserSequence().getAttribute('class')).toContain('red');
    });

    it('should disable all key buttons once the user finished typing the sequence', function () {
        // 1. Copy the implementation of one of the 2 test above
        /* implement me */

        // 2. iterate through every button and check if it is disabled using the PO

    });

    it('should reset the sequence and enable all key buttons once the user clicks on try again', function () {
        // 1. Copy the implementation of one of the 2 test above
        /* implement me */

        // 2. Click the button with text Try Again using the PO
        /* implement me */

        // 3. verify that the UI has been reset
        /* implement me */
    });
});
