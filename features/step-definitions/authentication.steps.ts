import { Given, Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import {
  ensureUrl,
  goToLandingPage,
} from '../../src/helper-methods/navigation';
import { loginAs } from '../../src/helper-methods/authentication';

Given('I navigate to the landing page', async function (this: CustomWorld) {
  await goToLandingPage(this.page);
});

When(
  'I login as {string}',
  async function (this: CustomWorld, userType: string) {
    await loginAs(this.page, userType);
  }
);

Then(
  'I should be redirected to the contact list page',
  async function (this: CustomWorld) {
    await ensureUrl(this.page, /\/contactList/);
  }
);
