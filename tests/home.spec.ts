import { test, expect } from '@playwright/test';
import { checkAllLinks, checkAllButtons, checkAllImages } from './utils';

test.describe('Unosquare.com UI Elements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('All links are clickable and lead to valid pages', async ({ page }) => {
    await checkAllLinks(page);
  });

  test('All buttons are clickable', async ({ page }) => {
    await checkAllButtons(page);
  });

  test('All images load successfully', async ({ page }) => {
    await checkAllImages(page);
  });

  test('Search box works if present', async ({ page }) => {
    const searchSelectors = [
      'input[type="search"]',
      'input[placeholder*="Search"]',
      'input[aria-label*="Search"]'
    ];
    let found = false;
    for (const selector of searchSelectors) {
      if (await page.$(selector)) {
        found = true;
        await page.fill(selector, 'test');
        await page.keyboard.press('Enter');
        await expect(page).not.toHaveURL('/');
        break;
      }
    }
    expect(found).toBe(true);
  });
}); 