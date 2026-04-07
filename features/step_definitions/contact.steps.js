const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");
const { baseUrl } = require("../../src/support/testConfig");
const { generateEmail, generatePassword } = require("../../src/support/testDataGenerator");

Given("que el usuario esta autenticado", async function () {
    await ensureUserExistsAndLogin(this);
    await this.contactPage.waitForLoggedInState();
});

Given("que el usuario esta autenticado y tiene un contacto creado", async function () {
    await ensureUserExistsAndLogin(this);
    await this.contactPage.waitForLoggedInState();
    await createContactForThisTest(this, "Usuario", "QA");
});

When("crea un contacto nuevo", async function () {
    await createContactForThisTest(this, "Nuevo", "Contacto");
});

Then("el contacto debe aparecer en la lista", async function () {
    assert.strictEqual(
        await this.contactPage.isTextVisible(this.context.contactEmail),
        true,
        "El contacto no aparece en la lista"
    );
});

When("intento crear un contacto sin nombre", async function () {
    const email = generateEmail();
    this.context.contactEmail = email;
    this.context.contactFullName = "QA";

    await this.contactPage.openAddContactForm();
    await this.contactPage.createContact(
        "",
        "QA",
        "2000-01-01",
        email,
        "3001234567",
        "Calle 1",
        "Bogota",
        "Cundinamarca",
        "110111"
    );
    await this.page.waitForLoadState("domcontentloaded");
});

Then("muestra un error visible de validacion", async function () {
    assert.strictEqual(
        await this.contactPage.isAddContactFormVisible(),
        true,
        "El formulario no deberia cerrarse"
    );
});

When("actualiza el contacto actual", async function () {
    const email = generateEmail();

    await this.contactPage.openContactByName(this.context.contactFullName);
    await this.contactPage.editContact("Editado", "QA", email, "3001234567");

    this.context.contactEmail = email;
    this.context.contactFullName = "Editado QA";

    await this.contactPage.waitForContactData("Editado", "QA", email, 5000);
});

Then("el contacto debe mostrar los nuevos datos", async function () {
    assert.strictEqual(
        await this.contactPage.hasVisibleOrInputValue("Editado"),
        true,
        "El nombre actualizado no aparece"
    );

    assert.strictEqual(
        await this.contactPage.hasVisibleOrInputValue("QA"),
        true,
        "El apellido actualizado no aparece"
    );

    assert.strictEqual(
        await this.contactPage.hasVisibleOrInputValue(this.context.contactEmail),
        true,
        "El email actualizado no aparece"
    );
});

When("elimina el contacto actual", async function () {
    await this.contactPage.openContactByName(this.context.contactFullName);
    await this.contactPage.deleteCurrentContact();
    await this.page.waitForLoadState("domcontentloaded");
});

Then("el contacto no debe aparecer en la lista", async function () {
    await this.contactPage.waitForTextToDisappear(this.context.contactFullName, 4000);

    assert.strictEqual(
        await this.contactPage.isTextVisible(this.context.contactFullName),
        false,
        "El contacto todavía aparece"
    );
});

When("cierra sesion", async function () {
    await this.contactPage.logout();
});

Then("debe volver a la pagina de login", async function () {
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForTimeout(800);

    const loginVisible =
        (await this.page.locator("input[type='email']").count()) > 0 ||
        (await this.page.locator("input[type='password']").count()) > 0 ||
        (await this.page.getByText("Login").count()) > 0 ||
        (await this.page.getByText("Sign In").count()) > 0;

    assert.strictEqual(loginVisible, true, "No volvió al login");
});

When("intenta crear un contacto con nombre numerico", async function () {
    await createInvalidContact(
        this,
        "12345",
        "QA",
        "2000-01-01",
        "qa1@mail.com",
        "3001234567",
        "Calle 1",
        "Bogota",
        "Cundinamarca",
        "110111"
    );
});

When("intenta crear un contacto con apellido numerico", async function () {
    await createInvalidContact(
        this,
        "Juan",
        "12345",
        "2000-01-01",
        "qa2@mail.com",
        "3001234567",
        "Calle 1",
        "Bogota",
        "Cundinamarca",
        "110111"
    );
});

When("intenta crear un contacto con email invalido", async function () {
    await createInvalidContact(
        this,
        "Juan",
        "QA",
        "2000-01-01",
        "juan@123.com",
        "3001234567",
        "Calle 1",
        "Bogota",
        "Cundinamarca",
        "110111"
    );
});

When("intenta crear un contacto con celular invalido", async function () {
    await createInvalidContact(
        this,
        "Juan",
        "QA",
        "2000-01-01",
        "qa3@mail.com",
        "1111111111",
        "Calle 1",
        "Bogota",
        "Cundinamarca",
        "110111"
    );
});

When("intenta crear un contacto con direccion numerica", async function () {
    await createInvalidContact(
        this,
        "Juan",
        "QA",
        "2000-01-01",
        "qa4@mail.com",
        "3001234567",
        "123456789",
        "Bogota",
        "Cundinamarca",
        "110111"
    );
});

When("intenta crear un contacto con ciudad numerica", async function () {
    await createInvalidContact(
        this,
        "Juan",
        "QA",
        "2000-01-01",
        "qa5@mail.com",
        "3001234567",
        "Calle 1",
        "123456",
        "Cundinamarca",
        "110111"
    );
});

When("intenta crear un contacto con estado numerico", async function () {
    await createInvalidContact(
        this,
        "Juan",
        "QA",
        "2000-01-01",
        "qa6@mail.com",
        "3001234567",
        "Calle 1",
        "Bogota",
        "123456",
        "110111"
    );
});

When("intenta crear un contacto con codigo postal invalido", async function () {
    await createInvalidContact(
        this,
        "Juan",
        "QA",
        "2000-01-01",
        "qa7@mail.com",
        "3001234567",
        "Calle 1",
        "Bogota",
        "Cundinamarca",
        "12345678901"
    );
});

When("intenta crear un contacto con birthdate invalido", async function () {
    await createInvalidContact(
        this,
        "Juan",
        "QA",
        "31-12-2025",
        "qa8@mail.com",
        "3001234567",
        "Calle 1",
        "Bogota",
        "Cundinamarca",
        "110111"
    );
});

When("intenta crear un contacto con pais numerico", async function () {
    await createInvalidContactWithCountry(
        this,
        "Juan",
        "QA",
        "2000-01-01",
        "qa9@mail.com",
        "3001234567",
        "Calle 1",
        "Bogota",
        "Cundinamarca",
        "110111",
        "123456"
    );
});

Then("el contacto no debe crearse y el formulario sigue visible", async function () {
    assert.strictEqual(
        await this.contactPage.isAddContactFormVisible(),
        true,
        "El formulario no deberia cerrarse"
    );

    assert.strictEqual(
        await this.contactPage.isTextVisible(this.context.contactEmail),
        false,
        "El contacto inválido no debió crearse"
    );
});

async function ensureUserExistsAndLogin(world) {
    if (!world.context.email) {
        const email = generateEmail();
        const password = generatePassword();

        world.context.email = email;
        world.context.password = password;

        await world.registerPage.open(baseUrl());
        await world.registerPage.fillForm("Usuario", "QA", email, password);
        await world.registerPage.submit();
        await world.page.waitForURL("**/contactList");
    }

    await world.loginPage.open(baseUrl());
    await world.loginPage.login(world.context.email, world.context.password);
    await world.page.waitForURL("**/contactList");
}

async function createContactForThisTest(world, firstName, lastName) {
    const email = generateEmail();

    world.context.contactFullName = `${firstName} ${lastName}`;
    world.context.contactEmail = email;

    await world.contactPage.openAddContactForm();
    await world.contactPage.createContact(
        firstName,
        lastName,
        "2000-01-01",
        email,
        "3001234567",
        "Calle 1",
        "Bogota",
        "Cundinamarca",
        "110111"
    );

    await world.page.waitForLoadState("domcontentloaded");
}

async function createInvalidContact(
    world,
    firstName,
    lastName,
    birthdate,
    email,
    phone,
    street1,
    city,
    stateProvince,
    postalCode
) {
    world.context.contactFullName = `${firstName} ${lastName}`;
    world.context.contactEmail = email;

    await world.contactPage.openAddContactForm();
    await world.contactPage.createContact(
        firstName,
        lastName,
        birthdate,
        email,
        phone,
        street1,
        city,
        stateProvince,
        postalCode
    );

    await world.page.waitForLoadState("domcontentloaded");
}

async function createInvalidContactWithCountry(
    world,
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
) {
    world.context.contactFullName = `${firstName} ${lastName}`;
    world.context.contactEmail = email;

    await world.contactPage.openAddContactForm();
    await world.contactPage.createContact(
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

    await world.page.waitForLoadState("domcontentloaded");
}