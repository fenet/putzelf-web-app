import { generatePath, matchPath } from "react-router-dom";

export const locales = ["de", "en"];
export const defaultLocale = "de";

const routeDefs = {
  home: { de: "/", en: "/" },
  landingAlt: { de: "/landing-alt", en: "/landing-alt" },
  servicesOverview: { de: "/services", en: "/services" },
  servicesWien: { de: "/services/wien", en: "/services/wien" },
  servicesGraz: { de: "/services/graz", en: "/services/graz" },
  officeCleaning: { de: "/services/buero-reinigung", en: "/services/office-cleaning" },
  deepCleaning: { de: "/services/tiefenreinigung", en: "/services/deep-cleaning" },
  restaurantCleaning: { de: "/services/restaurantreinigung", en: "/services/restaurant-cleaning" },
  // New service pages (private)
  privateMaintenance: { de: "/services/unterhaltsreinigung", en: "/services/maintenance-cleaning" },
  privateDeep: { de: "/services/grundreinigung", en: "/services/deep-cleaning-private" },
  privateResidential: { de: "/services/wohnreinigung", en: "/services/residential-cleaning" },
  privateConstruction: { de: "/services/bauendreinigung-grobreinigung", en: "/services/construction-cleaning" },
  privateWindow: { de: "/services/glas-rahmenreinigung", en: "/services/window-cleaning" },
  privateIndustrial: { de: "/services/industriereinigung-maschinen", en: "/services/industrial-cleaning" },
  // one-time cleaning split: private and business
  privateOneTime: { de: "/services/einmalreinigung", en: "/services/one-time-cleaning" },
  // New service pages (business)
  businessMaintenance: { de: "/services/unterhaltsreinigung-gewerbe", en: "/services/maintenance-cleaning-business" },
  businessDeep: { de: "/services/grundreinigung-gewerbe", en: "/services/deep-cleaning-business" },
  businessStaircase: { de: "/services/treppenhausreinigung", en: "/services/staircase-cleaning" },
  businessConstruction: { de: "/services/bauendreinigung-grobreinigung-gewerbe", en: "/services/construction-cleaning-business" },
  businessWindow: { de: "/services/glas-rahmenreinigung-gewerbe", en: "/services/window-cleaning-business" },
  businessIndustrial: { de: "/services/industriereinigung-maschinen-gewerbe", en: "/services/industrial-cleaning-business" },
  businessOneTime: { de: "/services/einmalreinigung-gewerbe", en: "/services/one-time-cleaning-business" },
  oneTimeCleaning: { de: "/services/einmalreinigung", en: "/services/one-time-cleaning" },
  permanentCleaning: { de: "/services/regelmaessige-reinigung", en: "/services/permanent-cleaning" },
  contact: { de: "/kontakt", en: "/contact" },
  jobOpening: { de: "/karriere", en: "/job-opening" },
  getPartners: { de: "/partner-werden", en: "/get-partners" },
  privacy: { de: "/datenschutz", en: "/privacy" },
  imprint: { de: "/impressum", en: "/imprint" },
  booking: { de: "/booking", en: "/booking" },
  order: { de: "/order/:id", en: "/order/:id" },
  search: { de: "/search", en: "/search" },
  profile: { de: "/profile", en: "/profile" },
  calculator: { de: "/calculator", en: "/calculator" },
  login: { de: "/login", en: "/login" },
  register: { de: "/register", en: "/register" },
  admin: { de: "/admin", en: "/admin" },
};

const legacyPathToKey = {
  "/": "home",
  "/landing-alt": "landingAlt",
  "/services": "servicesOverview",
  "/services/wien": "servicesWien",
  "/services/graz": "servicesGraz",
  "/services/office-cleaning": "officeCleaning",
  "/services/deep-cleaning": "deepCleaning",
  "/services/restaurant-cleaning": "restaurantCleaning",
  "/services/one-time-cleaning": "oneTimeCleaning",
  "/services/permanent-cleaning": "permanentCleaning",
  "/kontakt": "contact",
  "/contact": "contact",
  "/job-opening": "jobOpening",
  "/get-partners": "getPartners",
  "/privacy": "privacy",
  "/datenschutz": "privacy",
  "/imprint": "imprint",
  "/book": "booking",
  "/search": "search",
  "/profile": "profile",
  "/calculator": "calculator",
  "/login": "login",
  "/register": "register",
  "/admin": "admin",
};

function normalizePath(pathname) {
  if (!pathname) return "/";
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

function localize(locale, template) {
  const full = `/${locale}${template}`;
  return full.replace(/\/+/g, "/").replace(/\/$/, (template === "/" ? "/" : "")) || "/";
}

export function getLocaleFromPathname(pathname) {
  const normalized = normalizePath(pathname);
  if (normalized === "/en" || normalized.startsWith("/en/")) return "en";
  return "de";
}

export function getRouteKeyFromPathname(pathname) {
  const normalized = normalizePath(pathname);
  for (const [key, templates] of Object.entries(routeDefs)) {
    for (const locale of locales) {
      const pattern = localize(locale, templates[locale]);
      const match = matchPath({ path: pattern, end: true }, normalized);
      if (match) return { key, locale, params: match.params };
    }
  }

  const legacyKey = legacyPathToKey[normalized];
  if (legacyKey) return { key: legacyKey, locale: defaultLocale, params: {} };

  return null;
}

export function getLocalizedPath(locale, key, params = {}) {
  const template = routeDefs[key]?.[locale] || routeDefs[key]?.[defaultLocale];
  if (!template) return `/${locale}`;
  const rendered = generatePath(template, params);
  const prefixed = `/${locale}${rendered}`;
  return prefixed.replace(/\/+/g, "/").replace(/\/$/, (rendered === "/" ? "/" : "")) || "/";
}

export function getEquivalentPath(pathname, targetLocale) {
  const match = getRouteKeyFromPathname(pathname);
  if (!match) return getLocalizedPath(targetLocale, "home");
  return getLocalizedPath(targetLocale, match.key, match.params);
}

export function getLocalizedAlternates(pathname) {
  const match = getRouteKeyFromPathname(pathname);
  const key = match?.key || "home";
  const params = match?.params || {};
  return {
    de: getLocalizedPath("de", key, params),
    en: getLocalizedPath("en", key, params),
    xDefault: getLocalizedPath(defaultLocale, key, params),
  };
}

export function getLocalizedRouteDefinitions(locale) {
  return Object.entries(routeDefs).map(([key, templates]) => ({
    key,
    path: templates[locale],
  }));
}

export function getLegacyRedirects() {
  return Object.entries(legacyPathToKey).map(([path, key]) => ({ path, key }));
}
