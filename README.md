# MK1-framedata-scraper
This is my portion of a collaboration project with Zack Schenck to make a twitch bot that can tell you every frame of each character in the game mortal kombat 1.
My role was to scrape the data from mk1 akademy clean it and return it in JSON format so that zack could create a lookup for the bot to respond to input in the form of a command such as !{charname}-{button}-{ob-oh-su-ofb} which then will let the bot look up what was input and respond with data from the JSON accordingly.

## Functionality
This script is designed to automate the web scraping of character move data from the Kombatakademy website, specifically for the character "Havik" in the game Mortal Kombat. It provides the following functionality:

Data Scraping: The script uses Puppeteer to navigate to the specified URL and scrape move data for the character "Havik." It collects information such as button inputs, startup frames, hit advantage, block advantage, and flawless block data for each move.

Categorization: The script categorizes moves into two main categories: "basic-attacks" and "special-moves." It scrapes data for both categories separately.

Data Storage: The scraped move data is organized into a structured format and stored in a Python list (havik). Each move's data is represented as an object, making it easy to access and manipulate.

JSON Output: The collected data is converted into JSON format and saved to a file named "havik_framedata.json." This JSON file can be used for further analysis or integration into other applications.

Timing: The script includes timing functionality using console.time and console.timeEnd to measure the elapsed time for the scraping process. This feature helps monitor the performance of the script.

Logging: Throughout the script, important details, such as button inputs, are logged to the console. This aids in debugging and monitoring the scraping process.
