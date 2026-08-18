// src/pages/Search.jsx
import Seo from "../components/Seo";
import { useLocation } from "react-router-dom";
import { getLocalizedAlternates, getLocalizedPath, getLocaleFromPathname } from "../lib/localeRoutes";

export default function Search() {
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);
  return (
    <div className="text-center py-20">
      <Seo title={locale === "de" ? "Suche" : "Search"} description={locale === "de" ? "Suche" : "Search"} path={getLocalizedPath(locale, "search")} lang={locale} alternates={getLocalizedAlternates(location.pathname)} xDefaultPath={getLocalizedPath("de", "search")} noindex />
      <h1 className="text-3xl font-bold text-gray-800">{locale === "de" ? "Suche" : "Search"}</h1>
      <p className="text-gray-600 mt-4">{locale === "de" ? "Hier wird später die Suche verfügbar sein." : "Search will be available here soon."}</p>
    </div>
  );
}
