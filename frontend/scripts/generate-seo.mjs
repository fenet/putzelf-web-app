import fs from "fs";
import path from "path";

const projectRoot = path.resolve(process.cwd());
const publicDir = path.join(projectRoot, "public");

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
  // Fallback based on repo branding / email domain
  "https://putzelf.com";

const routes = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/landing-alt", changefreq: "monthly", priority: 0.4 },
  { path: "/calculator", changefreq: "monthly", priority: 0.6 },
  { path: "/imprint", changefreq: "yearly", priority: 0.2 },
];

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function buildSitemapXml() {
  const lastmod = isoDate(new Date());
  const urlset = routes
    .map((r) => {
      const loc = `${siteUrl}${r.path}`;
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority.toFixed(1)}</priority>\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>\n`;
}

function buildRobotsTxt() {
  // Keep booking/account/admin routes out of index.
  return [
    "User-agent: *",
    "Allow: /",
    "Disallow: /admin",
    "Disallow: /login",
    "Disallow: /register",
    "Disallow: /book",
    "Disallow: /order",
    "Disallow: /search",
    "Disallow: /profile",
    `Sitemap: ${siteUrl}/sitemap.xml`,
    "",
  ].join("\n");
}

fs.mkdirSync(publicDir, { recursive: true });

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), buildSitemapXml(), "utf8");
fs.writeFileSync(path.join(publicDir, "robots.txt"), buildRobotsTxt(), "utf8");

console.log(`Generated SEO files with SITE_URL=${siteUrl}`);
