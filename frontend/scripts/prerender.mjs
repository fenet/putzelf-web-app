#!/usr/bin/env node
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";
import { loadEnv } from "vite";
import { blogPostSlugs, locales, routeRegistry } from "../src/data/routeRegistry.mjs";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..");
const DIST = path.resolve(process.env.PRERENDER_DIST || path.join(ROOT, "dist"));
const env = loadEnv("production", ROOT, "");
const SITE_URL = String(
  process.env.SITE_URL || process.env.VITE_SITE_URL || process.env.PUBLIC_SITE_URL ||
  env.SITE_URL || env.VITE_SITE_URL || env.PUBLIC_SITE_URL || "https://putzelf.com"
).trim().replace(/\/+$/, "");

const routeDefinitions = Object.entries(routeRegistry)
  .filter(([, definition]) => definition.prerender)
  .map(([key, definition]) => ({ key, ...definition }));

function buildRouteList() {
  const routes = [];
  for (const locale of locales) {
    for (const definition of routeDefinitions) {
      if (definition.key === "blogPost") continue;
      const localPath = definition[locale];
      routes.push({
        key: definition.key,
        locale,
        noindex: Boolean(definition.noindex),
        status: definition.status || 200,
        path: `/${locale}${localPath === "/" ? "/" : localPath}`,
      });
    }
    for (const slug of blogPostSlugs) {
      routes.push({ key: "blogPost", locale, slug, noindex: false, status: 200, path: `/${locale}/blog/${slug}` });
    }
  }
  return routes;
}

function validateSitemapCoverage(routes) {
  const sitemapPath = path.join(ROOT, "public", "sitemap.xml");
  if (!fs.existsSync(sitemapPath)) throw new Error("public/sitemap.xml is missing; run generate:seo before prerendering");
  const sitemap = fs.readFileSync(sitemapPath, "utf8");
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, value]) => value.trim());
  const sitemapPaths = sitemapUrls.map((value) => {
    const url = new URL(value);
    if (url.origin !== new URL(SITE_URL).origin) {
      throw new Error(`Sitemap URL must use the configured canonical origin: ${value}`);
    }
    return url.pathname;
  });
  if (!sitemapPaths.length) throw new Error("public/sitemap.xml contains no URLs");

  const duplicates = sitemapPaths.filter((routePath, index) => sitemapPaths.indexOf(routePath) !== index);
  if (duplicates.length) throw new Error(`Sitemap contains duplicate routes: ${[...new Set(duplicates)].join(", ")}`);

  const routesByPath = new Map(routes.map((route) => [route.path, route]));
  const intendedRoutes = routes.filter((route) => Boolean(routeRegistry[route.key]?.sitemap));
  const intendedPaths = new Set(intendedRoutes.map((route) => route.path));
  const sitemapPathSet = new Set(sitemapPaths);
  const missingPaths = [...intendedPaths].filter((routePath) => !sitemapPathSet.has(routePath));
  const unexpectedPaths = sitemapPaths.filter((routePath) => !intendedPaths.has(routePath));
  if (missingPaths.length || unexpectedPaths.length) {
    throw new Error([
      missingPaths.length ? `missing intended routes: ${missingPaths.join(", ")}` : "",
      unexpectedPaths.length ? `unexpected routes: ${unexpectedPaths.join(", ")}` : "",
    ].filter(Boolean).join("; "));
  }

  for (const routePath of sitemapPaths) {
    const route = routesByPath.get(routePath);
    if (!route) throw new Error(`Sitemap route has no prerender snapshot: ${routePath}`);
    if (route.status !== 200 || route.noindex || !routeRegistry[route.key]?.sitemap) {
      throw new Error(`Sitemap route must return 200 and be indexable: ${routePath}`);
    }
  }

  if (/<lastmod>\s*\d{4}-\d{2}-\d{2}\s*<\/lastmod>/i.test(sitemap)) {
    throw new Error("Do not generate lastmod from build dates; include it only when a content-change date is tracked");
  }
  return sitemapPaths;
}

function validateRobotsRules(sitemapPaths, routes) {
  const robotsPath = path.join(ROOT, "public", "robots.txt");
  if (!fs.existsSync(robotsPath)) throw new Error("public/robots.txt is missing");
  const robotsTxt = fs.readFileSync(robotsPath, "utf8");
  const disallowRules = [...robotsTxt.matchAll(/^\s*Disallow:\s*(\S*)\s*$/gim)]
    .map(([, rule]) => rule);
  const noindexPaths = [
    ...routes.filter((route) => route.noindex).map((route) => route.path),
    // Legacy entry points must remain crawlable so Google can follow their redirects.
    "/book",
    "/login",
    "/profile",
    ...locales.flatMap((locale) => [
      `/${locale}/booking`,
      `/${locale}/profile`,
      `/${locale}/admin`,
      `/${locale}/order/seo05-check`,
    ]),
  ];
  const routePathsToKeepFetchable = [...new Set([...sitemapPaths, ...noindexPaths])];
  const blockedPaths = routePathsToKeepFetchable.filter((routePath) =>
    disallowRules.some((rule) => rule && routePath.startsWith(rule))
  );
  if (blockedPaths.length) {
    throw new Error(`robots.txt blocks indexable or noindex routes that must remain fetchable: ${blockedPaths.join(", ")}`);
  }
  return robotsTxt;
}

function validateNoindexServerHeaders() {
  const apacheConfigPath = path.join(ROOT, "public", ".htaccess");
  if (!fs.existsSync(apacheConfigPath)) throw new Error("public/.htaccess is missing");
  const apacheConfig = fs.readFileSync(apacheConfigPath, "utf8");
  const matcher = apacheConfig.match(/SetEnvIfNoCase\s+Request_URI\s+"([^"]+)"\s+PutzELFNoIndex=1/i)?.[1];
  if (!matcher) throw new Error(".htaccess must mark localized private routes for noindex response headers");
  const routeMatcher = new RegExp(matcher, "i");
  const noindexPaths = locales.flatMap((locale) => [
    `/${locale}/booking`,
    `/${locale}/profile`,
    `/${locale}/calculator`,
    `/${locale}/login`,
    `/${locale}/register`,
    `/${locale}/admin`,
    `/${locale}/order/seo05-check`,
  ]);
  const uncoveredPaths = noindexPaths.filter((routePath) => !routeMatcher.test(routePath));
  if (uncoveredPaths.length) {
    throw new Error(`.htaccess does not mark noindex routes for X-Robots-Tag: ${uncoveredPaths.join(", ")}`);
  }

  for (const environmentName of ["PutzELFNoIndex", "REDIRECT_PutzELFNoIndex"]) {
    const directive = new RegExp(`Header\\s+always\\s+set\\s+X-Robots-Tag\\s+"noindex, nofollow"\\s+env=${environmentName}`, "i");
    if (!directive.test(apacheConfig)) {
      throw new Error(`.htaccess is missing the X-Robots-Tag directive for ${environmentName}`);
    }
  }
}

const retiredLegacyFilePaths = [
  "/files/Contract.pdf",
  "/files/Datenschutzbestimmungen.pdf",
  "/files/Datenschutzblat.pdf",
  "/files/Dienstleistungsvertrag.pdf",
  "/files/Dienstliste.pdf",
  "/files/Partnerantrag.pdf",
  "/files/Pricelist.pdf",
  "/files/Stammdatenblatt.pdf",
  "/files/Subvertrag.pdf",
  "/files/Urlaubsschein_Zeitausgleich.pdf",
];

function validateLegacyServerRules() {
  const apacheConfig = fs.readFileSync(path.join(ROOT, "public", ".htaccess"), "utf8");
  const apacheLines = apacheConfig.split(/\r?\n/);
  const retiredPdfRule = apacheConfig.split(/\r?\n/).find((line) =>
    line.includes("RewriteRule ^files/") && line.includes("[G,NC,L]")
  );
  if (!retiredPdfRule || retiredLegacyFilePaths.some((filePath) => !retiredPdfRule.includes(path.basename(filePath, ".pdf")))) {
    throw new Error(".htaccess must return HTTP 410 for every retired legacy PDF URL");
  }
  const reviewHostConditionIndex = apacheLines.findIndex((line) =>
    line.includes("RewriteCond %{HTTP_HOST} ^review\\.putzelf\\.com(?::\\d+)?$ [NC]")
  );
  if (reviewHostConditionIndex < 0
    || !apacheLines.slice(reviewHostConditionIndex, reviewHostConditionIndex + 3).some((line) => line === "RewriteRule ^ - [G,L]")) {
    throw new Error(".htaccess must retire review.putzelf.com with HTTP 410");
  }

  if (apacheConfig.includes("(?:review|www)\\.putzelf\\.com")
    || !apacheConfig.includes("RewriteCond %{HTTP_HOST} ^www\\.putzelf\\.com(?::\\d+)?$ [NC,OR]")
    || !apacheConfig.includes("RewriteCond %{HTTPS} !=on")
    || !apacheConfig.includes("RewriteRule ^ https://putzelf.com%{REQUEST_URI} [R=301,L,NE]")) {
    throw new Error(".htaccess must send www and HTTP requests to the canonical HTTPS host, without treating review as an alias");
  }

  for (const expectedRule of [
    "RewriteRule ^$ https://putzelf.com/de/ [R=301,L]",
    "RewriteRule ^de/services/(?:wien|graz)/?$ https://putzelf.com/de/services [R=301,L,NC]",
    "RewriteRule ^de/(?:wien|graz)/services/?$ https://putzelf.com/de/services [R=301,L,NC]",
    "RewriteRule ^en/(?:vienna|graz)/services/?$ https://putzelf.com/en/services [R=301,L,NC]",
    "RewriteRule ^landing-alt/?$ https://putzelf.com/de/ [R=301,L]",
    "RewriteRule ^(de|en)/landing-alt/?$ https://putzelf.com/$1/ [R=301,L]",
    "RewriteRule ^(de|en)/profile/?$ https://putzelf.com/$1/booking [R=301,L]",
    "RewriteRule ^(de|en)/booking/?$ https://putzelf.com/$1/booking [R=301,L]",
    "RewriteRule ^(de|en)/admin/?$ /$1/admin/index.html [END]",
    "RewriteRule ^(de|en)/order/[^/]+/?$ /_private-routes/order-$1.html [END]",
    "RewriteCond %{REQUEST_URI} ^/(?:de|en)/booking/+$ [NC]",
    "RewriteRule ^((?:de|en)/booking)/+$ /$1 [R=301,L,NE]",
    "RewriteRule ^imprint/?$ https://putzelf.com/de/impressum [R=301,L]",
    "RewriteRule ^calculator/?$ https://putzelf.com/de/calculator [R=301,L]",
    "RewriteRule ^login/?$ https://putzelf.com/de/login [R=301,L]",
    "RewriteRule ^book/?$ https://putzelf.com/de/booking [R=301,L]",
    "RewriteRule ^profile/?$ https://putzelf.com/de/booking [R=301,L]",
  ]) {
    if (!apacheLines.includes(expectedRule)) {
      throw new Error(`.htaccess is missing a direct canonical redirect: ${expectedRule}`);
    }
  }
}

function validateMetadataShellOwnership() {
  const shellPath = path.join(ROOT, "index.html");
  if (!fs.existsSync(shellPath)) throw new Error(`${shellPath} is missing`);
  const shell = fs.readFileSync(shellPath, "utf8");
  if (/<title\b/i.test(shell)) throw new Error("index.html must not define a title; Seo owns route metadata");
  if (/<meta\b[^>]*name=["']description["']/i.test(shell)) {
    throw new Error("index.html must not define a description; Seo owns route metadata");
  }
}

function contentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  return {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
  }[extension] || "application/octet-stream";
}

function resolveRequestPath(requestUrl) {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(requestUrl, "http://localhost").pathname);
  } catch {
    pathname = "/";
  }

  const normalized = path.normalize(pathname).replace(/^[/\\]+/, "");
  const candidate = path.resolve(DIST, normalized);
  if (candidate !== DIST && !candidate.startsWith(`${DIST}${path.sep}`)) return null;
  return candidate;
}

const permanentRedirects = [
  ["/", "/de/"],
  ["/landing-alt", "/de/"],
  ["/services", "/de/services"],
  ["/de/services/wien", "/de/services"],
  ["/de/services/graz", "/de/services"],
  ["/de/wien/services", "/de/services"],
  ["/de/graz/services", "/de/services"],
  ["/en/vienna/services", "/en/services"],
  ["/en/graz/services", "/en/services"],
  ["/contact", "/de/kontakt"],
  ["/kontakt", "/de/kontakt"],
  ["/job-opening", "/de/karriere"],
  ["/get-partners", "/de/partner-werden"],
  ["/privacy", "/de/datenschutz"],
  ["/datenschutz", "/de/datenschutz"],
  ["/imprint", "/de/impressum"],
  ["/book", "/de/booking"],
  ["/profile", "/de/booking"],
  ["/calculator", "/de/calculator"],
  ["/blog", "/de/blog"],
  ["/login", "/de/login"],
  ["/register", "/de/register"],
  ["/admin", "/de/admin"],
];
const retiredLegacyFilePathSet = new Set(retiredLegacyFilePaths.map((filePath) => filePath.toLowerCase()));

function cleanServerPath(pathname) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

function getPermanentRedirect(pathname) {
  const cleanPath = cleanServerPath(pathname);
  const exact = permanentRedirects.find(([from]) => from === cleanPath);
  if (exact) return exact[1];
  if (cleanPath === "/de/landing-alt") return "/de/";
  if (cleanPath === "/en/landing-alt") return "/en/";
  const blogPost = cleanPath.match(/^\/blog\/(.+)$/);
  if (blogPost) return `/de/blog/${blogPost[1]}`;
  const order = cleanPath.match(/^\/order\/([^/]+)$/);
  if (order) return `/de/order/${order[1]}`;
  if (cleanPath === "/de/profile") return "/de/booking";
  if (cleanPath === "/en/profile") return "/en/booking";
  return null;
}

function startStaticServer(routes) {
  return new Promise((resolve, reject) => {
    const shellPath = path.join(DIST, "index.html");
    if (!fs.existsSync(shellPath)) return reject(new Error(`${shellPath} is missing; build the frontend first`));
    const routeByPath = new Map(routes.map((route) => [cleanServerPath(route.path), route]));
    const errorDocumentPath = path.join(DIST, "de", "404", "index.html");
    const englishErrorDocumentPath = path.join(DIST, "en", "404", "index.html");

    const server = http.createServer((request, response) => {
      const url = new URL(request.url || "/", "http://localhost");
      const pathname = url.pathname;
      const normalizedPath = cleanServerPath(pathname);
      if (retiredLegacyFilePathSet.has(normalizedPath.toLowerCase())) {
        response.writeHead(410, { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" });
        response.end("Gone");
        return;
      }
      const requestHost = String(request.headers["x-forwarded-host"] || request.headers.host || "").split(":")[0].toLowerCase();
      const requestProtocol = String(request.headers["x-forwarded-proto"] || "https").toLowerCase();
      if (requestHost === "review.putzelf.com") {
        response.writeHead(410, { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" });
        response.end("Gone");
        return;
      }
      const isNoncanonicalOrigin = requestHost === "www.putzelf.com" || requestProtocol !== "https";
      const directAliasTargets = {
        "/": "/de/",
        "/landing-alt": "/de/",
        "/de/landing-alt": "/de/",
        "/en/landing-alt": "/en/",
        "/de/services/wien": "/de/services",
        "/de/services/graz": "/de/services",
        "/de/wien/services": "/de/services",
        "/de/graz/services": "/de/services",
        "/en/vienna/services": "/en/services",
        "/en/graz/services": "/en/services",
        "/imprint": "/de/impressum",
        "/calculator": "/de/calculator",
        "/login": "/de/login",
        "/book": "/de/booking",
        "/profile": "/de/booking",
        "/de/profile": "/de/booking",
        "/en/profile": "/en/booking",
        "/de/booking": "/de/booking",
        "/en/booking": "/en/booking",
      };
      if (isNoncanonicalOrigin) {
        const targetPath = directAliasTargets[normalizedPath] || pathname;
        response.writeHead(301, { Location: `https://putzelf.com${targetPath}${url.search}`, "Cache-Control": "no-cache" });
        response.end();
        return;
      }
      if (/^\/(?:de|en)\/(?:booking|profile|calculator|login|register|admin|order)(?:\/|$)/i.test(normalizedPath)) {
        response.setHeader("X-Robots-Tag", "noindex, nofollow");
      }
      const redirectTarget = getPermanentRedirect(pathname);
      if (redirectTarget) {
        response.writeHead(301, { Location: `${redirectTarget}${url.search}`, "Cache-Control": "no-cache" });
        response.end();
        return;
      }

      if (/^\/(?:de|en)\/booking\/$/.test(pathname)) {
        response.writeHead(301, { Location: `${normalizedPath}${url.search}`, "Cache-Control": "no-cache" });
        response.end();
        return;
      }

      const isGone = /^\/de\/services\/(?:wien|graz)$/i.test(normalizedPath);
      const route = routeByPath.get(normalizedPath);
      const isNotFoundRoute = route?.status === 404 || /^\/(?:de|en)\/404$/.test(normalizedPath);
      const dynamicOrder = normalizedPath.match(/^\/(de|en)\/order\/[^/]+$/);
      if (isGone || isNotFoundRoute) {
        const localizedErrorPath = route ? normalizeOutputPath(route.path) : null;
        const filePath = isNotFoundRoute && localizedErrorPath && fs.existsSync(localizedErrorPath)
          ? localizedErrorPath
          : isNotFoundRoute && normalizedPath.startsWith("/en/") && fs.existsSync(englishErrorDocumentPath)
            ? englishErrorDocumentPath
            : fs.existsSync(errorDocumentPath) ? errorDocumentPath : shellPath;
        response.writeHead(isGone ? 410 : 404, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-cache" });
        fs.createReadStream(filePath).pipe(response);
        return;
      }

      if (pathname.endsWith("/") && !/^\/(?:de|en)\/$/.test(pathname) && !dynamicOrder) {
        const directoryPath = resolveRequestPath(request.url || "/");
        if (directoryPath && fs.existsSync(directoryPath) && fs.statSync(directoryPath).isDirectory()) {
          response.writeHead(301, { Location: normalizedPath, "Cache-Control": "no-cache" });
          response.end();
          return;
        }
      }

      const requestPath = dynamicOrder
        ? path.join(DIST, "_private-routes", `order-${dynamicOrder[1]}.html`)
        : resolveRequestPath(request.url || "/");
      if (!requestPath) {
        response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Forbidden");
        return;
      }

      let filePath = requestPath;
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, "index.html");
      }

      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        response.writeHead(200, { "Content-Type": contentType(filePath), "Cache-Control": "no-cache" });
        fs.createReadStream(filePath).pipe(response);
        return;
      }

      if (route) {
        response.writeHead(route.status, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-cache" });
        fs.createReadStream(shellPath).pipe(response);
        return;
      }

      if (path.extname(pathname)) {
        response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Not found");
        return;
      }

      const errorPath = pathname.startsWith("/en/") && fs.existsSync(englishErrorDocumentPath)
        ? englishErrorDocumentPath
        : fs.existsSync(errorDocumentPath) ? errorDocumentPath : shellPath;
      response.writeHead(404, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-cache" });
      fs.createReadStream(errorPath).pipe(response);
    });

    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      resolve({ server, port: server.address().port });
    });
  });
}

function normalizeOutputPath(routePath) {
  const relativePath = routePath.replace(/^\//, "");
  return path.join(DIST, relativePath, "index.html");
}

function extractAnchorHrefs(html) {
  return [...html.matchAll(/<a\b[^>]*>/gi)]
    .map(([anchor]) => anchor.match(/\bhref\s*=\s*["']([^"']+)["']/i)?.[1])
    .filter(Boolean);
}

function readPrerenderedHtml(routePath) {
  const htmlPath = normalizeOutputPath(routePath);
  if (!fs.existsSync(htmlPath)) throw new Error(`${routePath} - prerendered HTML is missing`);
  return fs.readFileSync(htmlPath, "utf8");
}

function validateStructuredData(documents, route, canonical) {
  const fail = (reason) => { throw new Error(`${route.path} - ${reason}`); };
  if (!documents.length || documents.some((document) => !document || typeof document !== "object")) {
    fail(`expected valid JSON-LD data in the document, received ${documents.length} scripts`);
  }

  const roots = documents.filter((document) => document["@context"] === "https://schema.org" && Array.isArray(document["@graph"]));
  if (!roots.length) fail("expected a server-rendered schema.org @graph");
  const nodes = documents.flatMap((document) => Array.isArray(document["@graph"]) ? document["@graph"] : [document]);
  const findByType = (type) => nodes.find((node) => {
    const types = Array.isArray(node?.["@type"]) ? node["@type"] : [node?.["@type"]];
    return types.includes(type);
  });
  const organization = findByType("Organization");
  const localBusiness = findByType("LocalBusiness");
  const webSite = findByType("WebSite");
  const webPage = findByType("WebPage");
  const logo = findByType("ImageObject");
  const expectedIds = {
    organization: `${SITE_URL}/#organization`,
    localBusiness: `${SITE_URL}/#localbusiness`,
    webSite: `${SITE_URL}/#website`,
    logo: `${SITE_URL}/#logo`,
  };

  for (const id of Object.values(expectedIds)) {
    if (nodes.filter((node) => node?.["@id"] === id).length !== 1) fail(`expected one stable entity with @id ${id}`);
  }
  if (!organization || organization["@id"] !== expectedIds.organization || organization.name !== "PutzELF") {
    fail("missing stable PutzELF Organization entity");
  }
  if (!localBusiness || localBusiness["@id"] !== expectedIds.localBusiness || localBusiness.name !== "PutzELF") {
    fail("missing stable PutzELF LocalBusiness entity");
  }
  if (!webSite || webSite["@id"] !== expectedIds.webSite || webSite.name !== "PutzELF" || webSite.url !== `${SITE_URL}/de/`) {
    fail("WebSite must have stable identity, PutzELF name, and the German homepage URL");
  }
  if (!webPage || webPage["@id"] !== `${canonical}#webpage` || webPage.url !== canonical) {
    fail("missing route-specific WebPage entity with the canonical URL");
  }
  if (!logo || logo["@id"] !== expectedIds.logo || logo.url !== `${SITE_URL}/logo.png`) {
    fail("logo ImageObject must reference the approved, non-empty /logo.png asset");
  }
  if (organization.logo?.["@id"] !== expectedIds.logo || localBusiness.image?.["@id"] !== expectedIds.logo) {
    fail("Organization and LocalBusiness must reference the shared logo entity");
  }
  if (!localBusiness.address || localBusiness.address["@type"] !== "PostalAddress"
    || !localBusiness.address.streetAddress || !localBusiness.address.postalCode
    || !localBusiness.address.addressLocality || localBusiness.address.addressCountry !== "AT") {
    fail("LocalBusiness must provide a structured Austrian PostalAddress");
  }
  const servedAreas = Array.isArray(localBusiness.areaServed) ? localBusiness.areaServed.join(" ") : String(localBusiness.areaServed || "");
  if (!/Wien|Vienna/i.test(servedAreas) || !/Graz/i.test(servedAreas) || !/Umgebung|surrounding areas/i.test(servedAreas)) {
    fail("LocalBusiness areaServed must identify Vienna and Graz and their surrounding areas");
  }
  const emails = Array.isArray(localBusiness.email) ? localBusiness.email : [localBusiness.email];
  if (!localBusiness.telephone || !emails.includes("office@putzelf.com") || !emails.includes("office.stmk@putzelf.com")) {
    fail("LocalBusiness must include the confirmed phone and both office email addresses");
  }
  if ((organization.sameAs || []).some((profile) => /linkedin\.com/i.test(profile))) {
    fail("Organization.sameAs must not contain the former personal LinkedIn profile");
  }
  if (nodes.some((node) => {
    const types = Array.isArray(node?.["@type"]) ? node["@type"] : [node?.["@type"]];
    return types.includes("CleaningService");
  })) fail("CleaningService is not a valid schema type; use LocalBusiness");

  const hasBreadcrumb = nodes.some((node) => node["@type"] === "BreadcrumbList");
  if (route.key.startsWith("private") || route.key.startsWith("business")) {
    const service = findByType("Service");
    if (!service || service["@id"] !== `${canonical}#service` || service.provider?.["@id"] !== expectedIds.localBusiness) {
      fail("service detail page must expose a Service entity provided by the stable LocalBusiness entity");
    }
    if (webPage.mainEntity?.["@id"] !== service["@id"] || !hasBreadcrumb) {
      fail("service detail page must connect its Service and BreadcrumbList to the WebPage");
    }
  }

  if (route.key === "blogPost") {
    const blogPosting = findByType("BlogPosting");
    if (!blogPosting || blogPosting["@id"] !== `${canonical}#blogposting`
      || blogPosting.mainEntityOfPage?.["@id"] !== `${canonical}#webpage`
      || blogPosting.publisher?.["@id"] !== expectedIds.organization
      || !blogPosting.headline || !blogPosting.datePublished || !blogPosting.image) {
      fail("blog article must expose a complete BlogPosting connected to its WebPage and publisher");
    }
    if (webPage.mainEntity?.["@id"] !== blogPosting["@id"] || !hasBreadcrumb) {
      fail("blog article must connect its BlogPosting and BreadcrumbList to the WebPage");
    }
  }
}

function verifyCrawlableLinkGraph() {
  const serviceEntries = Object.entries(routeRegistry)
    .filter(([key]) => key.startsWith("private") || key.startsWith("business"));
  const cardServiceEntries = serviceEntries.filter(([key]) => key.startsWith("business"));
  const legalFilePaths = [
    "/files/04_AGB_PutzELF.docx",
    "/files/06_FAGG_Ruecktrittsbelehrung_PutzELF.docx",
  ];

  for (const locale of locales) {
    const homePath = `/${locale}/`;
    const homeHrefs = extractAnchorHrefs(readPrerenderedHtml(homePath));
    const requiredHomePaths = [
      `/${locale}${routeRegistry.servicesOverview[locale]}`,
      `/${locale}${routeRegistry.contact[locale]}`,
      `/${locale}${routeRegistry.jobOpening[locale]}`,
      `/${locale}${routeRegistry.getPartners[locale]}`,
      `/${locale}${routeRegistry.blog[locale]}`,
      `/${locale}${routeRegistry.privacy[locale]}`,
      `/${locale}${routeRegistry.imprint[locale]}`,
      ...legalFilePaths,
      ...serviceEntries.map(([, definition]) => `/${locale}${definition[locale]}`),
    ];
    const missingHomePaths = requiredHomePaths.filter((routePath) => !homeHrefs.includes(routePath));
    if (missingHomePaths.length) {
      throw new Error(`${homePath} - initial HTML is missing crawlable links: ${missingHomePaths.join(", ")}`);
    }

    for (const [key, definition] of cardServiceEntries) {
      const cardPath = `/${locale}${definition[locale]}`;
      if (homeHrefs.filter((href) => href === cardPath).length < 2) {
        throw new Error(`${homePath} - service card ${key} must link to ${cardPath} in addition to the footer link`);
      }
    }

    const blogHubPath = `/${locale}${routeRegistry.blog[locale]}`;
    const blogHrefs = extractAnchorHrefs(readPrerenderedHtml(blogHubPath));
    for (const slug of blogPostSlugs) {
      const postPath = `/${locale}/blog/${slug}`;
      if (!blogHrefs.includes(postPath)) {
        throw new Error(`${blogHubPath} - initial HTML is missing blog post link ${postPath}`);
      }
    }

    for (const [key, definition] of serviceEntries) {
      const servicePath = `/${locale}${definition[locale]}`;
      const serviceHtml = readPrerenderedHtml(servicePath);
      const serviceHrefs = extractAnchorHrefs(serviceHtml);
      const hasBreadcrumb = /<nav\b[^>]*aria-label="(?:Brotkrümelnavigation|Breadcrumb)"[\s\S]*?<\/nav>/i.test(serviceHtml)
        && serviceHrefs.includes(homePath)
        && serviceHrefs.includes(`/${locale}${routeRegistry.servicesOverview[locale]}`);
      if (!hasBreadcrumb) throw new Error(`${servicePath} - initial HTML is missing linked home/services breadcrumbs`);

      const relatedSection = serviceHtml.match(/<h2\b[^>]*>(?:Weitere Services|Related services)<\/h2>([\s\S]*?)<\/section>/i)?.[1] || "";
      if (!extractAnchorHrefs(relatedSection).some((href) => href.startsWith(`/${locale}/services/`))) {
        throw new Error(`${servicePath} - initial HTML is missing related-service links`);
      }
    }

    for (const slug of blogPostSlugs) {
      const postPath = `/${locale}/blog/${slug}`;
      const postHtml = readPrerenderedHtml(postPath);
      const relatedSection = postHtml.match(/<nav\b[^>]*aria-label="(?:Passende Services|Related services)"[\s\S]*?<\/nav>/i)?.[0] || "";
      if (!extractAnchorHrefs(relatedSection).some((href) => href.startsWith(`/${locale}/services/`))) {
        throw new Error(`${postPath} - initial HTML is missing related-service links`);
      }

      if (locale === "en") {
        const englishCopyBySlug = {
          "so-pflegen-sie-buero-und-arbeitsraeume-effektiv": ["How to Maintain Offices and Workspaces Effectively", "Regular cleaning creates a pleasant atmosphere", "Regelmäßige Reinigung schafft"],
          "gruenere-arbeitsplaetze-dank-gesunder-reinigungsroutine": ["Healthier Cleaning Routines for Greener Workplaces", "Many businesses underestimate", "Viele Unternehmen unterschätzen"],
          "fensterreinigung-fuer-mehr-licht-und-wohlfuehlen": ["Window Cleaning for Brighter, More Comfortable Spaces", "Glass surfaces often collect marks", "Glasflächen sind im Alltag"],
        };
        const [expectedTitle, expectedEnglishText, germanText] = englishCopyBySlug[slug] || [];
        if (!expectedTitle || !postHtml.includes(expectedTitle) || !postHtml.includes(expectedEnglishText) || postHtml.includes(germanText)) {
          throw new Error(`${postPath} - expected localized English title and article text, without the German article copy`);
        }
      }
    }
  }
}

function localizedPathFor(route, locale) {
  if (route.key === "blogPost") return `/${locale}/blog/${route.slug}`;
  const definition = routeDefinitions.find((entry) => entry.key === route.key);
  if (!definition) throw new Error(`Missing route definition for ${route.key}`);
  const localPath = definition[locale];
  return `/${locale}${localPath === "/" ? "/" : localPath}`;
}

function addPrerenderMarker(html) {
  if (/name=["']prerender-owner["']/i.test(html)) return html;
  return html.replace(/(<head\b[^>]*>)/i, "$1\n    <meta name=\"prerender-owner\" content=\"putzelf\">");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function createPrivateRouteShell({ locale, title, description, canonical, heading }) {
  const shellPath = path.join(DIST, "index.html");
  let html = fs.readFileSync(shellPath, "utf8");
  const headTags = [
    `<title data-rh="true">${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" data-rh="true">`,
    `<link rel="canonical" href="${escapeHtml(canonical)}" data-rh="true">`,
    `<meta name="robots" content="noindex, nofollow" data-rh="true">`,
  ].join("\n    ");
  html = html.replace(/<html\b[^>]*>/i, `<html lang="${locale}">`);
  html = html.replace(/<\/head>/i, `    ${headTags}\n  </head>`);
  html = html.replace(
    /<div\s+id=["']root["']\s*>\s*<\/div>/i,
    `<div id="root"><main class="mx-auto max-w-3xl px-6 py-12 text-center"><h1 class="text-3xl font-bold">${escapeHtml(heading)}</h1></main></div>`
  );
  return addPrerenderMarker(html);
}

async function writePrivateRouteShells() {
  const adminCopy = {
    de: { title: "Admin-Bereich | PutzELF", description: "Administrationsbereich von PutzELF.", heading: "Blog-Administration" },
    en: { title: "Admin area | PutzELF", description: "PutzELF administration area.", heading: "Blog administration" },
  };
  const orderCopy = {
    de: { title: "Buchung | PutzELF", description: "Details zu Ihrer Buchung bei PutzELF.", heading: "Buchungsdetails werden geladen" },
    en: { title: "Booking | PutzELF", description: "Review your booking details with PutzELF.", heading: "Loading booking details" },
  };

  for (const locale of locales) {
    const admin = adminCopy[locale];
    const adminPath = path.join(DIST, locale, "admin", "index.html");
    await fs.promises.mkdir(path.dirname(adminPath), { recursive: true });
    await fs.promises.writeFile(adminPath, createPrivateRouteShell({
      locale,
      ...admin,
      canonical: `${SITE_URL}/${locale}/admin`,
    }), "utf8");

    const order = orderCopy[locale];
    const privateShellDir = path.join(DIST, "_private-routes");
    await fs.promises.mkdir(privateShellDir, { recursive: true });
    await fs.promises.writeFile(path.join(privateShellDir, `order-${locale}.html`), createPrivateRouteShell({
      locale,
      ...order,
      // An empty href resolves to the requested order URL, including its dynamic id.
      canonical: "",
    }), "utf8");
  }
}

async function inspectRenderedPage(page, route) {
  const expectedCanonical = `${SITE_URL}${route.path}`;
  const expectedEnglish = localizedPathFor(route, "en");
  const expectedGerman = localizedPathFor(route, "de");

  await page.waitForFunction(({ locale, canonical }) => {
    const root = document.querySelector("#root");
    const heading = root?.querySelector("h1")?.textContent?.trim();
    const description = document.querySelector('meta[name="description"]')?.content?.trim();
    const canonicalHref = document.querySelector('link[rel="canonical"]')?.href;
    return document.documentElement.lang === locale && Boolean(heading) && Boolean(description) && canonicalHref === canonical;
  }, { timeout: 30000 }, { locale: route.locale, canonical: expectedCanonical });

  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));

  const result = await page.evaluate(() => {
    const allMeta = [...document.head.querySelectorAll("meta")];
    const metaContent = (name, attribute = "name") => allMeta
      .filter((meta) => meta.getAttribute(attribute) === name)
      .map((meta) => meta.getAttribute("content") || "");
    const links = [...document.head.querySelectorAll('link[rel="alternate"]')];
    const jsonLdScripts = [...document.head.querySelectorAll('script[type="application/ld+json"]')];

    return {
      titleCount: document.head.querySelectorAll("title").length,
      title: document.title,
      description: metaContent("description")[0] || "",
      descriptionCount: metaContent("description").length,
      robots: metaContent("robots"),
      canonical: document.querySelector('link[rel="canonical"]')?.href || "",
      canonicalCount: document.head.querySelectorAll('link[rel="canonical"]').length,
      lang: document.documentElement.lang,
      alternates: links.map((link) => ({ lang: link.hreflang, href: link.href })),
      og: Object.fromEntries(["og:title", "og:description", "og:type", "og:site_name", "og:locale", "og:url", "og:image", "og:image:alt"]
        .map((key) => [key, metaContent(key, "property")])),
      twitter: Object.fromEntries(["twitter:card", "twitter:title", "twitter:description", "twitter:image", "twitter:image:alt"]
        .map((key) => [key, metaContent(key)])),
      rootHeading: document.querySelector("#root h1")?.textContent?.trim() || "",
      rootHeadingCount: document.querySelectorAll("#root h1").length,
      rootTextLength: document.querySelector("#root")?.innerText?.trim().length || 0,
      jsonLd: jsonLdScripts.map((script) => {
        try { return JSON.parse(script.textContent); } catch { return null; }
      }),
    };
  });

  const fail = (reason) => { throw new Error(`${route.path} - ${reason}`); };
  if (result.titleCount !== 1 || !result.title.trim() || /^putzelf$/i.test(result.title.trim())) {
    fail(`expected exactly one route title, received ${result.titleCount}: ${result.title}`);
  }
  const brandCount = (result.title.match(/putzelf/gi) || []).length;
  if (brandCount > 1) {
    fail(`expected at most one PutzELF brand occurrence, received ${brandCount}: ${result.title}`);
  }
  if (result.descriptionCount !== 1 || !result.description) fail(`expected exactly one non-empty description, received ${result.descriptionCount}`);
  if (result.canonicalCount !== 1 || result.canonical !== expectedCanonical) fail(`incorrect canonical (${result.canonical})`);
  if (result.lang !== route.locale) fail(`expected html lang=${route.locale}, received ${result.lang}`);
  if (result.robots.length !== 1 || result.robots[0] !== (route.noindex ? "noindex, nofollow" : "index, follow")) {
    fail(`incorrect robots rules (${result.robots.join("; ") || "missing"})`);
  }
  if (result.alternates.length !== 3) fail(`expected de/en/x-default hreflang links, received ${result.alternates.length}`);
  const alternates = Object.fromEntries(result.alternates.map((item) => [item.lang, item.href]));
  if (alternates.de !== `${SITE_URL}${expectedGerman}` || alternates.en !== `${SITE_URL}${expectedEnglish}` || alternates["x-default"] !== `${SITE_URL}${expectedGerman}`) {
    fail(`incorrect or non-reciprocal hreflang links (${JSON.stringify(alternates)})`);
  }
  for (const [property, values] of Object.entries(result.og)) {
    if (values.length !== 1 || !values[0]) fail(`expected one Open Graph ${property}, received ${values.length}`);
  }
  if (result.og["og:url"][0] !== expectedCanonical) fail(`og:url does not match canonical (${result.og["og:url"][0]})`);
  if (!/^https?:\/\//i.test(result.og["og:image"][0])) fail("og:image is not an absolute HTTP(S) URL");
  for (const [name, values] of Object.entries(result.twitter)) {
    if (values.length !== 1 || !values[0]) fail(`expected one Twitter ${name}, received ${values.length}`);
  }
  if (result.twitter["twitter:image"][0] !== result.og["og:image"][0]) fail("twitter:image does not match og:image");
  if (result.rootHeadingCount !== 1) fail(`expected exactly one H1, received ${result.rootHeadingCount}`);
  if (!result.rootHeading || result.rootTextLength < 40) fail("route content is missing from #root");
  if (!result.jsonLd.length || result.jsonLd.some((item) => !item)) fail("missing or invalid JSON-LD");
  validateStructuredData(result.jsonLd, route, expectedCanonical);

  const renderedHtml = await page.evaluate(() => document.documentElement.outerHTML);
  return renderedHtml;
}

async function verifyPlainHttpRoutes(page, baseUrl, routes) {
  for (const route of routes) {
    const response = await fetch(`${baseUrl}${route.path}`, { redirect: "manual" });
    const html = await response.text();
    if (response.status !== route.status) {
      throw new Error(`${route.path} - plain HTTP returned ${response.status}; expected ${route.status}`);
    }

    // Parse the fetched source as a document without navigating to it or running its scripts.
    const result = await page.evaluate((source) => {
      const doc = new DOMParser().parseFromString(source, "text/html");
      const metaValues = (name, attribute = "name") => [...doc.head.querySelectorAll(`meta[${attribute}]`)]
        .filter((meta) => meta.getAttribute(attribute) === name)
        .map((meta) => meta.getAttribute("content") || "");
      const alternateLinks = [...doc.head.querySelectorAll('link[rel="alternate"]')]
        .map((link) => ({ lang: link.getAttribute("hreflang") || "", href: link.getAttribute("href") || "" }));
      const root = doc.querySelector("#root");
      const primaryHeading = root?.querySelector("h1");
      const primaryRegion = primaryHeading?.closest("main, article, section") || root;
      const primaryContent = primaryRegion?.cloneNode(true);
      primaryContent?.querySelectorAll("script, style").forEach((element) => element.remove());
      const jsonLd = [...doc.head.querySelectorAll('script[type="application/ld+json"]')].map((script) => {
        try { return JSON.parse(script.textContent); } catch { return null; }
      });

      return {
        titleCount: doc.head.querySelectorAll("title").length,
        title: doc.title.trim(),
        descriptions: metaValues("description"),
        canonicalLinks: [...doc.head.querySelectorAll('link[rel="canonical"]')]
          .map((link) => link.getAttribute("href") || ""),
        lang: doc.documentElement.getAttribute("lang") || "",
        robots: metaValues("robots"),
        alternates: alternateLinks,
        og: Object.fromEntries(["og:site_name", "og:locale", "og:type", "og:title", "og:description", "og:url", "og:image", "og:image:alt"]
          .map((key) => [key, metaValues(key, "property")])),
        twitter: Object.fromEntries(["twitter:card", "twitter:title", "twitter:description", "twitter:image", "twitter:image:alt"]
          .map((key) => [key, metaValues(key)])),
        rootH1Count: root?.querySelectorAll("h1").length || 0,
        primaryHeadingCount: primaryRegion?.querySelectorAll("h1").length || 0,
        primaryHeading: primaryHeading?.textContent?.trim() || "",
        primaryTextLength: primaryContent?.textContent?.replace(/\s+/g, " ").trim().length || 0,
        jsonLd,
      };
    }, html);

    const fail = (reason) => { throw new Error(`${route.path} - plain HTTP ${reason}`); };
    if (result.titleCount !== 1 || !result.title) {
      fail(`expected exactly one non-empty title, received ${result.titleCount}`);
    }
    const title = result.title;
    const brandCount = (title.match(/putzelf/gi) || []).length;
    if (brandCount > 1) {
      fail(`title should contain at most one PutzELF brand occurrence; received: ${title}`);
    }
    if (result.descriptions.length !== 1 || !result.descriptions[0].trim()) {
      fail(`expected exactly one non-empty description, received ${result.descriptions.length}`);
    }
    if (result.canonicalLinks.length !== 1) fail(`expected one canonical, received ${result.canonicalLinks.length}`);
    const canonical = result.canonicalLinks[0];
    if (result.lang !== route.locale) fail(`expected html lang=${route.locale}, received ${result.lang || "missing"}`);
    if (result.robots.length !== 1 || result.robots[0] !== (route.noindex ? "noindex, nofollow" : "index, follow")) {
      fail(`robots directives are missing or incorrect (${result.robots.join("; ") || "missing"})`);
    }

    const expectedEnglish = `${SITE_URL}${localizedPathFor(route, "en")}`;
    const expectedGerman = `${SITE_URL}${localizedPathFor(route, "de")}`;
    if (result.alternates.length !== 3) fail(`expected de/en/x-default hreflang links, received ${result.alternates.length}`);
    const alternates = Object.fromEntries(result.alternates.map((item) => [item.lang, item.href]));
    if (alternates.de !== expectedGerman || alternates.en !== expectedEnglish || alternates["x-default"] !== expectedGerman
      || new Set(result.alternates.map((item) => item.lang)).size !== 3) {
      fail(`hreflang links are missing, duplicated, or incorrect (${JSON.stringify(alternates)})`);
    }

    for (const [property, values] of Object.entries(result.og)) {
      if (values.length !== 1 || !values[0].trim()) fail(`expected one non-empty Open Graph ${property}, received ${values.length}`);
    }
    if (result.og["og:site_name"][0] !== "PutzELF"
      || result.og["og:locale"][0] !== (route.locale === "de" ? "de_AT" : "en_US")
      || result.og["og:title"][0] !== title
      || result.og["og:description"][0] !== result.descriptions[0]
      || result.og["og:url"][0] !== canonical) {
      fail("Open Graph title, description, locale, site name, or URL does not match the route metadata");
    }
    if (!/^https?:\/\//i.test(result.og["og:image"][0])) fail("Open Graph image is not an absolute HTTP(S) URL");
    for (const [name, values] of Object.entries(result.twitter)) {
      if (values.length !== 1 || !values[0].trim()) fail(`expected one non-empty Twitter ${name}, received ${values.length}`);
    }
    if (result.twitter["twitter:title"][0] !== title
      || result.twitter["twitter:description"][0] !== result.descriptions[0]
      || result.twitter["twitter:image"][0] !== result.og["og:image"][0]) {
      fail("Twitter title, description, or image does not match the route metadata");
    }

    const xRobots = response.headers.get("x-robots-tag") || "";
    const expectedCanonical = `${SITE_URL}${route.canonicalPath || route.path}`;
    if (canonical !== expectedCanonical) fail(`canonical was ${canonical || "missing"}; expected ${expectedCanonical}`);
    if (!route.noindex && /noindex|nofollow/i.test(xRobots)) {
      fail("X-Robots-Tag unexpectedly blocks indexing or following on this indexable route");
    }
    if (!html.includes('name="prerender-owner"') || result.rootH1Count !== 1 || result.primaryHeadingCount !== 1
      || !result.primaryHeading || result.primaryTextLength < 40) {
      fail("response is missing meaningful primary content or exactly one H1 in its primary content region");
    }
    if (result.jsonLd.some((item) => !item)) fail("response contains invalid JSON-LD");
    validateStructuredData(result.jsonLd, route, expectedCanonical);
    const webPage = result.jsonLd.flatMap((document) => Array.isArray(document?.["@graph"]) ? document["@graph"] : [document])
      .find((node) => (Array.isArray(node?.["@type"]) ? node["@type"] : [node?.["@type"]]).includes("WebPage"));
    if (!webPage || webPage.name !== title || webPage.description !== result.descriptions[0]) {
      fail("WebPage structured data title or description does not match the visible page metadata");
    }
  }
}

async function verifyNoindexHttpRoutes(baseUrl, robotsTxt) {
  const robotsResponse = await fetch(`${baseUrl}/robots.txt`, { redirect: "manual" });
  const servedRobotsTxt = await robotsResponse.text();
  if (robotsResponse.status !== 200 || servedRobotsTxt !== robotsTxt) {
    throw new Error("/robots.txt - expected the generated robots rules over plain HTTP");
  }

  const legacyPrivateAliases = [
    ["/book?type=Deep", "/de/booking?type=Deep"],
    ["/profile", "/de/booking"],
    ["/login", "/de/login"],
  ];
  for (const [aliasPath, expectedTarget] of legacyPrivateAliases) {
    const redirect = await fetch(`${baseUrl}${aliasPath}`, { redirect: "manual" });
    if (redirect.status !== 301 || redirect.headers.get("location") !== expectedTarget) {
      throw new Error(`${aliasPath} - expected crawlable 301 to ${expectedTarget}`);
    }
    const destination = await fetch(`${baseUrl}${expectedTarget}`, { redirect: "manual" });
    if (destination.status !== 200 || !/noindex/i.test(destination.headers.get("x-robots-tag") || "")) {
      throw new Error(`${expectedTarget} - redirected private route must be fetchable with X-Robots-Tag noindex`);
    }
  }

  const wwwLogin = await fetch(`${baseUrl}/login`, {
    redirect: "manual",
    headers: { "X-Forwarded-Host": "www.putzelf.com" },
  });
  if (wwwLogin.status !== 301 || wwwLogin.headers.get("location") !== "https://putzelf.com/de/login") {
    throw new Error("www.putzelf.com/login - expected a direct crawlable redirect to the canonical login URL");
  }
  const canonicalLogin = await fetch(`${baseUrl}/de/login`, { redirect: "manual" });
  if (canonicalLogin.status !== 200 || !/noindex/i.test(canonicalLogin.headers.get("x-robots-tag") || "")) {
    throw new Error("/de/login - canonical login destination must remain fetchable with noindex");
  }

  const retiredReviewHost = await fetch(`${baseUrl}/`, {
    redirect: "manual",
    headers: { "X-Forwarded-Host": "review.putzelf.com" },
  });
  if (retiredReviewHost.status !== 410) {
    throw new Error("review.putzelf.com - retired review host must return HTTP 410");
  }

  const clientOnlyPaths = locales.flatMap((locale) => [
    `/${locale}/booking`,
    `/${locale}/admin`,
    `/${locale}/order/seo05-check`,
  ]);
  for (const routePath of clientOnlyPaths) {
    const response = await fetch(`${baseUrl}${routePath}`, { redirect: "manual" });
    const directive = response.headers.get("x-robots-tag") || "";
    if (response.status !== 200 || !/noindex/i.test(directive)) {
      throw new Error(`${routePath} - expected HTTP 200 with X-Robots-Tag noindex, received ${response.status} and ${directive || "no directive"}`);
    }
    const html = await response.text();
    const counts = {
      title: (html.match(/<title\b/gi) || []).length,
      description: (html.match(/<meta\b[^>]*name="description"/gi) || []).length,
      canonical: (html.match(/<link\b[^>]*rel="canonical"/gi) || []).length,
      h1: (html.match(/<h1\b/gi) || []).length,
    };
    if (Object.values(counts).some((count) => count !== 1)) {
      throw new Error(`${routePath} - initial private HTML must have one title, description, canonical and H1; got ${JSON.stringify(counts)}`);
    }
  }

  for (const locale of locales) {
    const profileResponse = await fetch(`${baseUrl}/${locale}/profile`, { redirect: "manual" });
    const expectedTarget = `/${locale}/booking`;
    if (profileResponse.status !== 301 || profileResponse.headers.get("location") !== expectedTarget) {
      throw new Error(`/${locale}/profile - expected redirect to ${expectedTarget}`);
    }
    const bookingResponse = await fetch(`${baseUrl}${expectedTarget}`, { redirect: "manual" });
    if (bookingResponse.status !== 200 || !/noindex/i.test(bookingResponse.headers.get("x-robots-tag") || "")) {
      throw new Error(`${expectedTarget} - profile redirect destination must expose X-Robots-Tag noindex`);
    }
  }
}

async function verifyServerRouteMatrix(baseUrl, routes) {
  const redirects = [
    ...permanentRedirects,
    ["/de/landing-alt", "/de/"],
    ["/en/landing-alt", "/en/"],
    ...blogPostSlugs.map((slug) => [`/blog/${slug}`, `/de/blog/${slug}`]),
    ["/order/seo03-check", "/de/order/seo03-check"],
    ["/de/profile", "/de/booking"],
    ["/en/profile", "/en/booking"],
    ["/de/profile?utm_campaign=booking-test", "/de/booking?utm_campaign=booking-test"],
    ["/en/profile?utm_source=campaign", "/en/booking?utm_source=campaign"],
  ];

  for (const [from, expectedLocation] of redirects) {
    const response = await fetch(`${baseUrl}${from}`, { redirect: "manual" });
    const location = response.headers.get("location");
    if (response.status !== 301 || location !== expectedLocation) {
      throw new Error(`${from} - expected one-hop 301 to ${expectedLocation}, received ${response.status} to ${location || "nowhere"}`);
    }
    const destination = await fetch(`${baseUrl}${location}`, { redirect: "manual" });
    if (destination.status !== 200) {
      throw new Error(`${from} - redirect destination ${location} returned ${destination.status}, expected 200`);
    }
  }

  for (const retiredPath of retiredLegacyFilePaths) {
    const response = await fetch(`${baseUrl}${retiredPath}`, { redirect: "manual" });
    if (response.status !== 410) throw new Error(`${retiredPath} - expected HTTP 410, received ${response.status}`);
  }

  const canonicalizationCases = [
    ["/", "www.putzelf.com", "http", "https://putzelf.com/de/"],
    ["/", "www.putzelf.com", "https", "https://putzelf.com/de/"],
    ["/", "putzelf.com", "http", "https://putzelf.com/de/"],
    ["/", "putzelf.com", "https", "/de/"],
    ["/calculator", "www.putzelf.com", "https", "https://putzelf.com/de/calculator"],
    ["/calculator", "putzelf.com", "http", "https://putzelf.com/de/calculator"],
    ["/imprint", "www.putzelf.com", "https", "https://putzelf.com/de/impressum"],
    ["/imprint", "putzelf.com", "http", "https://putzelf.com/de/impressum"],
    ["/de/profile", "www.putzelf.com", "https", "https://putzelf.com/de/booking"],
    ["/en/profile", "putzelf.com", "http", "https://putzelf.com/en/booking"],
    ["/de/kontakt", "www.putzelf.com", "https", "https://putzelf.com/de/kontakt"],
    ["/en/services", "putzelf.com", "http", "https://putzelf.com/en/services"],
    ["/landing-alt", "www.putzelf.com", "https", "https://putzelf.com/de/"],
    ["/de/landing-alt", "putzelf.com", "http", "https://putzelf.com/de/"],
    ["/en/landing-alt", "www.putzelf.com", "https", "https://putzelf.com/en/"],
    ["/de/services/wien", "www.putzelf.com", "https", "https://putzelf.com/de/services"],
    ["/de/services/graz", "putzelf.com", "http", "https://putzelf.com/de/services"],
    ["/de/booking/", "putzelf.com", "https", "/de/booking"],
    ["/en/booking/", "putzelf.com", "https", "/en/booking"],
    ["/de/booking/?utm_source=campaign", "putzelf.com", "https", "/de/booking?utm_source=campaign"],
    ["/en/booking/?utm_campaign=summer", "putzelf.com", "https", "/en/booking?utm_campaign=summer"],
  ];
  for (const [routePath, hostname, protocol, expectedLocation] of canonicalizationCases) {
    const response = await fetch(`${baseUrl}${routePath}`, {
      redirect: "manual",
      headers: { "X-Forwarded-Host": hostname, "X-Forwarded-Proto": protocol },
    });
    if (response.status !== 301 || response.headers.get("location") !== expectedLocation) {
      throw new Error(`${protocol}://${hostname}${routePath} - expected direct 301 to ${expectedLocation}`);
    }
    const destinationPath = new URL(expectedLocation, "https://putzelf.com").pathname;
    const destination = await fetch(`${baseUrl}${destinationPath}`, { redirect: "manual" });
    if (destination.status !== 200) {
      throw new Error(`${protocol}://${hostname}${routePath} - final destination ${destinationPath} returned ${destination.status}`);
    }
  }

  const retiredReviewResponse = await fetch(`${baseUrl}/`, {
    redirect: "manual",
    headers: { "X-Forwarded-Host": "review.putzelf.com" },
  });
  if (retiredReviewResponse.status !== 410) {
    throw new Error("review.putzelf.com/ - expected HTTP 410 after retiring the review host");
  }

  const duplicateCanonicalPaths = [
    "/de/",
    "/en/",
    "/de/datenschutz",
    "/de/partner-werden",
    ...blogPostSlugs.map((slug) => `/en/blog/${slug}`),
  ];
  for (const hostname of ["www.putzelf.com"]) {
    for (const routePath of duplicateCanonicalPaths) {
      const response = await fetch(`${baseUrl}${routePath}`, {
        redirect: "manual",
        headers: { "X-Forwarded-Host": hostname, "X-Forwarded-Proto": "https" },
      });
      const expectedLocation = `https://putzelf.com${routePath}`;
      if (response.status !== 301 || response.headers.get("location") !== expectedLocation) {
        throw new Error(`${hostname}${routePath} - expected one-hop 301 to ${expectedLocation}`);
      }
      const target = await fetch(`${baseUrl}${routePath}`, { redirect: "manual" });
      if (target.status !== 200) throw new Error(`${expectedLocation} - canonical target returned ${target.status}`);
    }
  }

  for (const currentFile of [
    "/files/03_Impressum_PutzELF.docx",
    "/files/04_AGB_PutzELF.docx",
    "/files/05_Datenschutzerklaerung_PutzELF.docx",
    "/files/06_FAGG_Ruecktrittsbelehrung_PutzELF.docx",
  ]) {
    const response = await fetch(`${baseUrl}${currentFile}`, { redirect: "manual" });
    const body = await response.arrayBuffer();
    if (response.status !== 200 || body.byteLength === 0) {
      throw new Error(`${currentFile} - current legal document must return HTTP 200 with a non-empty body`);
    }
  }

  const trailingSlashResponse = await fetch(`${baseUrl}/de/impressum/`, { redirect: "manual" });
  if (trailingSlashResponse.status !== 301 || trailingSlashResponse.headers.get("location") !== "/de/impressum") {
    throw new Error("/de/impressum/ - expected a single 301 to the canonical URL");
  }

  for (const [pathName, locale] of [["/definitely-not-a-page", "de"], ["/de/services/not-a-service", "de"], ["/en/services/not-a-service", "en"]]) {
    const response = await fetch(`${baseUrl}${pathName}`, { redirect: "manual" });
    if (response.status !== 404) throw new Error(`${pathName} - expected HTTP 404, received ${response.status}`);
    const html = await response.text();
    const htmlLang = html.match(/<html[^>]*lang="([^"]+)"/i)?.[1];
    if (htmlLang !== locale) {
      throw new Error(`${pathName} - 404 response is missing its ${locale} error page`);
    }
  }

  const orderResponse = await fetch(`${baseUrl}/de/order/seo03-check`, { redirect: "manual" });
  if (orderResponse.status !== 200) throw new Error(`/de/order/seo03-check - expected dynamic booking route status 200, received ${orderResponse.status}`);

  const notFoundRoutes = routes.filter((route) => route.status === 404);
  if (!notFoundRoutes.length) throw new Error("No localized 404 routes are configured");
  for (const route of notFoundRoutes) {
    const response = await fetch(`${baseUrl}${route.path}`, { redirect: "manual" });
    if (response.status !== 404) throw new Error(`${route.path} - expected HTTP 404, received ${response.status}`);
  }
}

async function verifyClientRenderedRoutes(page, baseUrl, routes) {
  for (const route of routes) {
    const response = await page.goto(`${baseUrl}${route.path}`, { waitUntil: "domcontentloaded" });
    if (!response || response.status() !== route.status) {
      throw new Error(`${route.path} - generated snapshot returned ${response?.status() ?? "no response"}; expected ${route.status}`);
    }
    await page.evaluate(() => new Promise((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(resolve, 120)));
    }));
    await inspectRenderedPage(page, route);
  }
}

async function verifyPrivateClientRoutes(page, baseUrl) {
  const paths = locales.flatMap((locale) => [
    `/${locale}/admin`,
    `/${locale}/order/seo05-check`,
    `/${locale}/order/request`,
  ]);

  for (const routePath of paths) {
    await page.goto(`${baseUrl}${routePath}`, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => new Promise((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(resolve, 500)));
    }));
    const result = await page.evaluate(() => ({
      path: location.pathname,
      title: document.head.querySelectorAll("title").length,
      description: document.head.querySelectorAll('meta[name="description"]').length,
      canonical: document.head.querySelectorAll('link[rel="canonical"]').length,
      h1: document.querySelectorAll("#root h1").length,
    }));
    if (Object.values(result).filter((value) => typeof value === "number").some((count) => count !== 1)) {
      throw new Error(`${routePath} - after client rendering expected one title, description, canonical and H1; got ${JSON.stringify(result)}`);
    }
  }
}

async function run() {
  const logoPath = path.join(ROOT, "public", "logo.png");
  const logoStat = await fs.promises.stat(logoPath).catch(() => null);
  if (!logoStat?.isFile() || logoStat.size === 0) throw new Error("public/logo.png must be a non-empty image before prerendering");

  const apacheConfigPath = path.join(ROOT, "public", ".htaccess");
  if (!fs.existsSync(apacheConfigPath)) throw new Error("public/.htaccess is missing; server-side redirects and status rules are required");
  await fs.promises.copyFile(apacheConfigPath, path.join(DIST, ".htaccess"));

  const routes = buildRouteList();
  if (!routes.length) throw new Error("No routes configured for prerendering");
  validateMetadataShellOwnership();
  const sitemapPaths = validateSitemapCoverage(routes);
  const robotsTxt = validateRobotsRules(sitemapPaths, routes);
  validateNoindexServerHeaders();
  validateLegacyServerRules();

  const { server, port } = await startStaticServer(routes);
  const baseUrl = `http://127.0.0.1:${port}`;
  const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);
  try {
    for (const route of routes) {
      console.log(`Prerendering ${route.path}`);
      const response = await page.goto(`${baseUrl}${route.path}`, { waitUntil: "domcontentloaded" });
      if (!response || response.status() !== route.status) {
        throw new Error(`${route.path} - page request returned ${response?.status() ?? "no response"}; expected ${route.status}`);
      }

      const html = addPrerenderMarker(await inspectRenderedPage(page, route));
      const outputPath = normalizeOutputPath(route.path);
      await fs.promises.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.promises.writeFile(outputPath, html, "utf8");
    }

    await writePrivateRouteShells();
    await verifyClientRenderedRoutes(page, baseUrl, routes);
    await verifyPrivateClientRoutes(page, baseUrl);
    verifyCrawlableLinkGraph();
    await verifyPlainHttpRoutes(page, baseUrl, routes);
    await verifyNoindexHttpRoutes(baseUrl, robotsTxt);
    await verifyServerRouteMatrix(baseUrl, routes);
    console.log(`Prerendered ${routes.length} localized routes; verified ${sitemapPaths.length} sitemap URLs are 200, indexable, and self-canonical, noindex routes are fetchable with directives, and redirects, 404s, and 410s over plain HTTP`);
  } finally {
    await browser.close();
    await new Promise((resolve, reject) => {
      server.close((error) => error ? reject(error) : resolve());
      server.closeAllConnections?.();
    });
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  run().catch((error) => {
    console.error("Prerender failed:", error);
    process.exitCode = 1;
  });
}
