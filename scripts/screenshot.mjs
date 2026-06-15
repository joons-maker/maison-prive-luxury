import { chromium } from "playwright";
import { mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "screenshots");
mkdirSync(OUT, { recursive: true });

const BASE = "http://localhost:3001";

const pages = [
  { name: "home",     path: "/" },
  { name: "request",  path: "/request" },
  { name: "services", path: "/services" },
  { name: "process",  path: "/process" },
  { name: "faq",      path: "/faq" },
];

const viewports = [
  { label: "desktop", width: 1440, height: 900 },
  { label: "mobile",  width: 390,  height: 844 },
];

const browser = await chromium.launch({ headless: true });

for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();

  for (const pg of pages) {
    const url = BASE + pg.path;
    console.log(`Capturing ${vp.label}: ${url}`);
    await page.goto(url, { waitUntil: "networkidle", timeout: 15000 });
    await page.waitForTimeout(800);

    const file = join(OUT, `${pg.name}-${vp.label}.png`);
    await page.screenshot({ path: file, fullPage: true });
    console.log(`  → saved: ${file}`);
  }

  await ctx.close();
}

await browser.close();
console.log("\nAll screenshots saved to:", OUT);
