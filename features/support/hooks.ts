import {
  Before,
  After,
  BeforeAll,
  AfterAll,
  setDefaultTimeout,
  ITestCaseHookParameter,
  Status,
} from '@cucumber/cucumber';
import { Browser, chromium, firefox, webkit } from '@playwright/test';
import { CustomWorld } from './world';
import config from './config';
import { saveTrace, startTracing, stopTracing } from './trace';

let browser: Browser;
const failedScenarios = new Map<string, string>();
const DISABLE_TIMEOUT = -1;

setDefaultTimeout(
  process.env.DEBUG ? DISABLE_TIMEOUT : config.cucumberStepTimeout
);

BeforeAll(async () => {
  switch (config.browser) {
    case 'firefox':
      browser = await firefox.launch(config.launchOptions);
      break;
    case 'webkit':
      browser = await webkit.launch(config.launchOptions);
      break;
    default:
      browser = await chromium.launch(config.launchOptions);
  }
});

Before(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
  this.startTime = new Date();
  this.context = await browser.newContext(config.browserContextOptions);
  this.page = await this.context.newPage();
  this.page.setDefaultTimeout(config.actionTimeout);

  if (scenario.pickle.name in failedScenarios) {
    await startTracing(this.context);
  }
});

After(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
  const hasPassed = scenario.result?.status === Status.PASSED ? true : false;
  const isRetriedScenario = scenario.pickle.name in failedScenarios;

  console.log(JSON.stringify(this));

  if (hasPassed && isRetriedScenario) {
    await stopTracing(this.context);
    failedScenarios.delete(scenario.pickle.name);
  }

  if (!hasPassed) {
    if (isRetriedScenario) {
      await saveTrace(this.context, scenario, this.startTime);
      failedScenarios.delete(scenario.pickle.name);
    } else {
      failedScenarios.set(scenario.pickle.name, '');
    }

    const image = await this.page.screenshot();
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    await Promise.resolve(this.attach(image, 'image/png'));
  }

  await this.page.close();
  await this.context.close();
});

AfterAll(async () => {
  await browser.close();
});
