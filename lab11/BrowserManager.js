const { Builder } = require('selenium-webdriver');

class BrowserManager {
    constructor() {
        this.driver = null;
    }

    async init() {
        return this.driver = await new Builder().forBrowser('firefox').build();
    }

    async close() {
        if (this.driver) {
            await this.driver.quit();
        }
    }
}

module.exports = BrowserManager;