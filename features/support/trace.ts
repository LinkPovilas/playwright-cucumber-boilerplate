import { ITestCaseHookParameter } from '@cucumber/cucumber';
import { BrowserContext } from '@playwright/test';

export const startTracing = async (context: BrowserContext) => {
  await context.tracing.start({ screenshots: true, snapshots: true });
};

export const stopTracing = async (
  context: BrowserContext,
  options?: { path?: string }
) => {
  await context.tracing.stop(options);
};

export const saveTrace = async (
  context: BrowserContext,
  scenario: ITestCaseHookParameter,
  startTime: Date
) => {
  const featureName = scenario.gherkinDocument.feature?.name ?? 'undefined';
  const scenarioName = scenario.pickle.name;
  const testName = `${featureName}-${scenarioName}`
    .replace(/\W/g, '-')
    .toLowerCase();
  const timeStamp = startTime.toISOString().split('.')[0].replace(/:/g, '_');
  const tracePath = `reports/traces/${testName}_${timeStamp}.zip`;
  await stopTracing(context, { path: tracePath });
};
