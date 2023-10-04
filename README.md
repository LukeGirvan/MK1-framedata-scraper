# MK1-framedata-scraper
This is my portion of a collaboration project with Zack Schenck to make a twitch bot that can tell you every frame of each character in the game mortal kombat 1.
My role was to scrape the data from mk1 akademy clean it and return it in JSON format so that zack could create a lookup for the bot to respond to input in the form of a command such as !{charname}-{button}-{ob-oh-su-ofb} which then will let the bot look up what was input and respond with data from the JSON accordingly.

## Features
-User Input: The script prompts the user to input a character's name using a readline interface in the command line.
this it to dynamically change the link to get other characters data without having to change the script over and over.

-Scraping Move Data: It scrapes data for both basic attacks and special moves from the website. The scraped data includes button notation, startup frames, block advantage, hit advantage, and flawless block properties.

-Data Formatting: The scraped data is structured as an array of arrays, where each sub-array contains the button notation and an associated object with frame data.

-Saving as JSON: The script converts the structured data into a JSON object and saves it as a JSON file with a filename based on the character's name.




![image](https://github.com/LukeGirvan/MK1-framedata-scraper/assets/126108451/f96f55b0-34ea-4835-a98b-d22b037a8d7d)



## Usage
Run the script in your terminal using Node.js.

Enter the character's name using '-' instead of spaces when prompted.

The script will navigate to the website, scrape the move data, and save it as a JSON file in the same directory.

Example
For example, if you input "sub-zero" when prompted, the script will scrape Sub-Zero's move data and save it as "sub-zero_framedata.json."

Logging: Throughout the script, important details, such as button inputs, are logged to the console. This aids in debugging and monitoring the scraping process.
