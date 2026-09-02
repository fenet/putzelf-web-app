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
  
  // Track network requests
  const requests = [];
  page.on('request', (request) => {
    const url = request.url();
    if (url.includes('googletagmanager') || url.includes('google-analytics') || 
        url.includes('facebook') || url.includes('facebook.com')) {
      requests.push(url);
      console.log(`  ! TRACKER REQUEST: ${url}`);
    }
  });
  
  console.log('\n=== LOADING PAGE ===');
  await page.goto('http://localhost:8765/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));
  
  console.log('\n=== BEFORE ACCEPTING ===');
  console.log(`Tracker requests so far: ${requests.length}`);
  
  let consent = await page.evaluate(() => localStorage.getItem('cookieConsent'));
  console.log(`Stored consent: ${consent}`);
  
  // Try to click the "Accept only necessary" button
  console.log('\n=== CLICKING "ACCEPT ONLY NECESSARY" ===');
  const clicked = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent.includes('Accept only necessary'));
    if (btn) {
      console.log('Found button, clicking...');
      btn.click();
      return true;
    }
    return false;
  });
  
  console.log(`Button clicked: ${clicked}`);
  
  // Wait a bit
  await new Promise(r => setTimeout(r, 1000));
  
  // Check consent again
  console.log('\n=== AFTER CLICKING ===');
  consent = await page.evaluate(() => localStorage.getItem('cookieConsent'));
  console.log(`Stored consent: ${consent}`);
  
  // Check if banner is still visible
  const bannerInfo = await page.evaluate(() => {
    const banner = document.querySelector('div[class*="fixed"][class*="left"]');
    if (banner) {
      const style = window.getComputedStyle(banner);
      return {
        found: true,
        display: style.display,
        visibility: style.visibility
      };
    }
    return { found: false };
  });
  
  console.log(`Banner after click:`, bannerInfo);
  
  console.log(`\nTracker requests throughout: ${requests.length}`);
  requests.forEach(r => console.log(`  - ${r}`));
  
  await browser.close();
  server.close();
})();
