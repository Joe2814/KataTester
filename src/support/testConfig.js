require("dotenv").config();

module.exports = {
    baseUrl: () => process.env.BASE_URL || "https://thinking-tester-contact-list.herokuapp.com"
};