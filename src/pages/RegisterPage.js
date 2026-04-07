class RegisterPage {
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.locator("#firstName");
        this.lastNameInput = page.locator("#lastName");
        this.emailInput = page.locator("#email");
        this.passwordInput = page.locator("#password");
        this.submitButton = page.locator(
            "button[type='submit'], input[type='submit'], button:has-text('Register'), button:has-text('Submit')"
        );
    }

    async open(baseUrl) {
        const url = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
        await this.page.goto(`${url}/addUser`);
        await this.page.waitForLoadState("domcontentloaded");
    }

    async isLoaded() {
        return (
            (await this.firstNameInput.count()) > 0 &&
            (await this.lastNameInput.count()) > 0 &&
            (await this.emailInput.count()) > 0 &&
            (await this.passwordInput.count()) > 0 &&
            (await this.firstNameInput.first().isVisible()) &&
            (await this.lastNameInput.first().isVisible()) &&
            (await this.emailInput.first().isVisible()) &&
            (await this.passwordInput.first().isVisible())
        );
    }

    async fillForm(firstName, lastName, email, password) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    async submit() {
        if ((await this.submitButton.count()) > 0) {
            await this.submitButton.first().click();
        } else {
            await this.page.keyboard.press("Enter");
        }
    }
}

module.exports = RegisterPage;