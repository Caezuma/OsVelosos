module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["./jest.setup.js"],
  testMatch: ["**/tests/**/*.test.js"],
  runner: "jest-runner-groups",
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./html-report",
        filename: "report.html",
        expand: true,
      },
    ],
  ],
};