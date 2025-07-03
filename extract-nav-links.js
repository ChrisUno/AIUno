const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.unosquare.com');
  const links = await page.$$eval('nav a[href]', links =>
    Array.from(new Set(links.map(l => l.href))).filter(href => href.startsWith('https://www.unosquare.com'))
  );
  console.log(JSON.stringify(links, null, 2));
  await browser.close();
})(); 