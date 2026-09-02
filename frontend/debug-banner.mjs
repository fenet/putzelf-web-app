import puppeteer from 'puppeteer';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let server;
let browser;

async function startServer() {
  const distPath = path.join(__dirname, 'dist');
  
  server = http.createServer((req, res) => {
    let filePath = path.join(distPath, req.url === '/' ? 'index.html' : req.url);
    const extname = path.extname(filePath);
    
    let contentType = 'text/html';
    if (extname === '.js') contentType = 'application/javascript';
    else if (extname === '.css') contentType = 'text/css';
    else if (extname === '.svg') contentType = 'image/svg+xml';
    else if (extname === '.webp') contentType = 'image/webp';
    else if (extname === '.png') contentType = 'image/png';
    else if (extname === '.jpg') contentType = 'image/jpeg';
    
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404);
        res.end();
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
  
  return new Promise((resolve) => {
    server.listen(8765, () => {
      console.log('✓ HTTP server running on http://localhost:8765');
      resolve();
    });
  });
}

async function debug() {
  try {
    await startServer();
    
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Capture all console messages
    const consoleLogs = [];
    page.on('console', msg => {
      consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
    });
    
    // Intercept network requests
    await page.on('response', response => {
      const url = response.url();
      if (url.includes('googletagmanager') || url.includes('google-analytics') || 
          url.includes('facebook') || url.includes('gtag') || url.includes('fbq')) {
        console.log(`  ! Tracker request: ${url}`);
      }
    });
    
    console.log('\nLoading http://localhost:8765/...');
    await page.goto('http://localhost:8765/', { waitUntil: 'networkidle2' });
    
    console.log('Waiting 2 seconds for React to fully mount...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check for banner elements
    console.log('\n=== CHECKING BANNER ELEMENTS ===');
    
    const bannerSelectors = [
      '[class*="cookie"]',
      '[class*="consent"]',
      '[class*="Cookie"]',
      '[class*="Consent"]',
      'div[role="dialog"]',
      '[role="alertdialog"]'
    ];
    
    for (const selector of bannerSelectors) {
      const found = await page.$$(selector);
      if (found.length > 0) {
        console.log(`✓ Found ${found.length} elements matching: ${selector}`);
      }
    }
    
    // Get all divs with specific class keywords
    const allElements = await page.evaluate(() => {
      const elements = [];
      document.querySelectorAll('[class*="cookie"], [class*="consent"], [class*="banner"], [class*="modal"]').forEach(el => {
        elements.push({
          tag: el.tagName,
          class: el.className,
          text: el.textContent.substring(0, 100),
          visible: el.offsetParent !== null
        });
      });
      return elements;
    });
    
    console.log('\nFound elements:');
    allElements.forEach((el, i) => {
      console.log(`  ${i}: <${el.tag}> class="${el.class}" visible=${el.visible} text="${el.text.substring(0, 50)}..."`);
    });
    
    // Check localStorage
    const consent = await page.evaluate(() => {
      return localStorage.getItem('cookieConsent');
    });
    console.log(`\nLocalStorage cookieConsent: ${consent || 'null'}`);
    
    // Check for button text
    console.log('\n=== LOOKING FOR CONSENT BUTTONS ===');
    const buttons = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('button')).map(b => ({
        text: b.textContent.trim().substring(0, 50),
        class: b.className
      })).filter(b => b.text.length > 0);
    });
    
    console.log(`Found ${buttons.length} buttons:`);
    buttons.slice(0, 10).forEach((btn, i) => {
      console.log(`  ${i}: "${btn.text}"`);
    });
    
    // Check body HTML
    const bodyHTML = await page.evaluate(() => {
      const clone = document.body.cloneNode(true);
      // Remove large images
      clone.querySelectorAll('img').forEach(img => img.remove());
      return clone.innerHTML.substring(0, 1000);
    });
    
    console.log('\n=== BODY HTML (first 1000 chars) ===');
    console.log(bodyHTML);
    
    // Check window globals
    const globals = await page.evaluate(() => ({
      gtag: typeof window.gtag !== 'undefined',
      fbq: typeof window.fbq !== 'undefined',
      GTM: typeof window.google !== 'undefined'
    }));
    
    console.log('\n=== WINDOW GLOBALS ===');
    console.log(JSON.stringify(globals, null, 2));
    
    console.log('\n=== CONSOLE LOGS ===');
    consoleLogs.forEach(log => console.log(`  ${log}`));
    
  } catch (error) {
    console.error('Debug error:', error);
  } finally {
    if (browser) await browser.close();
    if (server) server.close();
  }
}

debug();
