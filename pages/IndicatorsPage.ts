import { Page, expect, Locator } from '@playwright/test';

export class IndicatorsPage {
  page: Page;
  searchInput: Locator;
  noData: Locator;
  table: Locator;

  constructor(page: Page) {
    this.page = page;

    this.searchInput = page.getByPlaceholder('Поиск индикатора');
    this.noData = page.locator('text=Нет данных');
    this.table = page.locator('table');
  }

 async open() {
  await this.page.goto('https://warehouse-test.dmed.kz/indicators', {
    waitUntil: 'domcontentloaded',
  });

  // ждём что реально загрузился инпут
  await this.page.getByPlaceholder('Поиск индикатора').waitFor({
    state: 'visible',
    timeout: 15000
  });
}

async search(name: string) {

    const input =
        this.page.getByPlaceholder('Поиск индикатора');

    console.log(await this.page.url());
    console.log(await this.page.title());

    await this.page.screenshot({
        path: 'search-page.png',
        fullPage: true
    });

    await input.waitFor({
        state: 'visible',
        timeout: 30000
    });

    await input.clear();
    await input.fill(name);

    await this.page.waitForTimeout(1000);
}

 async select(name: string) {

  const indicator =
    this.page.getByText(name, {
      exact: false
    });

  await indicator.waitFor({
    state: 'visible',
    timeout: 30000
  });

  await indicator.click();

}
  async waitForData() {

  await Promise.race([

    this.page.locator('table')
      .waitFor({
        timeout: 30000
      }),

    this.page.getByText('Нет данных')
      .waitFor({
        timeout: 30000
      })

  ]);

}
  
  async waitForIndicatorsResponse() {
  await this.page.waitForResponse((resp) =>
    resp.url().includes('/indicator') && resp.status() === 200
  );
}
async ensureCorrectPage() {
  if (!this.page.url().includes('/indicators')) {
    await this.page.goto('https://warehouse-test.dmed.kz/indicators');
  }
}

}