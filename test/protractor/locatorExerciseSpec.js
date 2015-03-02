'use strict';

describe("Locator exercises", function () {
    describe("The grandfather of all knowledge", function () {
        beforeEach(function () {
            browser.get('/#/grandfather-of-all-knowledge');
        });

        it('should find the question by webdriver locator :className', function () {
            var el = element(by.className('...'));
            expect(el.isPresent()).toBe(true);
            expect(el.getAttribute('placeholder')).toBe('What would you like to ask the grandfather of all knowledge?');
        });

        it('should find the title by webdriver locator :css', function () {
            var el = element(by.css('...'));
            expect(el.isPresent()).toBe(true);
            expect(el.getText()).toBe('Grandfather of all knowledge')
        });

        it('should find the title by webdriver locator :id', function () {
            var el = element(by.id('...'));
            expect(el.isPresent()).toBe(true);
            expect(el.getText()).toBe('Grandfather of all knowledge')
        });

        it('should find question placeholder by webdriver locator :name', function () {
            var el = element(by.name('...'));
            expect(el.isPresent()).toBe(true);
            expect(el.getAttribute('placeholder')).toBe('What would you like to ask the grandfather of all knowledge?');
        });

        it('should find the title by webdriver locator :tagName', function () {
            var el = element(by.tagName('...'));
            expect(el.isPresent()).toBe(true);
            expect(el.getText()).toBe('Grandfather of all knowledge')
        });

        it('should find the title by webdriver locator :xpath', function () {
            var el = element(by.xpath('...'));
            expect(el.isPresent()).toBe(true);
            expect(el.getText()).toBe('Grandfather of all knowledge')
        });
    });
    describe("The repeat after me", function () {
        beforeEach(function () {
            browser.get('/#/repeat-after-me');
        });

        it('should find the sequence by protractor locator :binding', function () {
            var el = element(by.binding('...'));
            expect(el.isPresent()).toBe(true);
            expect(el.getText()).not.toBeUndefined();
        });
        
        it('should find the sequence by protractor locator :exactBinding', function () {
            var el = element(by.exactBinding('...'));
            expect(el.isPresent()).toBe(true);
            expect(el.getText()).not.toBeUndefined();
        });

        it('should find the Try again button by protractor locator :buttonText', function () {
            var el = element(by.buttonText('...'));
            expect(el.isPresent()).toBe(true);
        });

        it('should find the Try again button by protractor locator :partialButtonText', function () {
            var el = element(by.partialButtonText('...'));
            expect(el.isPresent()).toBe(true);
        });

        it('should find the title by protractor locator :cssContainingText', function () {
            var el = element(by.cssContainingText('...', '...'));
            expect(el.isPresent()).toBe(true);
        });
    });
    describe("The releases", function () {
        beforeEach(function () {
            browser.get('/#/releases');
        });

        it('should find the releases by protractor locator :repeater', function () {
            var el = element(by.repeater('...'));
            expect(el.isPresent()).toBe(true);
        });

        it('should find the releases by protractor locator :exactRepeater', function () {
            var el = element(by.exactRepeater('...'));
            expect(el.isPresent()).toBe(true);
        });
    });
});
