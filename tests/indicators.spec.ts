import { test } from '@playwright/test';
import { IndicatorsPage } from '../pages/IndicatorsPage';
import { MainPage } from '../pages/MainPage';
import { INDICATORS } from './data/indicators';

for (const indicator of INDICATORS) {

 test(`Индикатор: ${indicator}`, async ({ page, context }) => {

    await page.goto('https://test.dmed.kz/');

    const mainPage = new MainPage(page);

    await mainPage.openModules();

    await mainPage.openMonitoring();

   const indicatorsPage =
  new IndicatorsPage(
    await mainPage.openIndicators(context)
  );

    await indicatorsPage.search(indicator);

    await indicatorsPage.select(indicator);

    await indicatorsPage.waitForData();

  });

}
