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
      if (ext === ".svg") contentType = "image/svg+xml";
      if (ext === ".png") contentType = "image/png";
      if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
      if (ext === ".webp") contentType = "image/webp";

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

  let jsErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      jsErrors.push(`${msg.type()}: ${msg.text()}`);
    }
  });

  page.on('error', err => jsErrors.push(`Page error: ${err.message}`));

  console.log("Loading http://localhost:8765/...");
  await page.goto("http://localhost:8765/", { waitUntil: "load", timeout: 10000 });
  
  console.log("Waiting 3 seconds for React to mount...");
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const bodyHTML = await page.evaluate(() => document.body.innerHTML.substring(0, 500));
  const bodyClass = await page.evaluate(() => document.body.className);
  
  console.log("\n=== BODY CLASS ===");
  console.log(bodyClass);
  
  console.log("\n=== BODY HTML (first 500 chars) ===");
  console.log(bodyHTML);
  
  console.log("\n=== REACT ROOT CHECK ===");
  const reactRoot = await page.evaluate(() => {
    const root = document.getElementById('root') || document.getElementById('app');
    if (!root) return { found: false };
    return {
      found: true,
      childCount: root.children.length,
      textContent: root.textContent.substring(0, 100)
    };
  });
  console.log(JSON.stringify(reactRoot, null, 2));

  console.log("\n=== ALL SCRIPT LOADS ===");
  const scripts = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("script[src]")).map(s => ({
      src: s.src.substring(s.src.lastIndexOf('/') + 1),
      loaded: !!s.complete
    }));
  });
  scripts.forEach(s => console.log(`  ${s.src} (loaded: ${s.loaded})`));

  console.log("\n=== JS ERRORS/WARNINGS ===");
  if (jsErrors.length > 0) {
    jsErrors.slice(0, 5).forEach(e => console.log(`  ${e}`));
  } else {
    console.log("  None");
  }

  console.log("\n=== CHECKING FOR APP CONTENT ===");
  const hasContent = await page.evaluate(() => {
    const h1 = document.querySelector("h1");
    const buttons = document.querySelectorAll("button");
    return {
      h1: !!h1,
      h1Text: h1?.textContent.substring(0, 50),
      buttonCount: buttons.length
    };
  });
  console.log(JSON.stringify(hasContent, null, 2));

  await browser.close();
  server.close();
})();
