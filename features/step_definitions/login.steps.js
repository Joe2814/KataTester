const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");
const { baseUrl } = require("../../src/support/testConfig");
const { generateEmail, generatePassword } = require("../../src/support/testDataGenerator");

Given("que el usuario abre la pagina de login", async function () {
    await this.loginPage.open(baseUrl());
});

Then("la pantalla de login carga correctamente", async function () {
    assert.strictEqual(
        await this.loginPage.isLoaded(),
        true,
        "La pantalla de login no cargó correctamente"
    );
});

Given("que el usuario esta en la pagina de login", async function () {
    await ensureUserExists(this);
    await this.loginPage.open(baseUrl());
    assert.strictEqual(
        await this.loginPage.isLoaded(),
        true,
        "No se visualizaron los campos de login"
    );
});

When("el usuario inicia sesion", async function () {
    await this.loginPage.login(this.context.email, this.context.password);
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForURL("**/contactList");
});

Then("debe ingresar al sistema", async function () {
    assert.strictEqual(
        this.page.url().includes("contactList"),
        true,
        "No ingresó al sistema"
    );
});

When("el usuario intenta iniciar sesion con password incorrecta", async function () {
    await ensureUserExists(this);
    await this.loginPage.login(this.context.email, "WrongPassword123!");
    await this.page.waitForLoadState("domcontentloaded");
});

Then("muestra un error visible de autenticacion", async function () {
    assert.strictEqual(
        this.page.url().includes("contactList"),
        false,
        "No debería entrar al sistema"
    );
    assert.strictEqual(
        await this.loginPage.isLoaded(),
        true,
        "Debe seguir en la pantalla de login"
    );
});

async function ensureUserExists(world) {
    if (!world.context.email || !world.context.password) {
        const email = generateEmail();
        const password = generatePassword();

        world.context.email = email;
        world.context.password = password;
        world.context.fullName = "Usuario QA";

        await world.registerPage.open(baseUrl());
        await world.registerPage.fillForm("Usuario", "QA", email, password);
        await world.registerPage.submit();
        await world.page.waitForLoadState("domcontentloaded");
        await world.page.waitForURL("**/contactList");
    }
}