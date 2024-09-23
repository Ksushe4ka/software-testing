const { Builder } = require('selenium-webdriver');
const MainPage = require('./MainPage');

async function FindMangaByName(driver) {
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

    if (firstMangaTitle.toLowerCase().includes(searchQuery.toLowerCase())) {
        console.log('Тест 2 пройден: Название первой карточки соответствует введённому названию.');
    } else {
        console.log('Тест 2 не пройден: Название первой карточки не соответствует.');
    }
}

async function testUserLogin(driver) {
    const mainPage = new MainPage(driver);

    console.log('Запуск теста 1: Проверка входа пользователя');
    await mainPage.navigate();
    await mainPage.login('skirtym', '>n53C+pw3ePxy)m'); 
    const isLoggedIn = await mainPage.isLoggedIn();

    if (isLoggedIn) {
        console.log('Тест 1 пройден: Пользователь успешно вошел в свою учетную запись.');
    } else {
        console.log('Тест 1 не пройден: Вход не выполнен.');
    }
}

(async function runTests() {
    const driver = await new Builder().forBrowser('firefox').build(); 
    try {
        await testUserLogin(driver);
        await FindMangaByName(driver);
        await new Promise(resolve => setTimeout(resolve, 4000));
    } finally {
        await driver.quit(); 
    }
})();