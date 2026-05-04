import { test } from '@playwright/test';
import { MainPage } from '../pages/MainPage';
import { DigitalOfficePage } from '../pages/DigitalOfficePage';

test('отображается журнал обращений', async ({ page, context }) => {
  await page.goto('https://test.dmed.kz/');

  const mainPage = new MainPage(page);

  await mainPage.openModules();
  await mainPage.openMonitoring();

  const newPage = await mainPage.openDigitalOffice(context);
  await newPage.waitForLoadState('domcontentloaded');

  const digitalOffice = new DigitalOfficePage(newPage);

  await digitalOffice.checkJournalVisible();
});

test('поиск по номеру запроса', async ({ page, context }) => {
  await page.goto('https://test.dmed.kz');

  const mainPage = new MainPage(page);
  await mainPage.openModules();
  await mainPage.openMonitoring();

  const newPage = await mainPage.openDigitalOffice(context);
  
  await newPage.waitForLoadState('domcontentloaded');

  const digitalOffice = new DigitalOfficePage(newPage);

  const number = 'PO-26/4-10';

  await digitalOffice.searchByRequestNumber(number);
  await digitalOffice.checkRequestVisible(number);
});

test('поиск: несуществующий номер', async ({ page, context }) => {
  await page.goto('https://test.dmed.kz');

  const mainPage = new MainPage(page);
  await mainPage.openModules();
  await mainPage.openMonitoring();

  const newPage = await mainPage.openDigitalOffice(context);
  await newPage.waitForLoadState('domcontentloaded');

  const digitalOffice = new DigitalOfficePage(newPage);

  const fakeNumber = 'DO-666';

  await digitalOffice.searchByRequestNumber(fakeNumber);
  await digitalOffice.checkNoResults();
});
