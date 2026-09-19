import puppeteer from "puppeteer";
import fs from "fs";

async function scrapeImages() {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  await page.goto("https://4kwallpapers.com/", {
    waitUntil: "networkidle2",
  });

  // Scroll to load lazy-loaded images
  await autoScroll(page);

  const images = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll("img")];

    return imgs
      .map((img) => ({
        alt: img.alt,
        src:
          img.src ||
          img.getAttribute("data-src") ||
          img.getAttribute("data-lazy-src"),
      }))
      .filter((img) => img.src);
  });

  fs.writeFileSync(
    "images.json",
    JSON.stringify(images, null, 2),
    "utf8"
  );

  console.log(`Found ${images.length} images`);
  console.log("Saved to images.json");

  await browser.close();
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;

      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

scrapeImages();