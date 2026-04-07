const { chromium } = require("playwright");

class DriverManager {
    static browser = null;
    static context = null;
    static page = null;

    static async startBrowser() {
        this.browser = await chromium.launch({ headless: false });
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
    }

    static getPage() {
        if (!this.page) {
            throw new Error("El navegador no ha sido iniciado.");
        }
        return this.page;
    }

    static async stopBrowser() {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
        }
    }
}

module.exports = DriverManager;