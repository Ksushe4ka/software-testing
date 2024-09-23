const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
    const driver = await new Builder().forBrowser('firefox').build();

    try {
        await driver.get("https://remanga.org/");
        await driver.findElement(By.css("a.Button_button___CisL:nth-child(4) > span:nth-child(1)")).click();
        const searchInput = await driver.findElement(By.css(".Input_input___YBKm"));
        await searchInput.sendKeys('поднятие уровня в одиночку');
        await searchInput.sendKeys(Key.ENTER);
        await driver.wait(until.elementLocated(By.css('.manga-card')), 5000);
        
    } finally {
        await driver.quit();
    }
})();