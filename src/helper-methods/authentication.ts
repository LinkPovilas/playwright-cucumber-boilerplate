import { Page } from '@playwright/test';
import { getUserData } from '../utils/user-map';

export const enterEmail = async (page: Page, email: string) => {
  await page.getByPlaceholder('Email').fill(email);
};

export const enterPassword = async (page: Page, password: string) => {
  await page.getByPlaceholder('Password').fill(password);
};

export const clickSubmit = async (page: Page) => {
  await page.getByRole('button', { name: 'Submit' }).click();
};

export const loginAs = async (page: Page, userType: string) => {
  const { email, password } = getUserData(userType);
  await enterEmail(page, email);
  await enterPassword(page, password);
  await clickSubmit(page);
};
