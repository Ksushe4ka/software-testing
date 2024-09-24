const { By, Key, until } = require('selenium-webdriver');
const LogClass = require('../LogClass');

class PageManager {
    logClass = new LogClass("log.txt");
    constructor(driver) {
        this.driver = driver;
        this.logClass.log(`Page Constructor: ${driver}`);
    }

    async openUrl(url) {
        this.logClass.log(`Url Open: ${url}`);
        await this.driver.get(url);
    }

    async findElement(locator) {
        //this.logClass.log(`find Element: ${locator}`);
        return await this.driver.findElement(locator);
    }


    async click(element) {
        this.logClass.log(`click Element: ${element}`);
        await element.click();
    }

    async sendKeys(element, keys) {
        this.logClass.log(`send Keys to element: ${element}`);
        await element.sendKeys(keys);
    }

    async wait(locator, time){
        await this.driver.wait(until.elementLocated(locator), time);
    }

    async getDriver(){
        return await this.driver;
    }

}

module.exports = PageManager;