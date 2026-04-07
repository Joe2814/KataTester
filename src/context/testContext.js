class TestContext {
    constructor() {
        this.email = null;
        this.password = null;
        this.fullName = null;
        this.phone = null;
        this.token = null;
        this.contactEmail = null;
        this.contactFullName = null;
    }

    clear() {
        this.email = null;
        this.password = null;
        this.fullName = null;
        this.phone = null;
        this.token = null;
        this.contactEmail = null;
        this.contactFullName = null;
    }

    static getInstance() {
        if (!TestContext.instance) {
            TestContext.instance = new TestContext();
        }
        return TestContext.instance;
    }
}

module.exports = TestContext;