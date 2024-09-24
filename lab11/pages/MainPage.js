const { By, Key, until } = require('selenium-webdriver');
const PageManager = require('./PageManager');

class MainPage extends PageManager {
    constructor(driver) {
        super(driver);
        this.url = "https://remanga.org/";
        this.searchInputSelector = ".Input_input___YBKm";
        this.searchButtonSelector = "a.Button_button___CisL:nth-child(4) > span:nth-child(1)";
        this.mangaCardSelector = "div.Grid_gridItem__aPUx1:nth-child(1)";
        this.mangaTitleSelector = "div.Grid_gridItem__aPUx1:nth-child(1) > a:nth-child(1)";
        this.mangaName = "//a[@title=\"Поднятие уровня в одиночку: Рагнарёк\"]";
       // this.notFindMangaResult = "//p[text()=\"Нет результатов\"]";
    }

    async navigate() {
        await super.openUrl(this.url);
    }

    async clickSearchButton() {
        const button = await super.findElement(By.css(this.searchButtonSelector));
        await super.click(button);
    }

    async searchForMangaGenre(query) {
        const searchInput = await super.findElement(By.css(this.searchInputSelector));
        await super.sendKeys(searchInput, query);
        await super.sendKeys(searchInput, Key.ENTER);
    }

    async waitForResults() {
        await super.wait(By.css(this.mangaCardSelector), 10000);
    }

    async getFirstMangaTitle() {
        const firstCard = await super.findElement(By.css(this.mangaCardSelector));
        const titleElement = await firstCard.findElement(By.css(this.mangaTitleSelector));
        return await titleElement.getText();
    }

    async findMangaResult() {
        try {
            await this.driver.wait(until.elementLocated(By.css(this.mangaCardSelector)), 5000);
            const results = await this.driver.findElements(By.css(this.mangaCardSelector));
            return results.length > 0;
        } catch (error) {
            return false;
        }
    }

    async clickMangaButton() {
        await super.wait(By.xpath(this.mangaName), 10000);
        const button = await super.findElement(By.xpath(this.mangaName));
        await super.click(button);
        return await super.getDriver();
    }

    async getDriver(){
        return await super.getDriver();
    }

}

module.exports = MainPage;