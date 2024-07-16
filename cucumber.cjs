/**
 * @see https://github.com/cucumber/cucumber-js/blob/main/docs/configuration.md
 */
module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['features/**/*.ts'],
    retry: process.env.CI ? 2 : undefined,
    format: ['html:results/cucumber-report.html'],
  },
};
