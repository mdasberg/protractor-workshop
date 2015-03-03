'use strict';

describe("Chain exercises", function () {
    describe("The grandfather of all knowledge", function () {
        beforeEach(function () {
            browser.get('/#/grandfather-of-all-knowledge');
        });

        it('should get the question', function () {
            // Enter a question
            element(by.className('question__field')).sendKeys('What do I like');
            // And submit
            element(by.className('question__button')).click();

            // 1. Find the element with class 'answer'
            // 2. Find the question under the element with id 'answer' by binding.

            // see: http://angular.github.io/protractor/#/api?view=ElementArrayFinder

            var el;  /* inplement me */
            expect(el.getText()).toBe('What do I like');
        });


    });
    describe("The releases", function () {
        beforeEach(function () {
            browser.get('/#/releases');
        });

        it('should get the latest release of protractor', function () {
            // 1. Find the element with id 'releases'
            // 2. Find the releases under the element with id 'releases'.
            // 3. find the latest release

            // see: http://angular.github.io/protractor/#/api?view=ElementArrayFinder

            var el;  /* inplement me */
            expect(el.getText()).toBe('1.8.0');
        });

        it('should get the previous release of protractor', function () {
            // 1. Find the element with id 'releases'
            // 2. Find the releases under the element with id 'releases'.
            // 3. find the first release

            // see: http://angular.github.io/protractor/#/api?view=ElementArrayFinder

            var el;  /* inplement me */
            expect(el.getText()).toBe('1.7.0');
        });

        it('should get the initial release of protractor', function () {
            // 1. Find the element with id 'releases'
            // 2. Find the releases under the element with id 'releases'.
            // 3. find the first release

            // see: http://angular.github.io/protractor/#/api?view=ElementArrayFinder

            var el;  /* inplement me */
            expect(el.getText()).toBe('0.18.0');
        });

        it('should get the number of releases of protractor', function () {
            // 1. Find the element with id 'releases'
            // 2. Find the releases under the element with id 'releases'.
            // 3. find the number of release

            // see: http://angular.github.io/protractor/#/api?view=ElementArrayFinder

            var el;  /* inplement me */
            expect(el.getText()).toBe(30);
        });

    });
});
