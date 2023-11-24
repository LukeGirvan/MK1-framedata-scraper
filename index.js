const puppeteer = require('puppeteer');
const readline = require('readline');
const fs = require('fs');

(async () => {
  
  // Create a readline interface to get user input
  const askUserCharName = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Prompt the user for the character name
  askUserCharName.question('enter char name use - and not spaces: ', async (charname) => {
    
    // Close the readline interface as we have the input we need
    askUserCharName.close();

    // Launch the Puppeteer browser
    const browser = await puppeteer.launch({
      executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
      headless: false, // Run the browser in non-headless mode for debugging
      defaultViewport: null, // Set the viewport to null for a custom window size
      devtools: true, // Enable DevTools for debugging
      args: ["--window-size=1920,1080", "--window-position=1921,0"] // Set browser window size and position
    });
    const page = await browser.newPage();
    
    // Construct the URL based on the character name
    const base_url = `https://mk1.kombatakademy.com/move-list/?character=${charname}&kameo=cyrax&date=09-14-2023`;
    await page.goto(base_url);

    // Click the button to switch to table view
    await page.click(
      '#post-142 > div > div > div.move-list-select-view > span:nth-child(3)'
    );
   
    // Wait for the table view selector to be visible
    await page.waitForSelector('#post-142 > div > div > div.move-list-select-view > span:nth-child(3)');

    const arr = []; // Array to store scraped data
    
    // Function to scrape data from the webpage
    async function scrapeData(page, selectorPrefix, textArray, arr) {
      for (let i = 1; i < 100; i++) {
        const row = await page.waitForSelector(
          `#post-142 > div > div > div.move-list-wrapper > div.move-list-table > div > div.${selectorPrefix} > div.move-list-table-body > div:nth-child(${i})`
        );
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

        const button_data = {
          'OB': block_adv,
          'OH': hit_adv,
          'OFB': flawless_block,
          'SU': startup,
        };
        arr.push([button.trim(), button_data]);
        if (button.trim() === 'THROW or 13' || button.trim() === 'SSEX') {
            break; // Stop scraping when specific conditions are met
          }
      }
      
    }

    // Function to close the browser
    async function end(browser) {
      await browser.close();
    }
   

    const selectorPrefix = 'basic-attacks'; // Selector for basic attacks
    const selectorPrefix2 = 'special-moves'; // Selector for special moves
    await scrapeData(page, selectorPrefix, textArray, arr); // Scrape data for basic attacks
    await scrapeData(page, selectorPrefix2, textArray, arr); // Scrape data for special moves
    await end(browser); // Close the browser
    const jsonOutput = {};
    arr.forEach(([key, value]) => {
    jsonOutput[key] = value;
    });

    // Save the scraped data as JSON to a file
    const jsonString = JSON.stringify(jsonOutput, null, 2); // Prettify the JSON with 2 spaces for indentation
    fs.writeFileSync(`${charname}_framedata.json`, jsonString);
    
    console.log(arr); // Print the scraped data

  });
})();


