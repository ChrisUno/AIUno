import { Page, expect } from '@playwright/test';

function randomDelay(min = 100, max = 400) {
  return new Promise(res => setTimeout(res, Math.floor(Math.random() * (max - min + 1)) + min));
}

export async function getMainNavLinks(page: Page): Promise<string[]> {
  // Try to get all visible nav links from the main navigation bar
  const navLinks = await page.$$eval('nav a[href]', links =>
    links
      .filter(l => {
        const a = l as HTMLAnchorElement;
        return a.offsetParent !== null && typeof a.href === 'string' && !a.href.startsWith('javascript:') && !a.href.endsWith('#');
      })
      .map(l => (l as HTMLAnchorElement).getAttribute('href') || '')
      .filter(Boolean)
  );
  // Remove duplicates and keep only internal links
  return Array.from(new Set(navLinks)).filter(href => href.startsWith('/') || href.startsWith('https://www.unosquare.com'));
}

export async function checkAllLinks(page: Page) {
  const links = await page.$$('a[href]');
  for (const link of links) {
    const url = await link.getAttribute('href');
    if (url && !url.startsWith('javascript:') && !url.startsWith('#')) {
      await link.scrollIntoViewIfNeeded();
      await randomDelay();
      const [response] = await Promise.all([
        page.waitForNavigation({ waitUntil: 'load', timeout: 10000 }).catch(() => null),
        link.click()
      ]);
      await randomDelay();
      await page.goBack();
      await randomDelay();
    }
  }
}

export async function checkAllButtons(page: Page) {
  const buttons = await page.$$('button, input[type="button"], input[type="submit"]');
  for (const button of buttons) {
    if (await button.isVisible() && await button.isEnabled()) {
      await button.scrollIntoViewIfNeeded();
      await randomDelay();
      await button.click().catch(() => {});
      await randomDelay();
      await page.goBack().catch(() => {});
      await randomDelay();
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
      await randomDelay(50, 150);
    }
  }
} 