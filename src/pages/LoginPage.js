class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.locator("#email");
        this.passwordInput = page.locator("#password");
        this.submitButton = page.locator(
            "button[type='submit'], input[type='submit'], button:has-text('Login'), button:has-text('Submit')"
        );
    }

    async open(baseUrl) {
        await this.page.goto(baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`);
        await this.page.waitForLoadState("domcontentloaded");
    }

    async isLoaded() {
        return (
            (await this.emailInput.count()) > 0 &&
            (await this.passwordInput.count()) > 0 &&
            (await this.emailInput.first().isVisible()) &&
            (await this.passwordInput.first().isVisible())
        );
    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);

        if ((await this.submitButton.count()) > 0) {
            await this.submitButton.first().click();
        } else {
            await this.page.keyboard.press("Enter");
        }
    }
}

module.exports = LoginPage;