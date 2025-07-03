import { Page, expect } from '@playwright/test';

export async function checkAllLinks(page: Page) {
  const links = await page.$$('a[href]');
  for (const link of links) {
    const url = await link.getAttribute('href');
    if (url && !url.startsWith('javascript:') && !url.startsWith('#')) {
      const [response] = await Promise.all([
        page.waitForNavigation({ waitUntil: 'load', timeout: 10000 }).catch(() => null),
        link.click({ force: true })
      ]);
      await page.goBack();
    }
  }
}

export async function checkAllButtons(page: Page) {
  const buttons = await page.$$('button, input[type="button"], input[type="submit"]');
  for (const button of buttons) {
    if (await button.isVisible() && await button.isEnabled()) {
      await button.click({ force: true }).catch(() => {});
      await page.goBack().catch(() => {});
    }
  }
}

export async function checkAllImages(page: Page) {
  const images = await page.$$('img');
  for (const img of images) {
    const src = await img.getAttribute('src');
    if (src) {
      const response = await page.request.get(src);
      expect(response.status()).toBeLessThan(400);
    }
  }
} 