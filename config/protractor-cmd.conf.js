var config = require('./protractor-shared.conf').config;

// run selenium by downloading selenium-standalone and running with java -jar selenium-standalone.....jar
config.seleniumAddress = 'http://localhost:4444/wd/hub';

config.specs = [
    '../test/protractor/**/*Spec.js'
];

config.baseUrl = 'http://localhost:9000';

config.multiCapabilities = [
    {
        'browserName': 'chrome',
        'chromeOptions': {
            args: ['test-type'] // get rid of the ignore cert warning
        },
        shardTestFiles: true,
        maxInstances: 10
    }
];

exports.config = config;