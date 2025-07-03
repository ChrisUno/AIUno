import { test, expect } from '@playwright/test';
import { checkAllLinks, checkAllButtons, checkAllImages } from './utils';

function randomDelay(min = 100, max = 400) {
  return new Promise(res => setTimeout(res, Math.floor(Math.random() * (max - min + 1)) + min));
}

test.describe('Unosquare.com UI Elements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Remove navigator.webdriver if possible
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    });
    await randomDelay();
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
        await randomDelay();
        await page.keyboard.press('Enter');
        await randomDelay();
        await expect(page).not.toHaveURL('/');
        break;
      }
    }
    expect(found).toBe(true);
  });
}); 