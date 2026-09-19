import puppeteer from "puppeteer";
import fs from "fs";

async function scrapeDownloadLinks() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Replace this with an actual wallpaper page
  await page.goto("https://4kwallpapers.com/nature/", {
    waitUntil: "networkidle2",
  });

  const downloadLinks = await page.evaluate(() => {
    const links = [...document.querySelectorAll("a")];

    return links
      .map((link) => ({
        text: link.innerText.trim(),
        url: link.href,
      }))
      .filter(
        (item) =>
          item.url.includes(".jpg") ||
          item.url.includes(".png") ||
          item.text.includes("Download")
      );
  });

  fs.writeFileSync(
    "download-links.json",
    JSON.stringify(downloadLinks, null, 2)
  );

  console.log(downloadLinks);

  await browser.close();
}

scrapeDownloadLinks();