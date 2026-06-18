import { test } from '@playwright/test';

test('auth setup', async ({ page }) => {
  await page.goto('https://test.dmed.kz');

  await page.getByRole('textbox', { name: 'Логин' }).fill('support_206');
await page.getByRole('textbox', { name: 'Пароль' }).fill('Test12345$');

// убираем фокус с поля пароля
await page.keyboard.press('Tab');

await page.waitForTimeout(2000);

await page.getByRole('button', { name: 'Войти' }).click();

  // ❗ ВАЖНО: не используем networkidle
  await page.waitForURL(/Home/); // или любой URL после логина

  // сохраняем сессию
  await page.context().storageState({ path: 'storageState.json' });
  await page.context().grantPermissions(['notifications']);
});
