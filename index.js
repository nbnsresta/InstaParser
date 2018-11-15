const puppeteer = require("puppeteer");

(async function main() {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      timeout: 3000000
    });
    const page = await browser.newPage();

    await page.goto("https://www.instagram.com/p/BqIdiYBlJzA/",
      { timeout: 30000 });

    console.log("now fetching");
    await page.waitForSelector("article");

    const images = await page.$$("img.FFVAD");

    for (const image of images) {
      const src = await page.evaluate(image => image.src, image)
      console.log(src);
    }
  }
  catch (e) {
    console.log("Error occured", e)
  }
})();