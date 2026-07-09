import { chromium } from "playwright";
import { mkdirSync } from "fs";

const OUT = "/tmp/josee-shots";
mkdirSync(OUT, { recursive: true });

const pages = [
  ["home", "/"],
  ["proprietes", "/proprietes"],
  ["detail", "/proprietes/residence-contemporaine-westmount"],
  ["contact", "/contact"],
  ["apropos", "/a-propos"],
  ["guides", "/guides"],
];

const browser = await chromium.launch();

// Desktop full-page
const dctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
for (const [name, path] of pages) {
  const page = await dctx.newPage();
  await page.goto("http://localhost:3000" + path, { waitUntil: "networkidle" });
  await page.waitForTimeout(1400); // laisser jouer les animations d'entrée
  await page.evaluate(async () => {
    await new Promise((r) => {
      let y = 0;
      const t = setInterval(() => {
        window.scrollBy(0, 900);
        y += 900;
        if (y > document.body.scrollHeight) { clearInterval(t); r(); }
      }, 120);
    });
  });
  await page.waitForTimeout(600);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/${name}-desktop.png`, fullPage: true });
  console.log("shot", name, "desktop");
  await page.close();
}
await dctx.close();

// Mobile home + contact
const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
for (const [name, path] of [["home", "/"], ["proprietes", "/proprietes"]]) {
  const page = await mctx.newPage();
  await page.goto("http://localhost:3000" + path, { waitUntil: "networkidle" });
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${OUT}/${name}-mobile.png`, fullPage: true });
  console.log("shot", name, "mobile");
  await page.close();
}
await mctx.close();

await browser.close();
console.log("done ->", OUT);
