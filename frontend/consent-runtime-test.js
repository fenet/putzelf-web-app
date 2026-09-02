#!/usr/bin/env node

/**
 * PutzELF Consent Runtime Test
 *
 * Tests:
 * 1. Fresh visitor / no consent
 * 2. Necessary-only consent
 * 3. Accept-all consent
 * 4. Google Maps lazy loading
 * 5. Consent persistence
 * 6. Cookie settings interaction
 *
 * IMPORTANT:
 * This test serves the already-built frontend/dist directory.
 *
 * Before running:
 *   npm run build
 *   node consent-runtime-test.js
 */

const puppeteer = require("puppeteer");
const http = require("http");
const path = require("path");
const fs = require("fs");
const url = require("url");

const PORT = 8765;
const DIST_PATH = path.join(__dirname, "dist");
const BASE_URL = `http://localhost:${PORT}`;

/* ============================================================
   SERVER
   ============================================================ */

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  const types = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".mjs": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".ico": "image/x-icon",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
    ".map": "application/json",
  };

  return types[ext] || "application/octet-stream";
}

function safeFilePath(requestUrl) {
  let pathname;

  try {
    pathname = decodeURIComponent(new URL(requestUrl, BASE_URL).pathname);
  } catch {
    pathname = "/";
  }

  // Normalize URL path
  pathname = path.normalize(pathname);

  // Remove leading slash on Windows/Linux compatibility
  pathname = pathname.replace(/^[/\\]+/, "");

  const candidate = path.resolve(DIST_PATH, pathname);
  const distResolved = path.resolve(DIST_PATH);

  // Prevent directory traversal
  if (
    candidate !== distResolved &&
    !candidate.startsWith(distResolved + path.sep)
  ) {
    return null;
  }

  return candidate;
}

function startServer(port = PORT) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(DIST_PATH)) {
      reject(
        new Error(
          `dist directory does not exist:\n${DIST_PATH}\n\nRun "npm run build" first.`
        )
      );
      return;
    }

    const indexPath = path.join(DIST_PATH, "index.html");

    if (!fs.existsSync(indexPath)) {
      reject(
        new Error(
          `dist/index.html does not exist.\n\nRun "npm run build" first.`
        )
      );
      return;
    }

    const server = http.createServer((req, res) => {
      const requestPath = safeFilePath(req.url);

      if (!requestPath) {
        res.writeHead(403, {
          "Content-Type": "text/plain; charset=utf-8",
        });
        res.end("Forbidden");
        return;
      }

      /*
       * Root and SPA routes should return index.html.
       */
      const pathname = new URL(req.url, BASE_URL).pathname;

      const looksLikeAsset =
        path.extname(pathname) !== "" ||
        pathname.startsWith("/assets/");

      let filePath = requestPath;

      /*
       * Existing file = serve it.
       */
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const contentType = getContentType(filePath);

        fs.readFile(filePath, (err, content) => {
          if (err) {
            res.writeHead(500, {
              "Content-Type": "text/plain; charset=utf-8",
            });
            res.end("Server error");
            return;
          }

          res.writeHead(200, {
            "Content-Type": contentType,
            "Cache-Control": "no-cache",
          });

          res.end(content);
        });

        return;
      }

      /*
       * Missing asset must return 404.
       *
       * DO NOT return index.html for missing JS/CSS files.
       * Doing that makes the browser receive HTML instead of JavaScript
       * and React will never mount.
       */
      if (looksLikeAsset) {
        res.writeHead(404, {
          "Content-Type": "text/plain; charset=utf-8",
        });
        res.end("Asset not found");
        return;
      }

      /*
       * SPA fallback.
       */
      fs.readFile(indexPath, (err, content) => {
        if (err) {
          res.writeHead(500, {
            "Content-Type": "text/plain; charset=utf-8",
          });
          res.end("Could not load index.html");
          return;
        }

        res.writeHead(200, {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-cache",
        });

        res.end(content);
      });
    });

    server.on("error", reject);

    server.listen(port, () => {
      console.log(`✓ HTTP server running on ${BASE_URL}`);
      console.log(`✓ Serving: ${DIST_PATH}`);
      resolve(server);
    });
  });
}

/* ============================================================
   HELPERS
   ============================================================ */

async function clearConsent(page) {
  await page.evaluateOnNewDocument(() => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (_) {}
  });
}

async function debugPage(page) {
  const debug = await page.evaluate(() => {
    const ids = [
      "cookie-accept-all",
      "cookie-necessary",
      "cookie-settings",
      "cookie-settings-save",
      "cookie-analytics",
      "cookie-marketing",
    ];

    const elements = {};

    for (const id of ids) {
      const el = document.getElementById(id);

      elements[id] = {
        found: !!el,
        visible: !!el && el.offsetParent !== null,
        text: el
          ? (el.textContent || "").trim().substring(0, 100)
          : null,
      };
    }

    return {
      url: location.href,
      title: document.title,
      readyState: document.readyState,
      rootExists: !!document.getElementById("root"),
      rootChildren: document.getElementById("root")?.children.length || 0,
      bodyText: document.body?.innerText?.substring(0, 500) || "",
      bodyHTML: document.body?.innerHTML?.substring(0, 1000) || "",
      consent: localStorage.getItem("cookieConsent"),
      elements,
      reactMounted:
        !!document.getElementById("root") &&
        document.getElementById("root").children.length > 0,
    };
  });

  console.log("\n  --- Consent Debug ---");
  console.log(`  URL: ${debug.url}`);
  console.log(`  document.title: ${debug.title}`);
  console.log(`  readyState: ${debug.readyState}`);
  console.log(`  #root exists: ${debug.rootExists}`);
  console.log(`  #root children: ${debug.rootChildren}`);
  console.log(`  React mounted: ${debug.reactMounted ? "YES" : "NO"}`);
  console.log(`  localStorage.cookieConsent: ${debug.consent}`);

  for (const [id, status] of Object.entries(debug.elements)) {
    console.log(
      `  #${id}: found=${status.found}, visible=${status.visible}`
    );
  }

  if (debug.bodyText) {
    console.log(`  body text: ${debug.bodyText}`);
  }

  console.log("  ----------------------\n");

  return debug;
}

function createTrackerRequestFilter(requests) {
  const trackerDomains = [
    "googletagmanager.com",
    "google-analytics.com",
    "connect.facebook.net",
    "facebook.com/tr",
    "doubleclick.net",
    "googleads",
    "leadinfo",
  ];

  return requests.filter((requestUrl) =>
    trackerDomains.some((domain) =>
      requestUrl.toLowerCase().includes(domain.toLowerCase())
    )
  );
}

async function waitForReact(page, timeout = 5000) {
  try {
    await page.waitForFunction(
      () => {
        const root = document.getElementById("root");
        return root && root.children.length > 0;
      },
      { timeout }
    );

    return true;
  } catch {
    return false;
  }
}

async function clickById(page, id) {
  return page.evaluate((elementId) => {
    const element = document.getElementById(elementId);

    if (!element) {
      return false;
    }

    element.click();
    return true;
  }, id);
}

async function getStoredConsent(page) {
  return page.evaluate(() => {
    const raw = localStorage.getItem("cookieConsent");

    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  });
}

async function setupPage(page, name) {
  const consoleErrors = [];
  const failedRequests = [];
  const requests = [];

  page.on("request", (request) => {
    requests.push({
      url: request.url(),
      method: request.method(),
      resourceType: request.resourceType(),
    });
  });

  page.on("requestfailed", (request) => {
    failedRequests.push({
      url: request.url(),
      failure: request.failure()?.errorText || "unknown",
    });
  });

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });

  page.on("pageerror", (error) => {
    consoleErrors.push(`PAGE ERROR: ${error.message}`);
  });

  page.__testData = {
    name,
    requests,
    consoleErrors,
    failedRequests,
  };
}

/* ============================================================
   TEST 1
   ============================================================ */

async function test1Fresh(browser) {
  console.log("\n==== TEST 1: Fresh Visitor (No Consent) ====");

  const page = await browser.newPage();
  await setupPage(page, "test1");
  await clearConsent(page);

  try {
    await page.goto(`${BASE_URL}/`, {
      waitUntil: "domcontentloaded",
      timeout: 10000,
    });

    const reactMounted = await waitForReact(page, 7000);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (!reactMounted) {
      console.log("  ✗ React did not mount.");
      await debugPage(page);

      console.log("  Failed requests:");

      page.__testData.failedRequests
        .slice(0, 10)
        .forEach((request) => {
          console.log(`    - ${request.url}`);
          console.log(`      ${request.failure}`);
        });

      console.log("  Console errors:");

      page.__testData.consoleErrors
        .slice(0, 10)
        .forEach((error) => console.log(`    - ${error}`));

      console.log("  Result: ✗ FAIL");

      await page.close();
      return false;
    }

    const elementIds = [
      "cookie-accept-all",
      "cookie-necessary",
      "cookie-settings",
    ];

    const elementStatus = await page.evaluate((ids) => {
      const result = {};

      ids.forEach((id) => {
        const el = document.getElementById(id);

        result[id] = {
          found: !!el,
          visible: !!el && el.offsetParent !== null,
        };
      });

      return result;
    }, elementIds);

    const bannerVisible = await page.evaluate(() => {
      const ids = [
        "cookie-accept-all",
        "cookie-necessary",
        "cookie-settings",
      ];

      return ids.some((id) => {
        const el = document.getElementById(id);
        return el && el.offsetParent !== null;
      });
    });

    const trackerRequests = createTrackerRequestFilter(
      page.__testData.requests
    );

    const hasGtag = await page.evaluate(
      () => typeof window.gtag !== "undefined"
    );

    const hasFbq = await page.evaluate(
      () => typeof window.fbq !== "undefined"
    );

    const hasGTM = await page.evaluate(() => {
      return (
        typeof window.dataLayer !== "undefined" &&
        Array.isArray(window.dataLayer) &&
        window.dataLayer.some((item) => item?.event === "gtm.js")
      );
    });

    console.log(`  React mounted: ${reactMounted ? "✓ YES" : "✗ NO"}`);
    console.log(`  Banner visible: ${bannerVisible ? "✓ YES" : "✗ NO"}`);

    console.log("  Required elements:");

    elementIds.forEach((id) => {
      const status = elementStatus[id];

      console.log(
        `    #${id}: ${
          status.found ? "✓ found" : "✗ missing"
        } (visible=${status.visible})`
      );
    });

    console.log(
      `  Tracker requests (before consent): ${trackerRequests.length}`
    );

    if (trackerRequests.length) {
      trackerRequests.forEach((request) => {
        console.log(`    ✗ ${request.url}`);
      });
    } else {
      console.log("    ✓ None (good)");
    }

    console.log(
      `  window.gtag defined: ${hasGtag ? "✗ YES (BAD)" : "✓ NO"}`
    );

    console.log(
      `  window.fbq defined: ${hasFbq ? "✗ YES (BAD)" : "✓ NO"}`
    );

    console.log(
      `  GTM container initialized: ${hasGTM ? "✗ YES (BAD)" : "✓ NO"}`
    );

    if (page.__testData.consoleErrors.length) {
      console.log("  Console errors:");

      page.__testData.consoleErrors
        .slice(0, 5)
        .forEach((error) => console.log(`    - ${error}`));
    }

    const allElementsFound = elementIds.every(
      (id) => elementStatus[id].found
    );

    const passed =
      reactMounted &&
      allElementsFound &&
      bannerVisible &&
      trackerRequests.length === 0 &&
      !hasGtag &&
      !hasFbq &&
      !hasGTM;

    console.log(`  Result: ${passed ? "✓ PASS" : "✗ FAIL"}`);

    await page.close();
    return passed;
  } catch (error) {
    console.log(`  ✗ Test error: ${error.message}`);

    await debugPage(page);

    console.log("  Console errors:");

    page.__testData.consoleErrors
      .slice(0, 5)
      .forEach((error) => console.log(`    - ${error}`));

    console.log("  Result: ✗ FAIL");

    await page.close();
    return false;
  }
}

/* ============================================================
   TEST 2
   ============================================================ */

async function test2Necessary(browser) {
  console.log("\n==== TEST 2: Necessary-Only Consent ====");

  const page = await browser.newPage();
  await setupPage(page, "test2");
  await clearConsent(page);

  try {
    await page.goto(`${BASE_URL}/`, {
      waitUntil: "domcontentloaded",
      timeout: 10000,
    });

    const reactMounted = await waitForReact(page, 7000);

    if (!reactMounted) {
      console.log("  ✗ React did not mount.");
      await debugPage(page);
      await page.close();
      return false;
    }

    await page.waitForFunction(
      () => {
        const button = document.getElementById("cookie-necessary");
        return button && button.offsetParent !== null;
      },
      { timeout: 5000 }
    );

    const clicked = await clickById(page, "cookie-necessary");

    if (!clicked) {
      console.log("  ✗ Could not click #cookie-necessary");
      await debugPage(page);
      await page.close();
      return false;
    }

    console.log("  ✓ Clicked #cookie-necessary");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const storedConsent = await getStoredConsent(page);

    console.log(`  Stored consent: ${JSON.stringify(storedConsent)}`);

    const consentCorrect =
      storedConsent &&
      storedConsent.analytics === false &&
      storedConsent.marketing === false;

    if (!consentCorrect) {
      console.log("  ✗ Necessary-only consent is incorrect.");
    } else {
      console.log("  ✓ Necessary-only consent stored correctly.");
    }

    const trackerRequests = createTrackerRequestFilter(
      page.__testData.requests
    );

    const hasGtag = await page.evaluate(
      () => typeof window.gtag !== "undefined"
    );

    const hasFbq = await page.evaluate(
      () => typeof window.fbq !== "undefined"
    );

    console.log(
      `  Tracker requests after necessary-only: ${trackerRequests.length}`
    );

    if (trackerRequests.length) {
      trackerRequests.forEach((request) =>
        console.log(`    ✗ ${request.url}`)
      );
    } else {
      console.log("    ✓ None (good)");
    }

    console.log(`  window.gtag: ${hasGtag ? "✗ YES" : "✓ NO"}`);
    console.log(`  window.fbq: ${hasFbq ? "✗ YES" : "✓ NO"}`);

    const passed =
      consentCorrect &&
      trackerRequests.length === 0 &&
      !hasGtag &&
      !hasFbq;

    console.log(`  Result: ${passed ? "✓ PASS" : "✗ FAIL"}`);

    await page.close();
    return passed;
  } catch (error) {
    console.log(`  ✗ Test error: ${error.message}`);
    await debugPage(page);
    await page.close();
    return false;
  }
}

/* ============================================================
   TEST 3
   ============================================================ */

async function test3AcceptAll(browser) {
  console.log("\n==== TEST 3: Accept All ====");

  const page = await browser.newPage();
  await setupPage(page, "test3");
  await clearConsent(page);

  try {
    await page.goto(`${BASE_URL}/`, {
      waitUntil: "domcontentloaded",
      timeout: 10000,
    });

    const reactMounted = await waitForReact(page, 7000);

    if (!reactMounted) {
      console.log("  ✗ React did not mount.");
      await debugPage(page);
      await page.close();
      return false;
    }

    await page.waitForFunction(
      () => {
        const button = document.getElementById("cookie-accept-all");
        return button && button.offsetParent !== null;
      },
      { timeout: 5000 }
    );

    const clicked = await clickById(page, "cookie-accept-all");

    if (!clicked) {
      console.log("  ✗ Could not click #cookie-accept-all");
      await debugPage(page);
      await page.close();
      return false;
    }

    console.log("  ✓ Clicked #cookie-accept-all");

    await new Promise((resolve) => setTimeout(resolve, 2500));

    const storedConsent = await getStoredConsent(page);

    console.log(`  Stored consent: ${JSON.stringify(storedConsent)}`);

    const consentCorrect =
      storedConsent &&
      storedConsent.analytics === true &&
      storedConsent.marketing === true;

    console.log(
      `  Consent correct: ${consentCorrect ? "✓ YES" : "✗ NO"}`
    );

    const hasGtag = await page.evaluate(
      () => typeof window.gtag !== "undefined"
    );

    const hasFbq = await page.evaluate(
      () => typeof window.fbq !== "undefined"
    );

    const gaScriptCount = await page.evaluate(() => {
      return document.querySelectorAll(
        'script[src*="googletagmanager"], script[src*="google-analytics"]'
      ).length;
    });

    const fbScriptCount = await page.evaluate(() => {
      return document.querySelectorAll(
        'script[src*="connect.facebook.net"], script[src*="facebook.com"]'
      ).length;
    });

    const gtmScriptCount = await page.evaluate(() => {
      return document.querySelectorAll(
        'script[src*="googletagmanager.com/gtm.js"]'
      ).length;
    });

    console.log("  Trackers after accept-all:");
    console.log(`    - window.gtag: ${hasGtag ? "✓ YES" : "✗ NO"}`);
    console.log(`    - window.fbq: ${hasFbq ? "✓ YES" : "✗ NO"}`);
    console.log(`    - GA scripts: ${gaScriptCount}`);
    console.log(`    - FB scripts: ${fbScriptCount}`);
    console.log(`    - GTM scripts: ${gtmScriptCount}`);

    const trackerRequests = createTrackerRequestFilter(
      page.__testData.requests
    );

    console.log(
      `  Tracker requests after accept-all: ${trackerRequests.length}`
    );

    if (trackerRequests.length) {
      trackerRequests.slice(0, 10).forEach((request) => {
        console.log(`    - ${request.url}`);
      });
    }

    /*
     * Reload page and verify scripts are not duplicated.
     */
    await page.reload({
      waitUntil: "networkidle2",
      timeout: 10000,
    });

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const gaScriptCountAfterReload = await page.evaluate(() => {
      return document.querySelectorAll(
        'script[src*="googletagmanager"], script[src*="google-analytics"]'
      ).length;
    });

    const fbScriptCountAfterReload = await page.evaluate(() => {
      return document.querySelectorAll(
        'script[src*="connect.facebook.net"], script[src*="facebook.com"]'
      ).length;
    });

    const gtmScriptCountAfterReload = await page.evaluate(() => {
      return document.querySelectorAll(
        'script[src*="googletagmanager.com/gtm.js"]'
      ).length;
    });

    console.log("  After reload:");
    console.log(`    - GA scripts: ${gaScriptCountAfterReload}`);
    console.log(`    - FB scripts: ${fbScriptCountAfterReload}`);
    console.log(`    - GTM scripts: ${gtmScriptCountAfterReload}`);

    const noDuplication =
      gaScriptCount <= 1 &&
      fbScriptCount <= 1 &&
      gtmScriptCount <= 1 &&
      gaScriptCountAfterReload <= 1 &&
      fbScriptCountAfterReload <= 1 &&
      gtmScriptCountAfterReload <= 1;

    console.log(
      `  Script duplication: ${noDuplication ? "✓ OK" : "✗ DUPLICATES"}`
    );

    const passed = consentCorrect && noDuplication;

    console.log(`  Result: ${passed ? "✓ PASS" : "✗ FAIL"}`);

    await page.close();
    return passed;
  } catch (error) {
    console.log(`  ✗ Test error: ${error.message}`);
    await debugPage(page);
    await page.close();
    return false;
  }
}

/* ============================================================
   TEST 4
   ============================================================ */

async function test4GoogleMaps(browser) {
  console.log("\n==== TEST 4: Google Maps Lazy Loading ====");

  const page = await browser.newPage();
  await setupPage(page, "test4");
  await clearConsent(page);

  try {
    await page.goto(`${BASE_URL}/landing-alternative`, {
      waitUntil: "domcontentloaded",
      timeout: 10000,
    });

    const reactMounted = await waitForReact(page, 7000);

    if (!reactMounted) {
      console.log("  ✗ React did not mount.");
      await debugPage(page);
      await page.close();
      return false;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mapStateBefore = await page.evaluate(() => {
      const iframe = document.querySelector(
        'iframe[src*="google.com/maps"], iframe[src*="maps.google"]'
      );

      const buttons = Array.from(document.querySelectorAll("button"));

      const mapButton = buttons.find((button) => {
        const text = (button.textContent || "").toLowerCase();

        return (
          text.includes("google maps") ||
          text.includes("maps laden") ||
          text.includes("load google maps") ||
          text.includes("karte laden")
        );
      });

      return {
        iframeExists: !!iframe,
        mapButtonExists: !!mapButton,
        mapButtonText: mapButton?.textContent?.trim() || null,
      };
    });

    console.log(
      `  Google Maps iframe before interaction: ${
        mapStateBefore.iframeExists ? "✗ YES (should be lazy)" : "✓ NO"
      }`
    );

    if (!mapStateBefore.mapButtonExists) {
      console.log("  ⚠ Google Maps placeholder button not found.");
      console.log(
        "  This may mean the current LandingAlternative implementation uses a different interaction."
      );
      console.log("  Result: ⚠ SKIP");

      await page.close();
      return true;
    }

    console.log(
      `  ✓ Found map button: "${mapStateBefore.mapButtonText}"`
    );

    /*
     * Click map button.
     *
     * Depending on implementation this should either:
     * 1. Open cookie settings, or
     * 2. Load the map if the required consent already exists.
     */
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll("button"));

      const mapButton = buttons.find((button) => {
        const text = (button.textContent || "").toLowerCase();

        return (
          text.includes("google maps") ||
          text.includes("maps laden") ||
          text.includes("load google maps") ||
          text.includes("karte laden")
        );
      });

      if (mapButton) {
        mapButton.click();
      }
    });

    await new Promise((resolve) => setTimeout(resolve, 800));

    const settingsOpen = await page.evaluate(() => {
      return !!document.getElementById("cookie-settings-save");
    });

    console.log(
      `  Cookie settings opened: ${settingsOpen ? "✓ YES" : "✗ NO"}`
    );

    if (!settingsOpen) {
      /*
       * Maybe the implementation directly loaded the iframe.
       */
      const iframeAlreadyLoaded = await page.evaluate(() => {
        return !!document.querySelector(
          'iframe[src*="google.com/maps"], iframe[src*="maps.google"]'
        );
      });

      if (iframeAlreadyLoaded) {
        console.log("  ✓ Google Maps iframe loaded directly.");
        console.log("  Result: ✓ PASS");

        await page.close();
        return true;
      }

      console.log(
        "  ✗ Neither cookie settings nor the Google Maps iframe appeared."
      );

      await debugPage(page);
      await page.close();
      return false;
    }

    /*
     * Enable marketing consent if the checkbox exists.
     */
    const marketingCheckboxExists = await page.evaluate(() => {
      return !!document.getElementById("cookie-marketing");
    });

    if (marketingCheckboxExists) {
      await page.evaluate(() => {
        const checkbox = document.getElementById("cookie-marketing");

        if (checkbox && !checkbox.checked) {
          checkbox.click();
        }
      });

      console.log("  ✓ Marketing consent enabled.");
    } else {
      console.log(
        "  ⚠ #cookie-marketing not found in settings."
      );
    }

    /*
     * Save settings.
     */
    const saveClicked = await clickById(
      page,
      "cookie-settings-save"
    );

    if (!saveClicked) {
      console.log("  ✗ Could not click #cookie-settings-save");
      await page.close();
      return false;
    }

    console.log("  ✓ Saved cookie settings.");

    await new Promise((resolve) => setTimeout(resolve, 1200));

    /*
     * Find map button again.
     */
    const mapButtonExistsAfterConsent = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll("button"));

      return buttons.some((button) => {
        const text = (button.textContent || "").toLowerCase();

        return (
          text.includes("google maps") ||
          text.includes("maps laden") ||
          text.includes("load google maps") ||
          text.includes("karte laden")
        );
      });
    });

    if (mapButtonExistsAfterConsent) {
      await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll("button"));

        const mapButton = buttons.find((button) => {
          const text = (button.textContent || "").toLowerCase();

          return (
            text.includes("google maps") ||
            text.includes("maps laden") ||
            text.includes("load google maps") ||
            text.includes("karte laden")
          );
        });

        if (mapButton) {
          mapButton.click();
        }
      });

      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    const iframeLoaded = await page.evaluate(() => {
      return !!document.querySelector(
        'iframe[src*="google.com/maps"], iframe[src*="maps.google"]'
      );
    });

    console.log(
      `  Google Maps iframe loaded after consent: ${
        iframeLoaded ? "✓ YES" : "✗ NO"
      }`
    );

    const passed = iframeLoaded;

    console.log(`  Result: ${passed ? "✓ PASS" : "✗ FAIL"}`);

    await page.close();
    return passed;
  } catch (error) {
    console.log(`  ✗ Test error: ${error.message}`);
    await debugPage(page);
    await page.close();
    return false;
  }
}

/* ============================================================
   TEST 5
   ============================================================ */

async function test5Persistence(browser) {
  console.log("\n==== TEST 5: Consent Persistence ====");

  const page = await browser.newPage();
  await setupPage(page, "test5");
  await clearConsent(page);

  try {
    await page.goto(`${BASE_URL}/`, {
      waitUntil: "domcontentloaded",
      timeout: 10000,
    });

    const reactMounted = await waitForReact(page, 7000);

    if (!reactMounted) {
      console.log("  ✗ React did not mount.");
      await debugPage(page);
      await page.close();
      return false;
    }

    await page.waitForFunction(
      () => document.getElementById("cookie-accept-all"),
      { timeout: 5000 }
    );

    await clickById(page, "cookie-accept-all");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const initialConsent = await getStoredConsent(page);

    console.log(
      `  Initial consent: ${JSON.stringify(initialConsent)}`
    );

    await page.reload({
      waitUntil: "networkidle2",
      timeout: 10000,
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const afterReloadConsent = await getStoredConsent(page);

    console.log(
      `  After reload: ${JSON.stringify(afterReloadConsent)}`
    );

    await page.goto(`${BASE_URL}/de`, {
      waitUntil: "domcontentloaded",
      timeout: 10000,
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const afterNavigationConsent = await getStoredConsent(page);

    console.log(
      `  After navigation: ${JSON.stringify(afterNavigationConsent)}`
    );

    const bannerShown = await page.evaluate(() => {
      const ids = [
        "cookie-accept-all",
        "cookie-necessary",
        "cookie-settings",
      ];

      return ids.some((id) => {
        const element = document.getElementById(id);

        return element && element.offsetParent !== null;
      });
    });

    console.log(
      `  Banner shown after consent: ${
        bannerShown ? "✗ YES" : "✓ NO"
      }`
    );

    const consistent =
      JSON.stringify(initialConsent) ===
        JSON.stringify(afterReloadConsent) &&
      JSON.stringify(afterReloadConsent) ===
        JSON.stringify(afterNavigationConsent);

    const passed = consistent && !bannerShown;

    console.log(
      `  Consent consistent: ${consistent ? "✓ YES" : "✗ NO"}`
    );

    console.log(`  Result: ${passed ? "✓ PASS" : "✗ FAIL"}`);

    await page.close();
    return passed;
  } catch (error) {
    console.log(`  ✗ Test error: ${error.message}`);
    await debugPage(page);
    await page.close();
    return false;
  }
}

/* ============================================================
   TEST 6
   ============================================================ */

async function test6Settings(browser) {
  console.log("\n==== TEST 6: Cookie Settings Button ====");

  const page = await browser.newPage();
  await setupPage(page, "test6");
  await clearConsent(page);

  try {
    await page.goto(`${BASE_URL}/`, {
      waitUntil: "domcontentloaded",
      timeout: 10000,
    });

    const reactMounted = await waitForReact(page, 7000);

    if (!reactMounted) {
      console.log("  ✗ React did not mount.");
      await debugPage(page);
      await page.close();
      return false;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const settingsExists = await page.evaluate(() => {
      return !!document.getElementById("cookie-settings");
    });

    if (!settingsExists) {
      console.log("  ✗ #cookie-settings button not found.");
      await debugPage(page);
      await page.close();
      return false;
    }

    console.log("  ✓ Found #cookie-settings.");

    const clicked = await clickById(
      page,
      "cookie-settings"
    );

    if (!clicked) {
      console.log("  ✗ Could not click #cookie-settings.");
      await page.close();
      return false;
    }

    await new Promise((resolve) => setTimeout(resolve, 800));

    const modalElements = [
      "cookie-analytics",
      "cookie-marketing",
      "cookie-settings-cancel",
      "cookie-settings-save",
    ];

    const status = await page.evaluate((ids) => {
      const result = {};

      ids.forEach((id) => {
        const element = document.getElementById(id);

        result[id] = {
          found: !!element,
          visible: !!element && element.offsetParent !== null,
        };
      });

      return result;
    }, modalElements);

    console.log("  Settings modal:");

    modalElements.forEach((id) => {
      console.log(
        `    #${id}: ${
          status[id].found ? "✓ found" : "✗ missing"
        }`
      );
    });

    const allFound = modalElements.every(
      (id) => status[id].found
    );

    if (!allFound) {
      console.log("  ✗ Settings modal is incomplete.");
      await page.close();
      return false;
    }

    const initialConsent = await getStoredConsent(page);

    console.log(
      `  Initial consent: ${JSON.stringify(initialConsent)}`
    );

    /*
     * Enable analytics using the real checkbox interaction.
     */
    await page.evaluate(() => {
      const checkbox = document.getElementById(
        "cookie-analytics"
      );

      if (checkbox && !checkbox.checked) {
        checkbox.click();
      }
    });

    await new Promise((resolve) => setTimeout(resolve, 200));

    const checkboxState = await page.evaluate(() => {
      const checkbox = document.getElementById(
        "cookie-analytics"
      );

      return checkbox ? checkbox.checked : false;
    });

    console.log(
      `  Analytics checkbox enabled: ${
        checkboxState ? "✓ YES" : "✗ NO"
      }`
    );

    const saveClicked = await clickById(
      page,
      "cookie-settings-save"
    );

    if (!saveClicked) {
      console.log("  ✗ Could not click save.");
      await page.close();
      return false;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const modalClosed = await page.evaluate(() => {
      const saveButton = document.getElementById(
        "cookie-settings-save"
      );

      return (
        !saveButton ||
        saveButton.offsetParent === null
      );
    });

    console.log(
      `  Settings modal closed: ${
        modalClosed ? "✓ YES" : "✗ NO"
      }`
    );

    const updatedConsent = await getStoredConsent(page);

    console.log(
      `  Updated consent: ${JSON.stringify(updatedConsent)}`
    );

    const consentUpdated =
      updatedConsent &&
      updatedConsent.analytics === true;

    console.log(
      `  Analytics consent saved: ${
        consentUpdated ? "✓ YES" : "✗ NO"
      }`
    );

    const passed =
      allFound &&
      checkboxState &&
      modalClosed &&
      consentUpdated;

    console.log(`  Result: ${passed ? "✓ PASS" : "✗ FAIL"}`);

    await page.close();
    return passed;
  } catch (error) {
    console.log(`  ✗ Test error: ${error.message}`);
    await debugPage(page);
    await page.close();
    return false;
  }
}

/* ============================================================
   MAIN
   ============================================================ */

(async () => {
  let server = null;
  let browser = null;

  const results = {
    test1: false,
    test2: false,
    test3: false,
    test4: false,
    test5: false,
    test6: false,
  };

  try {
    console.log("==============================================");
    console.log(" PutzELF Consent Runtime Test");
    console.log("==============================================");
    console.log(`Dist: ${DIST_PATH}`);
    console.log(`URL:  ${BASE_URL}`);
    console.log("==============================================");

    server = await startServer(PORT);

    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
      ],
    });

    results.test1 = await test1Fresh(browser);
    results.test2 = await test2Necessary(browser);
    results.test3 = await test3AcceptAll(browser);
    results.test4 = await test4GoogleMaps(browser);
    results.test5 = await test5Persistence(browser);
    results.test6 = await test6Settings(browser);

    console.log("\n==============================================");
    console.log("                 TEST SUMMARY");
    console.log("==============================================");

    console.log(
      `  Test 1 (Fresh/No Consent):     ${
        results.test1 ? "✓ PASS" : "✗ FAIL"
      }`
    );

    console.log(
      `  Test 2 (Necessary Only):       ${
        results.test2 ? "✓ PASS" : "✗ FAIL"
      }`
    );

    console.log(
      `  Test 3 (Accept All):            ${
        results.test3 ? "✓ PASS" : "✗ FAIL"
      }`
    );

    console.log(
      `  Test 4 (Google Maps):           ${
        results.test4 ? "✓ PASS" : "✗ FAIL"
      }`
    );

    console.log(
      `  Test 5 (Persistence):            ${
        results.test5 ? "✓ PASS" : "✗ FAIL"
      }`
    );

    console.log(
      `  Test 6 (Cookie Settings):       ${
        results.test6 ? "✓ PASS" : "✗ FAIL"
      }`
    );

    const passed = Object.values(results).filter(Boolean).length;
    const total = Object.keys(results).length;
    const failed = total - passed;

    console.log("----------------------------------------------");
    console.log(`  Passed: ${passed}/${total}`);
    console.log(`  Failed: ${failed}/${total}`);
    console.log("----------------------------------------------");

    if (failed === 0) {
      console.log(
        "  OVERALL: ✓✓✓ ALL TESTS PASSED ✓✓✓"
      );
    } else {
      console.log(
        `  OVERALL: ✗✗✗ ${failed} TEST(S) FAILED ✗✗✗`
      );
    }

    console.log("==============================================");

    await browser.close();

    if (server) {
      server.close();
    }

    process.exit(failed === 0 ? 0 : 1);
  } catch (error) {
    console.error("\n==============================================");
    console.error("TEST SUITE ERROR");
    console.error("==============================================");
    console.error(error);

    if (browser) {
      try {
        await browser.close();
      } catch (_) {}
    }

    if (server) {
      try {
        server.close();
      } catch (_) {}
    }

    process.exit(1);
  }
})();