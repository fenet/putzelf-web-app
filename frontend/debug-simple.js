#!/usr/bin/env node

const puppeteer = require('puppeteer');
const http = require('http');
const path = require('path');
const fs = require('fs');

function startServer() {
  return new Promise((resolve) => {
    const distPath = path.join(__dirname, 'dist');
    const server = http.createServer((req, res) => {
      let filePath = path.join(distPath, req.url === "/" ? 'index.html' : req.url);
      fs.readFile(filePath, (err, content) => {
        if (err) {
          fs.readFile(path.join(distPath, 'index.html'), (err, content) => {
            if (err) {
              res.writeHead(404);
              res.end();
            } else {
              res.writeHead(200, { 'Content-Type': 'text/html' });
              res.end(content);
            }
          });
        } else {
          const ext = path.extname(filePath);
          const contentTypes = {
            '.js': 'application/javascript',
            '.css': 'text/css',
            '.svg': 'image/svg+xml',
            '.png': 'image/png',
            '.webp': 'image/webp'
          };
          res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/html' });
          res.end(content);
        }
      });
    });
    server.listen(8765, () => {
      resolve(server);
    });
  });
}

(async () => {
  const server = await startServer();
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:8765/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));
  
  // Get detailed DOM info
  const info = await page.evaluate(() => {
    return {
      bodyHTML: document.body.innerHTML.substring(0, 2000),
      buttons: Array.from(document.querySelectorAll('button')).map(b => ({
        text: b.textContent.trim(),
        visible: b.offsetParent !== null
      })),
      fixedDivs: Array.from(document.querySelectorAll('div[class*="fixed"]')).map(d => ({
        class: d.className,
        text: d.textContent.substring(0, 100)
      }))
    };
  });
  
  console.log('=== BODY START ===');
  console.log(info.bodyHTML);
  console.log('\n=== ALL BUTTONS ===');
  info.buttons.forEach((b, i) => {
    console.log(`${i}: "${b.text}" (visible=${b.visible})`);
  });
  console.log('\n=== FIXED POSITION DIVS ===');
  info.fixedDivs.forEach((d, i) => {
    console.log(`${i}: class="${d.class}" text="${d.text.substring(0, 60)}..."`);
  });
  
  await browser.close();
  server.close();
})();
