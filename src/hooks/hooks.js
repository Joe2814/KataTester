const { Before, After, setDefaultTimeout } = require("@cucumber/cucumber");
const DriverManager = require("../support/driverManager");
const TestContext = require("../context/testContext");
const LoginPage = require("../pages/LoginPage");
const RegisterPage = require("../pages/RegisterPage");
const ContactPage = require("../pages/ContactPage");

setDefaultTimeout(60 * 1000);

Before(async function () {
    TestContext.getInstance().clear();
    await DriverManager.startBrowser();

    this.page = DriverManager.getPage();
    this.context = TestContext.getInstance();
    this.loginPage = new LoginPage(this.page);
    this.registerPage = new RegisterPage(this.page);
    this.contactPage = new ContactPage(this.page);
});

After(async function () {
    await DriverManager.stopBrowser();
});