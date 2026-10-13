export const locales = ["de", "en"];

// This is the shared source of truth for localized routes and their build/SEO policy.
// Sitemap metadata is intentionally absent from retired pages and private funnels.
export const routeRegistry = {
  home: {
    de: "/",
    en: "/",
    prerender: true,
    sitemap: { changefreq: "weekly", priority: 1.0 },
  },
  // Retired landing pages redirect to the localized homepage and are not organic routes.
  landingAlt: { de: "/landing-alt", en: "/landing-alt", prerender: false },
  servicesOverview: {
    de: "/services",
    en: "/services",
    prerender: true,
    sitemap: { changefreq: "monthly", priority: 0.8 },
  },
  privateMaintenance: {
    de: "/services/unterhaltsreinigung",
    en: "/services/maintenance-cleaning",
    prerender: true,
    sitemap: { changefreq: "monthly", priority: 0.7 },
  },
  privateDeep: {
    de: "/services/grundreinigung",
    en: "/services/deep-cleaning-private",
    prerender: true,
    sitemap: { changefreq: "monthly", priority: 0.7 },
  },
  privateResidential: {
    de: "/services/wohnreinigung",
    en: "/services/residential-cleaning",
    prerender: true,
    sitemap: { changefreq: "monthly", priority: 0.7 },
  },
  privateConstruction: {
    de: "/services/bauendreinigung-grobreinigung",
    en: "/services/construction-cleaning",
    prerender: true,
    sitemap: { changefreq: "monthly", priority: 0.7 },
  },
  privateWindow: {
    de: "/services/glas-rahmenreinigung",
    en: "/services/window-cleaning",
    prerender: true,
    sitemap: { changefreq: "monthly", priority: 0.7 },
  },
  privateIndustrial: {
    de: "/services/industriereinigung-maschinen",
    en: "/services/industrial-cleaning",
    prerender: true,
    sitemap: { changefreq: "monthly", priority: 0.7 },
  },
  businessMaintenance: {
    de: "/services/unterhaltsreinigung-gewerbe",
    en: "/services/maintenance-cleaning-business",
    prerender: true,
    sitemap: { changefreq: "monthly", priority: 0.7 },
  },
  businessDeep: {
    de: "/services/grundreinigung-gewerbe",
    en: "/services/deep-cleaning-business",
    prerender: true,
    sitemap: { changefreq: "monthly", priority: 0.7 },
  },
  businessStaircase: {
    de: "/services/treppenhausreinigung",
    en: "/services/staircase-cleaning",
    prerender: true,
    sitemap: { changefreq: "monthly", priority: 0.7 },
  },
  businessConstruction: {
    de: "/services/bauendreinigung-grobreinigung-gewerbe",
    en: "/services/construction-cleaning-business",
    prerender: true,
    sitemap: { changefreq: "monthly", priority: 0.7 },
  },
  businessWindow: {
    de: "/services/glas-rahmenreinigung-gewerbe",
    en: "/services/window-cleaning-business",
    prerender: true,
    sitemap: { changefreq: "monthly", priority: 0.7 },
  },
  businessIndustrial: {
    de: "/services/industriereinigung-maschinen-gewerbe",
    en: "/services/industrial-cleaning-business",
    prerender: true,
    sitemap: { changefreq: "monthly", priority: 0.7 },
  },
  contact: {
    de: "/kontakt",
    en: "/contact",
    prerender: true,
    sitemap: { changefreq: "monthly", priority: 0.6 },
  },
  jobOpening: {
    de: "/karriere",
    en: "/job-opening",
    prerender: true,
    sitemap: { changefreq: "monthly", priority: 0.4 },
  },
  getPartners: {
    de: "/partner-werden",
    en: "/get-partners",
    prerender: true,
    sitemap: { changefreq: "monthly", priority: 0.4 },
  },
  privacy: {
    de: "/datenschutz",
    en: "/privacy",
    prerender: true,
    sitemap: { changefreq: "yearly", priority: 0.2 },
  },
  imprint: {
    de: "/impressum",
    en: "/imprint",
    prerender: true,
    sitemap: { changefreq: "yearly", priority: 0.2 },
  },
  booking: { de: "/booking", en: "/booking", prerender: false, noindex: true },
  order: { de: "/order/:id", en: "/order/:id", prerender: false, noindex: true },
  search: { de: "/search", en: "/search", prerender: true, noindex: true },
  profile: { de: "/profile", en: "/profile", prerender: false, noindex: true },
  calculator: { de: "/calculator", en: "/calculator", prerender: true, noindex: true },
  blog: {
    de: "/blog",
    en: "/blog",
    prerender: true,
    sitemap: { changefreq: "weekly", priority: 0.6 },
  },
  blogPost: {
    de: "/blog/:slug",
    en: "/blog/:slug",
    prerender: true,
    sitemap: { changefreq: "monthly", priority: 0.5 },
  },
  login: { de: "/login", en: "/login", prerender: true, noindex: true },
  register: { de: "/register", en: "/register", prerender: true, noindex: true },
  admin: { de: "/admin", en: "/admin", prerender: false, noindex: true },
  notFound: { de: "/404", en: "/404", prerender: true, noindex: true, status: 404 },
};

export const blogPostSlugs = [
  "so-pflegen-sie-buero-und-arbeitsraeume-effektiv",
  "gruenere-arbeitsplaetze-dank-gesunder-reinigungsroutine",
  "fensterreinigung-fuer-mehr-licht-und-wohlfuehlen",
];
