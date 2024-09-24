const { By, Key, until } = require('selenium-webdriver');
const PageManager = require('./PageManager');

class LoginPage extends PageManager {
    constructor(driver) {
        super(driver);
        //this.url = "https://remanga.org/";
        this.findLoginButton =  "//span[text()=\"Войти\"]"//"button.Button_button___CisL:nth-child(3)"; 
        this.findButtonMailAndPassword = "a.Button_contained-size-large__HCqRj:nth-child(1) > span:nth-child(1)";
        this.loginInputSelector = "div.jsx-261496919888b024:nth-child(1) > div:nth-child(1) > input:nth-child(1)";
        this.passwordInputSelector = "div.jsx-261496919888b024:nth-child(2) > div:nth-child(1) > input:nth-child(1)"; 
        this.loginInButtonSelector = "button.Button_button___CisL:nth-child(4) > span:nth-child(1)"; 
    }

    async navigate() {
        await super.openUrl(this.url);
    }


    async login(username, password) {
        const loginButton = await super.findElement(By.xpath(this.findLoginButton));
        await super.click(loginButton);
        const buttonMailAndPassword = await super.findElement(By.css(this.findButtonMailAndPassword));
        await super.click(buttonMailAndPassword);
        const loginInput = await super.findElement(By.css(this.loginInputSelector));
        await super.sendKeys(loginInput, username);
        const passwordInput = await super.findElement(By.css(this.passwordInputSelector));
        await super.sendKeys(passwordInput, password);
        const loginInButton = await super.findElement(By.css(this.loginInButtonSelector))
        await super.click(loginInButton);
    }
    
    async isLoggedIn() {
        const userProfileSelector = "/html/body/div[2]/div/div/ul/li[1]/a/div[2]/h6"//'.Avatar_avatar__hG0bH';
        try {
            await super.wait(By.xpath(userProfileSelector), 10000);
            return true;
        } catch (error) {
            return false;
        }
    }

    async getLoginDriver(){
        return await super.getDriver();
    }
}

module.exports = LoginPage;