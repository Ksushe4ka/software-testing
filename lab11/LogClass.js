const { By, Key, until } = require('selenium-webdriver');
const fs = require('fs');

class LogClass {
    constructor(path) {
        this.filePath = path;
    }

    log(message) {
        const logEntry = `${new Date().toISOString()}: ${message}`;
        fs.appendFileSync(this.filePath, logEntry + '\n');
    }
}

module.exports = LogClass;