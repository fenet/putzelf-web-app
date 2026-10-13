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
    `/${locale}/search`,
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
  const retiredPdfRule = apacheConfig.split(/\r?\n/).find((line) =>
    line.includes("RewriteRule ^files/") && line.includes("[G,NC,L]")
  );
  if (!retiredPdfRule || retiredLegacyFilePaths.some((filePath) => !retiredPdfRule.includes(path.basename(filePath, ".pdf")))) {
    throw new Error(".htaccess must return HTTP 410 for every retired legacy PDF URL");
  }
  if (!apacheConfig.includes("RewriteCond %{ENV:REDIRECT_STATUS} ^$")
    || !apacheConfig.includes("RewriteCond %{HTTP_HOST} ^(?:review|www)\\.putzelf\\.com(?::\\d+)?$ [NC]")
    || !apacheConfig.includes("RewriteRule ^ https://putzelf.com%{REQUEST_URI} [R=301,L,NE]")) {
    throw new Error(".htaccess must permanently redirect review and www host paths to the canonical host");
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
  ["/contact", "/de/kontakt"],
  ["/kontakt", "/de/kontakt"],
  ["/job-opening", "/de/karriere"],
  ["/get-partners", "/de/partner-werden"],
  ["/privacy", "/de/datenschutz"],
  ["/datenschutz", "/de/datenschutz"],
  ["/imprint", "/de/impressum"],
  ["/book", "/de/booking"],
  ["/search", "/de/search"],
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
      if (requestHost === "review.putzelf.com" || requestHost === "www.putzelf.com") {
        response.writeHead(301, { Location: `https://putzelf.com${pathname}${url.search}`, "Cache-Control": "no-cache" });
        response.end();
        return;
      }
      if (/^\/(?:de|en)\/(?:booking|profile|calculator|search|login|register|admin|order)(?:\/|$)/i.test(normalizedPath)) {
        response.setHeader("X-Robots-Tag", "noindex, nofollow");
      }
      const redirectTarget = getPermanentRedirect(pathname);
      if (redirectTarget) {
        response.writeHead(301, { Location: `${redirectTarget}${url.search}`, "Cache-Control": "no-cache" });
        response.end();
        return;
      }

      const isGone = /^\/de\/services\/(?:wien|graz)$/i.test(normalizedPath);
      const route = routeByPath.get(normalizedPath);
      const isNotFoundRoute = route?.status === 404 || /^\/(?:de|en)\/404$/.test(normalizedPath);
      const isDynamicOrder = /^\/(de|en)\/order\/[^/]+$/.test(normalizedPath);
      const isClientOnlyBooking = /^\/(?:de|en)\/booking$/.test(normalizedPath);
      const isClientOnlyAdmin = /^\/(?:de|en)\/admin$/.test(normalizedPath);
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

      if (pathname.endsWith("/") && !/^\/(?:de|en)\/$/.test(pathname) && !isDynamicOrder) {
        const directoryPath = resolveRequestPath(request.url || "/");
        if (directoryPath && fs.existsSync(directoryPath) && fs.statSync(directoryPath).isDirectory()) {
          response.writeHead(301, { Location: normalizedPath, "Cache-Control": "no-cache" });
          response.end();
          return;
        }
      }

      const requestPath = isDynamicOrder || isClientOnlyBooking || isClientOnlyAdmin
        ? shellPath
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
  if (brandCount !== 1 || !/\|\s*putzelf$/i.test(result.title)) {
    fail(`expected one PutzELF brand suffix, received ${brandCount}: ${result.title}`);
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
  if (!result.rootHeading || result.rootTextLength < 40) fail("route content is missing from #root");
  if (!result.jsonLd.length || result.jsonLd.some((item) => !item)) fail("missing or invalid JSON-LD");
  validateStructuredData(result.jsonLd, route, expectedCanonical);

  const renderedHtml = await page.evaluate(() => document.documentElement.outerHTML);
  return renderedHtml;
}

async function verifyPlainHttpRoutes(baseUrl, routes) {
  for (const route of routes) {
    const response = await fetch(`${baseUrl}${route.path}`, { redirect: "manual" });
    const html = await response.text();
    if (response.status !== route.status) {
      throw new Error(`${route.path} - plain HTTP returned ${response.status}; expected ${route.status}`);
    }

    const titleCount = (html.match(/<title\b/gi) || []).length;
    const descriptionCount = (html.match(/<meta\b[^>]*name="description"/gi) || []).length;
    const canonicalCount = (html.match(/<link\b[^>]*rel="canonical"/gi) || []).length;
    if (titleCount !== 1 || descriptionCount !== 1 || canonicalCount !== 1) {
      throw new Error(`${route.path} - plain HTTP snapshot has ${titleCount} title, ${descriptionCount} description and ${canonicalCount} canonical tags`);
    }
    const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/<[^>]*>/g, "").trim() || "";
    const brandCount = (title.match(/putzelf/gi) || []).length;
    if (brandCount !== 1 || !/\|\s*putzelf$/i.test(title)) {
      throw new Error(`${route.path} - plain HTTP title should contain one PutzELF suffix; received: ${title || "missing"}`);
    }
    const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/i)?.[1];
    const htmlLang = html.match(/<html\b[^>]*lang="([^"]+)"/i)?.[1];
    const robots = [...html.matchAll(/<meta\b[^>]*name="robots"[^>]*content="([^"]+)"/gi)].map(([, value]) => value);
    const xRobots = response.headers.get("x-robots-tag") || "";
    const expectedCanonical = `${SITE_URL}${route.canonicalPath || route.path}`;
    if (canonical !== expectedCanonical) throw new Error(`${route.path} - plain HTTP canonical was ${canonical || "missing"}`);
    if (htmlLang !== route.locale) throw new Error(`${route.path} - plain HTTP lang was ${htmlLang || "missing"}`);
    if (robots.length !== 1 || robots[0] !== (route.noindex ? "noindex, nofollow" : "index, follow")) {
      throw new Error(`${route.path} - plain HTTP robots rules are missing or incorrect`);
    }
    if (!route.noindex && /noindex/i.test(xRobots)) {
      throw new Error(`${route.path} - plain HTTP X-Robots-Tag unexpectedly marks this indexable route noindex`);
    }
    if (!html.includes('name="prerender-owner"') || !html.includes('<div id="root">') || !/<div id="root">[\s\S]*?<h1\b/i.test(html)) {
      throw new Error(`${route.path} - plain HTTP response does not contain the prerendered route content`);
    }
    const jsonLd = [...html.matchAll(/<script\b(?=[^>]*\btype=["']application\/ld\+json["'])[^>]*>([\s\S]*?)<\/script>/gi)]
      .map(([, contents]) => {
        try { return JSON.parse(contents); } catch { return null; }
      });
    if (jsonLd.some((item) => !item)) throw new Error(`${route.path} - plain HTTP response contains invalid JSON-LD`);
    validateStructuredData(jsonLd, route, expectedCanonical);
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
  if (wwwLogin.status !== 301 || wwwLogin.headers.get("location") !== "https://putzelf.com/login") {
    throw new Error("www.putzelf.com/login - expected a crawlable host redirect to the canonical hostname");
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

  const duplicateCanonicalPaths = [
    "/de/",
    "/en/",
    "/de/datenschutz",
    "/de/partner-werden",
    ...blogPostSlugs.map((slug) => `/en/blog/${slug}`),
  ];
  for (const hostname of ["review.putzelf.com", "www.putzelf.com"]) {
    for (const routePath of duplicateCanonicalPaths) {
      const response = await fetch(`${baseUrl}${routePath}`, {
        redirect: "manual",
        headers: { "X-Forwarded-Host": hostname },
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

  for (const pathName of ["/de/services/wien", "/de/services/graz"]) {
    const response = await fetch(`${baseUrl}${pathName}`, { redirect: "manual" });
    if (response.status !== 410) throw new Error(`${pathName} - expected HTTP 410, received ${response.status}`);
    const html = await response.text();
    const htmlLang = html.match(/<html[^>]*lang="([^"]+)"/i)?.[1];
    if (htmlLang !== "de") throw new Error(`${pathName} - 410 response is missing its German error page`);
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

    await verifyClientRenderedRoutes(page, baseUrl, routes);
    verifyCrawlableLinkGraph();
    await verifyPlainHttpRoutes(baseUrl, routes);
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
