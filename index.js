const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  console.time('scrapingtime');
  await page.setViewport({
    width: 0,
    height: 0,
    deviceScaleFactor: 1,
  });


  const base_url = 'https://mk1.kombatakademy.com/move-list/?character=havik&kameo=cyrax&date=09-14-2023';

  await page.goto(base_url);
  
  await page.click(
    '#post-142 > div > div > div.move-list-select-view > span:nth-child(3)'
  );
  await page.waitForSelector(
    '#post-142 > div > div > div.move-list-wrapper > div.move-list-table > div > div.basic-attacks > div.move-list-table-body'
  );


  let havik = [];

  // Start a timer for the first part of the scraping process
  console.time('part1Time');

  const textArray = [];

  async function scrapeData(page, selectorPrefix, textArray, havik) {
    for (let i = 1; i < 100; i++) {
      const row = await page.waitForSelector(
        `#post-142 > div > div > div.move-list-wrapper > div.move-list-table > div > div.${selectorPrefix} > div.move-list-table-body > div:nth-child(${i})`
      );
  
      const text = await row.$eval('div:nth-child(1)', (node) =>
        node.textContent.trim()
      );
      const name = text.trim();
  
      let button = await row.$eval('div:nth-child(2)', (node) =>
        node.textContent.replace('+', '').replace(',', '')
      );
  
      if (button.length === 1) {
        button = 's' + button;
      }
  
      console.log(button.trim());
  
      const startup = await row.$eval('div:nth-child(7)', (node) =>
        node.textContent.trim()
      );
      const hit_adv = await row.$eval('div:nth-child(11)', (node) =>
        node.textContent.trim()
      );
      const block_adv = await row.$eval('div:nth-child(12)', (node) =>
        node.textContent.trim()
      );
      const flawless_block = await row.$eval('div:nth-child(13)', (node) =>
        node.textContent.trim()
      );
  
      if (button.trim() === 'THROW or 13' ||button.trim() === 'SSEX') {
        break;
      }
  
      const button_data = {
        'OB': block_adv,
        'OH': hit_adv,
        'OFB': flawless_block,
        'SU': startup,
     
      };
      havik.push([button.trim(), button_data]);
    }
  }
 
  async function end (browser ){
    await browser.close();
  }
  // Stop the timer for the first part
  
  const selectorPrefix = 'basic-attacks';
  const selectorPrefix2 = 'special-moves';
  await scrapeData(page, selectorPrefix, textArray, havik);
  await scrapeData(page, selectorPrefix2, textArray, havik);
  await end(browser);
  console.timeEnd('scrapingtime');
  console.log(havik);
 
})();
















