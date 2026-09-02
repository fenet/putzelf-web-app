const puppeteer = require("puppeteer");
const http = require("http");
const path = require("path");
const fs = require("fs");

function startServer(port = 8765) {
  return new Promise((resolve) => {
    const distPath = path.join(__dirname, "dist");
    const server = http.createServer((req, res) => {
      let filePath = path.join(distPath, req.url === "/" ? "index.html" : req.url);
      const ext = path.extname(filePath);
      let contentType = "text/html";
      if (ext === ".js") contentType = "text/javascript";
      if (ext === ".css") contentType = "text/css";

      fs.readFile(filePath, (err, content) => {
        if (err) {
          if (err.code === "ENOENT") {
            fs.readFile(path.join(distPath, "index.html"), (err, content) => {
              if (err) {
                res.writeHead(404);
                res.end("Not found");
              } else {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(content);
              }
            });
          } else {
            res.writeHead(500);
            res.end("Server error");
          }
        } else {
          res.writeHead(200, { "Content-Type": contentType });
          res.end(content);
        }
      });
    });
    server.listen(port, () => {
      resolve(server);
    });
  });
}

(async () => {
  const server = await startServer(8765);
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();

  console.log("Loading http://localhost:8765/...");
  await page.goto("http://localhost:8765/", { waitUntil: "networkidle2", timeout: 10000 });
  
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const html = await page.content();
  const bodyText = await page.evaluate(() => document.body.innerText);
  
  console.log("\n=== PAGE TITLE ===");
  console.log(await page.title());
  
  console.log("\n=== BUTTONS IN PAGE ===");
  const buttons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("button")).map(btn => ({
      text: btn.textContent.substring(0, 100),
      class: btn.className
    }));
  });
  buttons.forEach(btn => console.log(`  - "${btn.text}"`));
  
  console.log("\n=== SEARCHING FOR COOKIE-RELATED TEXT ===");
  console.log(`  Contains "Cookie": ${bodyText.includes("Cookie")}`);
  console.log(`  Contains "cookie": ${bodyText.includes("cookie")}`);
  
  console.log("\n=== CHECKING FOR BANNER/MODAL ===");
  const modals = await page.evaluate(() => {
    return {
      divCount: document.querySelectorAll("div[class*='cookie'], div[class*='modal'], [role='dialog']").length,
      text: Array.from(document.querySelectorAll("div[class*='cookie'], div[class*='modal'], [role='dialog']")).map(el => el.textContent.substring(0, 50)).join(" | ")
    };
  });
  console.log(`  Found modals/cookies: ${modals.divCount}`);
  if (modals.divCount > 0) console.log(`  Text: ${modals.text}`);

  console.log("\n=== CURRENT URL ===");
  console.log(page.url());

  console.log("\n=== CHECKING CONSENT STORAGE ===");
  const consent = await page.evaluate(() => {
    return localStorage.getItem("cookieConsent");
  });
  console.log(`  Stored: ${consent}`);

  await browser.close();
  server.close();
})();
