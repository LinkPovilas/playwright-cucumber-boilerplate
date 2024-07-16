import { Page, expect } from '@playwright/test';

export const goToLandingPage = async (page: Page) => {
  await page.goto('/');
};

export const ensureUrl = async (page: Page, urlOrRegExp: string | RegExp) => {
  await expect(page).toHaveURL(urlOrRegExp);
};
