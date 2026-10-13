import fs from "fs";
import path from "path";
import { loadEnv } from "vite";
import { blogPostSlugs, locales, routeRegistry } from "../src/data/routeRegistry.mjs";

const projectRoot = path.resolve(process.cwd());
const publicDir = path.join(projectRoot, "public");
const fileEnv = loadEnv("production", projectRoot, "");

function normalizeSiteUrl(value) {
  if (!value) return null;
  const trimmed = String(value).trim();
  if (!trimmed) return null;
  return trimmed.endsWith("/") ? trimmed.slice(0, -1) : trimmed;
}

const siteUrl =
  normalizeSiteUrl(process.env.SITE_URL) ||
  normalizeSiteUrl(process.env.VITE_SITE_URL) ||
  normalizeSiteUrl(process.env.PUBLIC_SITE_URL) ||
  normalizeSiteUrl(fileEnv.SITE_URL) ||
  normalizeSiteUrl(fileEnv.VITE_SITE_URL) ||
  normalizeSiteUrl(fileEnv.PUBLIC_SITE_URL) ||
  // Fallback based on repo branding / email domain
  "https://putzelf.com";

function localizedPath(locale, template, params = {}) {
  const rendered = template.replace(/:([A-Za-z0-9_]+)/g, (_, key) => {
    if (!params[key]) throw new Error(`Missing route parameter ${key} for ${template}`);
    return params[key];
  });
  return `/${locale}${rendered === "/" ? "/" : rendered}`;
}

function buildSitemapRoutes() {
  const routes = [];
  for (const [key, definition] of Object.entries(routeRegistry)) {
    if (!definition.sitemap) continue;
    if (!definition.prerender || definition.noindex || definition.status === 404) {
      throw new Error(`Sitemap route ${key} must be prerendered, indexable, and return HTTP 200`);
    }
    for (const locale of locales) {
      const template = definition[locale];
      if (!template) throw new Error(`Sitemap route ${key} has no ${locale} path`);
      const routeParams = key === "blogPost" ? blogPostSlugs.map((slug) => ({ slug })) : [{}];
      for (const params of routeParams) {
        routes.push({
          path: localizedPath(locale, template, params),
          ...definition.sitemap,
        });
      }
    }
  }

  const seenPaths = new Set();
  for (const route of routes) {
    if (seenPaths.has(route.path)) throw new Error(`Duplicate sitemap route: ${route.path}`);
    seenPaths.add(route.path);
  }
  return routes;
}

const routes = buildSitemapRoutes();

function buildSitemapXml() {
  const urlset = routes
    .map((r) => {
      const loc = `${siteUrl}${r.path}`;
      return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority.toFixed(1)}</priority>\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>\n`;
}

function buildRobotsTxt() {
  return [
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/",
    "Disallow: /_not-found",
    `Sitemap: ${siteUrl}/sitemap.xml`,
    "",
  ].join("\n");
}

fs.mkdirSync(publicDir, { recursive: true });

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), buildSitemapXml(), "utf8");
fs.writeFileSync(path.join(publicDir, "robots.txt"), buildRobotsTxt(), "utf8");

console.log(`Generated SEO files with SITE_URL=${siteUrl}`);
