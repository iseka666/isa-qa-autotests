import { Page, expect, Locator } from '@playwright/test';

export class DigitalOfficePage {
  readonly page: Page;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByRole('textbox', { name: 'Поиск по № запроса' });
  }

  async checkJournalVisible() {
    await this.page.locator('text=Журнал регистрации обращений')
      .waitFor({ state: 'visible', timeout: 30000 });
  }

  async searchByRequestNumber(number: string) {
  await this.page.waitForLoadState('domcontentloaded');

  await this.searchInput.waitFor({ state: 'visible', timeout: 15000 });

  await this.searchInput.click();
  await this.searchInput.fill('');

  await this.searchInput.fill(number);

  await this.page.keyboard.press('Enter');
}

  async checkRequestVisible(number: string) {
    await this.page.locator('table').getByText(number)
      .waitFor({ state: 'visible', timeout: 10000 });
  }


async checkNoResults() {
  const rows = this.page.locator('table tbody tr');
  await expect(rows).toHaveCount(0);
}
}
