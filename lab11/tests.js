const { Builder } = require('selenium-webdriver');
const MainPage = require('./pages/MainPage');
const LoginPage = require('./pages/LoginPage');
const { expect } = require('chai');
const BrowserManager = require('./BrowserManager');
const MangaPage = require('./pages/MangaPage');


describe('Тесты манги на Remanga', function() {
    let driver;
    let browserManager = new BrowserManager();
    const username = 'skirtym'; 
    const password = '>n53C+pw3ePxy)m'; 

    before(async function() {
        this.timeout(12000);
        driver = await browserManager.init();
    });

    after(async function() {
        await browserManager.close();
    });

;

    it('Тест 1: Проверка входа пользователя', async function() {
        this.timeout(10000);
        const loginPage = new LoginPage(driver);
        loginPage.openUrl("https://remanga.org/");
        await loginPage.login(username, password);
        //const isLoggedIn = await loginPage.isLoggedIn();
        //expect(isLoggedIn).to.be.true;
    });

    it('Тест 2: Проверка поиска манхвы', async function() {
        this.timeout(10000);
        const mainPage = new MainPage(driver);
        const searchQuery = 'всеведущий читатель';

        console.log('Запуск теста 2: Проверка поиска манхвы');
        await mainPage.navigate();
        await mainPage.clickSearchButton();
        await mainPage.searchForMangaGenre(searchQuery);
        await mainPage.waitForResults();

        const firstMangaTitle = await mainPage.getFirstMangaTitle();
        console.log(`Введенное название: ${searchQuery}`);
        console.log(`Название первой карточки: ${firstMangaTitle}`);

        expect(firstMangaTitle.toLowerCase()).to.include(searchQuery.toLowerCase());
    });

    it('Тест 3: Добавление манги в список закладок', async function() {
        this.timeout(10000);
        const mainPage = new MainPage(driver);
        const searchQuery = 'Поднятие уровня в одиночку: Рагнарёк';

        console.log('Запуск теста 3: Добавление манги в список закладок');
        await mainPage.navigate();
        await mainPage.clickSearchButton();
        await mainPage.searchForMangaGenre(searchQuery);
        await mainPage.waitForResults();
        let drivermanga = await mainPage.clickMangaButton()
        const mangaPage = new MangaPage(driver);
        //await mangaPage.login(username, password);
        await mangaPage.clickaddToListReadButton(username, password);
        //await mangaPage.clickreadButton();


        //expect(firstMangaTitle.toLowerCase()).to.include(searchQuery.toLowerCase());
    });

    it('Тест 4: Проверка поиска манхвы по несуществующему названию', async function() {
        this.timeout(10000);
        const mainPage = new MainPage(driver);
        const searchQuery = ' ';

        console.log('Запуск теста 4: Проверка поиска несуществующей манхвы');
        await mainPage.navigate();
        await mainPage.clickSearchButton();
        await mainPage.searchForMangaGenre(searchQuery);
        //await mainPage.waitForResults();
        expect(await mainPage.findMangaResult()).to.be.false;
    });
});