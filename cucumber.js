module.exports = {
    default: {
        paths: ["features/**/*.feature"],
        require: [
            "features/step_definitions/**/*.js",
            "src/hooks/**/*.js"
        ],
        format: [
            "progress",
            "summary",
        ]
    }
};