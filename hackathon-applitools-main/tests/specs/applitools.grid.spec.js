'use strict';
import TlcHackathonMaster from '../pageobjects/tlcHackathonMasterV1.page';

const { remote } = require('webdriverio');
const {
    VisualGridRunner,
    RunnerOptions,
    Eyes,
    Target,
    Configuration,
    RectangleSize,
    BatchInfo,
    BrowserType,
    DeviceName,
    ScreenOrientation
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
    let runner

    beforeAll(async () => {

        // Create a runner with concurrency of 1
        const runnerOptions = new RunnerOptions().testConcurrency(1)
        runner = new VisualGridRunner(runnerOptions);

        // Create Eyes object with the runner, meaning it'll be a Visual Grid eyes.
        eyes = new Eyes(runner);

        // Initialize the eyes configuration
        const configuration = new Configuration();

        // You can get your api key from the Applitools dashboard
        configuration.setApiKey('xoo1ZLL0FrnpbawtyY5BKp3vYAKFo3LUV6JmYfix9Sg110')

        // create a new batch info instance and set it to the configuration
        configuration.setBatch(new BatchInfo('Holiday Shopping'))

        // Add browsers with different viewports
        configuration.addBrowser(viewportWidth, viewportHeight, BrowserType.CHROME);
        configuration.addBrowser(viewportWidth, viewportHeight, BrowserType.FIREFOX);
        configuration.addBrowser(viewportWidth, viewportHeight, BrowserType.EDGE_CHROMIUM);
        configuration.addBrowser(viewportWidth, c, BrowserType.SAFARI);

        // Add mobile emulation devices in Portrait mode
        configuration.addDeviceEmulation(DeviceName.iPhone_X, ScreenOrientation.PORTRAIT);

        // Set the configuration to eyes
        eyes.setConfiguration(configuration);

        // To make sure that timeout is more to avoid timeout issues
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


    afterAll(async () => {
        // Close the browser
        await browser.deleteSession();

        // If the test was aborted before eyes.close was called, ends the test as aborted.
        await eyes.abortAsync();

        // we pass false to this method to suppress the exception that is thrown if we
        // find visual differences143
        const results = await runner.getAllTestResults(false);
        console.log(results);
    });

});
