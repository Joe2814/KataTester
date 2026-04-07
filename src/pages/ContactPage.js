class ContactPage {
    constructor(page) {
        this.page = page;
        this.addContactButton = page.locator("#add-contact");
        this.firstNameInput = page.locator("#firstName");
        this.lastNameInput = page.locator("#lastName");
        this.birthdateInput = page.locator("#birthdate");
        this.emailInput = page.locator("#email");
        this.phoneInput = page.locator("#phone");
        this.streetInput = page.locator("#street1");
        this.cityInput = page.locator("#city");
        this.stateInput = page.locator("#stateProvince");
        this.postalCodeInput = page.locator("#postalCode");
        this.countryInput = page.locator("#country");
    }

    async waitForLoggedInState() {
        await this.addContactButton.first().waitFor();
    }

    async openAddContactForm() {
        await this.addContactButton.first().click();
        await this.page.waitForLoadState("domcontentloaded");
    }

    async fillContactForm(
        firstName,
        lastName,
        birthdate,
        email,
        phone,
        street1,
        city,
        stateProvince,
        postalCode,
        country = "Colombia"
    ) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.birthdateInput.fill(birthdate);
        await this.emailInput.fill(email);
        await this.phoneInput.fill(phone);
        await this.streetInput.fill(street1);
        await this.cityInput.fill(city);
        await this.stateInput.fill(stateProvince);
        await this.postalCodeInput.fill(postalCode);
        await this.countryInput.fill(country);
    }

    async createContact(
        firstName,
        lastName,
        birthdate,
        email,
        phone,
        street1,
        city,
        stateProvince,
        postalCode,
        country = "Colombia"
    ) {
        await this.fillContactForm(
            firstName,
            lastName,
            birthdate,
            email,
            phone,
            street1,
            city,
            stateProvince,
            postalCode,
            country
        );
        await this.clickSubmit();
        await this.page.waitForLoadState("domcontentloaded");
    }

    async openContactByName(name) {
        await this.page.getByText(name).first().click();
        await this.page.waitForLoadState("domcontentloaded");
    }

    async editContact(firstName, lastName, email, phone) {
        await this.clickEdit();
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.phoneInput.fill(phone);
        await this.clickSubmit();
        await this.page.waitForLoadState("domcontentloaded");
    }

    async deleteCurrentContact() {
        this.page.once("dialog", dialog => dialog.accept());
        await this.clickDelete();
        await this.page.waitForLoadState("domcontentloaded");
    }

    async logout() {
        await this.clickLogout();
        await this.page.waitForLoadState("domcontentloaded");
    }

    async isTextVisible(text) {
        try {
            await this.page.getByText(text).first().waitFor({ timeout: 3000 });
            return true;
        } catch {
            return false;
        }
    }

    async isAddContactFormVisible() {
        try {
            return await this.firstNameInput.first().isVisible();
        } catch {
            return false;
        }
    }

    async hasVisibleOrInputValue(expected) {
        try {
            if (await this.isTextVisible(expected)) {
                return true;
            }

            if ((await this.firstNameInput.count()) > 0 && await this.firstNameInput.first().isVisible()) {
                const firstName = await this.safeInputValue(this.firstNameInput);
                if (expected === firstName || expected.includes(firstName) || firstName.includes(expected)) {
                    return true;
                }
            }

            if ((await this.lastNameInput.count()) > 0 && await this.lastNameInput.first().isVisible()) {
                const lastName = await this.safeInputValue(this.lastNameInput);
                if (expected === lastName || expected.includes(lastName) || lastName.includes(expected)) {
                    return true;
                }
            }

            if ((await this.emailInput.count()) > 0 && await this.emailInput.first().isVisible()) {
                const email = await this.safeInputValue(this.emailInput);
                if (expected === email || expected.includes(email) || email.includes(expected)) {
                    return true;
                }
            }

            return false;
        } catch {
            return false;
        }
    }

    async waitForContactData(firstName, lastName, email, timeoutMs) {
        let waited = 0;

        while (waited < timeoutMs) {
            const nameOk =
                (await this.hasVisibleOrInputValue(firstName)) ||
                (await this.hasVisibleOrInputValue(`${firstName} ${lastName}`));
            const lastNameOk = await this.hasVisibleOrInputValue(lastName);
            const emailOk = await this.hasVisibleOrInputValue(email);

            if (nameOk && lastNameOk && emailOk) {
                return;
            }

            await this.page.waitForTimeout(300);
            waited += 300;
        }
    }

    async waitForTextToDisappear(text, timeoutMs) {
        let waited = 0;

        while (waited < timeoutMs) {
            if (!(await this.isTextVisible(text))) {
                return;
            }
            await this.page.waitForTimeout(300);
            waited += 300;
        }
    }

    async clickSubmit() {
        const submit = this.page.locator(
            "button[type='submit']:visible, input[type='submit']:visible, button:has-text('Update'):visible, button:has-text('Update Contact'):visible, button:has-text('Save'):visible, button:has-text('Save Contact'):visible, button:has-text('Submit'):visible, button:has-text('Add'):visible"
        );

        if ((await submit.count()) > 0) {
            await submit.first().click();
        } else {
            await this.page.keyboard.press("Enter");
        }
    }

    async clickEdit() {
        const edit = this.page.locator("#edit-contact:visible");
        if ((await edit.count()) > 0) {
            await edit.first().click();
        } else {
            await this.page.getByRole("button", { name: "Edit" }).click();
        }
    }

    async clickDelete() {
        const del = this.page.locator("#delete-contact:visible");
        if ((await del.count()) > 0) {
            await del.first().click();
        } else {
            await this.page.getByRole("button", { name: "Delete" }).click();
        }
    }

    async clickLogout() {
        const logout = this.page.locator("#logout:visible");
        if ((await logout.count()) > 0) {
            await logout.first().click();
        } else {
            await this.page.getByRole("button", { name: "Logout" }).click();
        }
    }

    async safeInputValue(locator) {
        try {
            return (await locator.first().inputValue()).trim();
        } catch {
            return "";
        }
    }
}

module.exports = ContactPage;