const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");
const { baseUrl } = require("../../src/support/testConfig");
const { generateEmail, generatePassword } = require("../../src/support/testDataGenerator");

Given("que el usuario abre la pagina de registro", async function () {
    await this.registerPage.open(baseUrl());
    assert.strictEqual(
        await this.registerPage.isLoaded(),
        true,
        "La página de registro no cargó"
    );
});

When("el usuario se registra con datos dinamicos", async function () {
    const email = generateEmail();
    const password = generatePassword();

    this.context.email = email;
    this.context.password = password;
    this.context.fullName = "Usuario QA";

    await this.registerPage.fillForm("Usuario", "QA", email, password);
    await this.registerPage.submit();
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForURL("**/contactList");
});

Then("el usuario debe quedar registrado", async function () {
    await this.page.waitForLoadState("domcontentloaded");

    const logged =
        this.page.url().includes("contactList") ||
        (await this.page.locator("#logout").count()) > 0;

    assert.strictEqual(
        logged,
        true,
        "El usuario no quedó registrado correctamente"
    );
});

When("el usuario intenta registrarse con password corto", async function () {
    const email = generateEmail();
    const shortPassword = "12345";

    this.context.email = email;
    this.context.password = shortPassword;

    await this.registerPage.fillForm("Usuario", "QA", email, shortPassword);
    await this.registerPage.submit();
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForTimeout(500);
});

Then("el registro no debe completarse y el formulario sigue visible", async function () {
    const stillOnRegister = await this.registerPage.isLoaded();
    const redirectedToContacts = this.page.url().includes("contactList");

    let logoutVisible = false;
    try {
        logoutVisible = (await this.page.locator("#logout").count()) > 0;
    } catch {
        logoutVisible = false;
    }

    assert.strictEqual(
        stillOnRegister && !redirectedToContacts && !logoutVisible,
        true,
        "El registro no deberia completarse con password menor a 8 caracteres"
    );
});