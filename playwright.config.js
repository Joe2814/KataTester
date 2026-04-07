const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
    use: {
        headless: false,
        viewport: { width: 1440, height: 900 },
        actionTimeout: 15000,
        navigationTimeout: 30000
    }
});