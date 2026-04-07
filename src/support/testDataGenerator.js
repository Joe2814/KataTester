function generateEmail() {
    const random = Math.floor(Math.random() * 1000000);
    return `qa${random}@mail.com`;
}

function generatePassword() {
    const random = Math.floor(Math.random() * 1000000);
    return `Qa${random}!`;
}

module.exports = {
    generateEmail,
    generatePassword
};