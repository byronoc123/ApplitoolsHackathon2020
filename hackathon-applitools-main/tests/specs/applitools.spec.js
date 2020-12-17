'use strict';
import TlcHackathonMaster from '../pageobjects/tlcHackathonMasterV1.page';

const { remote } = require('webdriverio');
const {
    ClassicRunner,
    Eyes,
    Target,
    Configuration,
    RectangleSize,
    BatchInfo
} = require('@applitools/eyes-webdriverio');

let eyes;
const viewportWidth = 1200;
const viewportHeight = 800;
var urlsToValidate = [
    "tlcHackathonMasterV1.html",
    "tlcHackathonDev.html",
    "tlcHackathonMasterV2.html"
];

describe('Applitools Hackathon', function () {

    beforeEach(async () => {

        // Initialize the Runner for your test.
        const runner = new ClassicRunner();

        // Initialize the eyes SDK
        eyes = new Eyes(runner);

        // Initialize the eyes configuration
        const configuration = new Configuration();

        // You can get your api key from the Applitools dashboard
        configuration.setApiKey('xoo1ZLL0FrnpbawtyY5BKp3vYAKFo3LUV6JmYfix9Sg110')

        // Set new batch
        configuration.setBatch(new BatchInfo('Holiday Shopping'))
        // Set the configuration to eyes
        eyes.setConfiguration(configuration);
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;

    });

    urlsToValidate.forEach(function (url) {
        it('Holiday Shopping', async () => {

            // Start the test by setting AUT's name, test name and viewport size (width X height)
            await eyes.open(browser, 'AppliFashion', 'Main Page', new RectangleSize(viewportWidth, viewportHeight));

            TlcHackathonMaster.open(url);
            // Check the whole page   
            await eyes.check('Main WIndow', Target.window().fully());

            // End the test
            await eyes.closeAsync();

            // Start the test by setting AUT's name, test name and viewport size (width X height)
            await eyes.open(browser, 'AppliFashion', 'filter by color', new RectangleSize(viewportWidth, viewportHeight));

            TlcHackathonMaster.open(url);
            await (await TlcHackathonMaster.blackLabel).click()
            await (await TlcHackathonMaster.filterButton).click()

            // Check only Product Grid Region
            await eyes.checkRegion(await TlcHackathonMaster.productGrid)

            // End the test
            await eyes.closeAsync();

            // Start the test by setting AUT's name, test name and viewport size (width X height)
            await eyes.open(browser, 'AppliFashion', 'product details', new RectangleSize(viewportWidth, viewportHeight));

            TlcHackathonMaster.open(url);
            await (await TlcHackathonMaster.appliAirNight).click()

            // Check the whole page   
            await eyes.check('Product Details', Target.window().fully());

            // End the test
            await eyes.closeAsync();
        });

    });

    afterEach(async () => {
        // Close the browser
        // await browser.deleteSession();
        TlcHackathonMaster.delete()

        // If the test was aborted before eyes.close was called, ends the test as aborted.
        await eyes.abortIfNotClosed();

        // Wait and collect all test results
        const results = await eyes.getRunner().getAllTestResults(false);
        // console.log(results);
        // console.log(results.getAllResults());
    });

});


