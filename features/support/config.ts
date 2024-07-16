import { BrowserContextOptions, LaunchOptions } from '@playwright/test';
import env from './env';

interface Config {
  browser: typeof env.BROWSER;
  launchOptions?: LaunchOptions;
  browserContextOptions?: BrowserContextOptions;
  actionTimeout: number;
  cucumberStepTimeout: number;
}

const config: Config = {
  browser: env.BROWSER,
  launchOptions: {
    headless: true,
    slowMo: 0,
    args: [
      '--use-fake-ui-for-media-stream',
      '--use-fake-device-for-media-stream',
    ],
    firefoxUserPrefs: {
      'media.navigator.streams.fake': true,
      'media.navigator.permission.disabled': true,
    },
  },
  browserContextOptions: {
    baseURL: env.BASE_URL,
  },
  actionTimeout: 5_000,
  cucumberStepTimeout: 10_000,
};

export default config;
