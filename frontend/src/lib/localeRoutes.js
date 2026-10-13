import { generatePath, matchPath } from "react-router-dom";
import { locales, routeRegistry } from "../data/routeRegistry.mjs";

export { locales };
export const defaultLocale = "de";

const routeDefs = routeRegistry;

const legacyPathToKey = {
  "/": "home",
  "/landing-alt": "landingAlt",
  "/services": "servicesOverview",
  
  
  
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
  "/blog": "blog",
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
