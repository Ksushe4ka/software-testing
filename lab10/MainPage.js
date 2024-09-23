const { By, Key, until } = require('selenium-webdriver');

class MainPage {
    constructor(driver) {
        this.driver = driver;
        this.url = "https://remanga.org/";
        this.searchInputSelector = ".Input_input___YBKm";
        this.searchButtonSelector = "a.Button_button___CisL:nth-child(4) > span:nth-child(1)";
        this.mangaCardSelector = "div.Grid_gridItem__aPUx1:nth-child(1)";
        this.mangaTitleSelector = "div.Grid_gridItem__aPUx1:nth-child(1) > a:nth-child(1)";

        this.findLoginButton = "button.Button_button___CisL:nth-child(3)"; 
        this.buttonMailAndPassword = "a.Button_contained-size-large__HCqRj:nth-child(1) > span:nth-child(1)";
        this.loginInputSelector = "div.jsx-261496919888b024:nth-child(1) > div:nth-child(1) > input:nth-child(1)";
        this.passwordInputSelector = "div.jsx-261496919888b024:nth-child(2) > div:nth-child(1) > input:nth-child(1)"; 
        this.loginButtonSelector = "button.Button_button___CisL:nth-child(4) > span:nth-child(1)"; 
    }

    async navigate() {
        await this.driver.get(this.url);
    }

    async clickSearchButton() {
        const button = await this.driver.findElement(By.css(this.searchButtonSelector));
        await button.click();
    }

    async searchForMangaGenre(query) {
        const searchInput = await this.driver.findElement(By.css(this.searchInputSelector));
        await searchInput.sendKeys(query);
        await searchInput.sendKeys(Key.ENTER);
    }

    async waitForResults() {
        await this.driver.wait(until.elementLocated(By.css(this.mangaCardSelector)), 10000);
    }

    async getFirstMangaTitle() {
        const firstCard = await this.driver.findElement(By.css(this.mangaCardSelector));
        const titleElement = await firstCard.findElement(By.css(this.mangaTitleSelector));
        return await titleElement.getText();
    }

    async login(username, password) {
        await this.driver.findElement(By.css(this.findLoginButton)).click();
        await this.driver.findElement(By.css(this.buttonMailAndPassword)).click();
        await this.driver.findElement(By.css(this.loginInputSelector)).sendKeys(username);
        await this.driver.findElement(By.css(this.passwordInputSelector)).sendKeys(password);
        await this.driver.findElement(By.css(this.loginButtonSelector)).click();
    }
    
    async isLoggedIn() {
        const userProfileSelector = '.Avatar_avatar__hG0bH';
        try {
            await this.driver.wait(until.elementLocated(By.css(userProfileSelector)), 5000);
            return true;
        } catch (error) {
            return false;
        }
    }

}

module.exports = MainPage;