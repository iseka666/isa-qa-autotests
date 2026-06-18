import { Page, BrowserContext } from '@playwright/test';

export class MainPage {
  constructor(private page: Page) {}

async openModules() {
  const modules = this.page.getByRole('link', { name: 'Модули' });

  await modules.waitFor({ state: 'visible' });
  await modules.click();
}
 
 async openMonitoring() {
  const monitoring = this.page.getByText('Мониторинг показателей работы');

  await monitoring.waitFor({ state: 'visible', timeout: 10000 });
  await monitoring.click();
}

 async openDigitalOffice(context: BrowserContext) {
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    this.page.getByRole('link', { name: 'Цифровая канцелярия' }).click()
  ]);

  await newPage.waitForURL('**warehouse-test.dmed.kz/**');

  // ❗ НЕ networkidle
  await newPage.waitForLoadState('domcontentloaded');

  return newPage;
}
async openIndicators(context: BrowserContext) {
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    this.page.getByRole('link', { name: 'Индикаторы' }).click()
  ]);

  await newPage.waitForURL('**warehouse-test.dmed.kz/**');
  await newPage.waitForLoadState('domcontentloaded');

  return newPage;
}
}