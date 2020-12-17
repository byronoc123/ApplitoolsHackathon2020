let path = require ('path');

exports.config = {
    // ====================
    // Runner and framework
    // Configuration
    // ====================
    runner: 'local',
    framework: 'jasmine',
    jasmineNodeOpts: {
        // Updated the timeout to 30 seconds due to possible longer appium calls
        // When using XPATH
        defaultTimeoutInterval: 90000,
    },
    specs : [
        './tests/specs/**/applitools.grid.spec.js'

    ],
    capabilities : [
        {
            // The defaults you need to have in your config
            // platformName: 'iOS',
            browserName: 'chrome',
            maxInstances: 1,
            'goog:chromeOptions': {
                args: [
                    // '--headless',
                    // '--disable-gpu',
                    // 'window-size=1024,800',
                    //'disable-web-security',
                    //'user-data-dir',
                    // 'incognito',
                    // 'window-position=0,0'
                ],
                // Removes the incredibly annoying popup for saving the guest password
                prefs: {
                    'credentials_enable_service': true
                }
            },
        }/*, {
            // maxInstances can get overwritten per capability. So if you have an in-house Selenium
            // grid with only 5 firefox instances available you can make sure that not more than
            // 5 instances get started at a time.
            maxInstances: 1,
            //
            browserName: 'firefox',
         'moz:firefoxOptions': {
          binary:
            path.join(__dirname, '../../../../../../Applications/Firefox.app/Contents/MacOS/firefox-bin')
        }
            // If outputDir is provided WebdriverIO can capture driver session logs
            // it is possible to configure which logTypes to include/exclude.
            // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
            // excludeDriverLogs: ['bugreport', 'server'],
        }*/
    ],
    sync: true,
    logLevel: 'silent',
    deprecationWarnings: true,
    bail: 0,
    baseUrl: 'https://demo.applitools.com/',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    reporters: [ 'spec' ],

    // ====================
    // Appium Configuration
    // ====================
    // services: [ 'selenium-standalone'],
    services: ['selenium-standalone','intercept'],

    appium: {
        // For options see
        // https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-appium-service
        args: {
            // For arguments see
            // https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-appium-service
        },
        // command : 'appium'
    },

    // port: 4723,

    // ====================
    // Some hooks
    // ====================
    beforeSession: (config, capabilities, specs) => {
        require('@babel/register');
    },
};
