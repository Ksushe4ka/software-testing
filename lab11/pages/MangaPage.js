const { By, Key, until } = require('selenium-webdriver');
const PageManager = require('./PageManager');

class MangaPage extends PageManager {
    constructor(driver) {
        super(driver);
        this.url = "https://remanga.org/manga/the-solo-leveling-ragnarok";
        this.addToListReadButton = "//button[@class=\"Button_button___CisL Button_button___CisL Button_contained__8_KFk Button_contained-primary__IViyX Button_fullWidth__Dgoqh\"]";
        this.readButton = "//li[text()=\"Читаю\"]";  
        this.readAccept = "//span[text()=\"Читаю\"]";
        this.findLoginButton =  "//span[text()=\"Войти\"]"//"button.Button_button___CisL:nth-child(3)"; 
        this.findButtonMailAndPassword = "//a[@class=\"Button_button___CisL Button_button___CisL Button_contained__8_KFk Button_contained-size-large__HCqRj Button_fullWidth__Dgoqh jsx-cccd08cf8c55dc6c\"]";
        this.loginInputSelector = "//input[@name=\"user\"]";
        this.passwordInputSelector = "//input[@name=\"password\"]"; 
        this.loginInButtonSelector = "//button[@class=\"Button_button___CisL Button_button___CisL Button_contained__8_KFk Button_contained-primary__IViyX Button_contained-size-large__HCqRj Button_fullWidth__Dgoqh\"]"; 
    }

    async navigate() {
        await super.openUrl(this.url);
    }

    async clickaddToListReadButton(username, password) {
        await super.wait(By.xpath(this.addToListReadButton), 5000);
        const button = await super.findElement(By.xpath(this.addToListReadButton));
        await super.click(button);
        const buttonMailAndPassword = await super.findElement(By.xpath(this.findButtonMailAndPassword));
        await super.click(buttonMailAndPassword);
        const loginInput = await super.findElement(By.xpath(this.loginInputSelector));
        await super.sendKeys(loginInput, username);
        const passwordInput = await super.findElement(By.xpath(this.passwordInputSelector));
        await super.sendKeys(passwordInput, password);
        const loginInButton = await super.findElement(By.xpath(this.loginInButtonSelector))
        await super.click(loginInButton);
    }

    async clickreadButton() {
        await super.wait(By.xpath(this.readButton), 5000);
        const button = await super.findElement(By.xpath(this.readButton));
        await super.click(button);
    }

    async isRead() {
        try {
            await super.wait(By.xpath(this.readAccept), 5000);
            return true;
        } catch (error) {
            return false;
        }
    }

    async getDriver(){
        return await super.getDriver();
    }


    async login(username, password) {
        super.wait(By.xpath(this.findLoginButton), 10000);
        const loginButton = await super.findElement(By.xpath(this.findLoginButton));
        await super.click(loginButton);
        const buttonMailAndPassword = await super.findElement(By.css(this.findButtonMailAndPassword));
        await super.click(buttonMailAndPassword);
        const loginInput = await super.findElement(By.xpath(this.loginInputSelector));
        await super.sendKeys(loginInput, username);
        const passwordInput = await super.findElement(By.xpath(this.passwordInputSelector));
        await super.sendKeys(passwordInput, password);
        const loginInButton = await super.findElement(By.css(this.loginInButtonSelector))
        await super.click(loginInButton);
    }
}

module.exports = MangaPage;