import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Seo from "../components/Seo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import Navbar from "../components/Navbar";
import { getLocalizedAlternates, getLocalizedPath, getLocaleFromPathname } from "../lib/localeRoutes";

const copy = {
  de: {
    title: "Restaurantreinigung",
    intro: "Hygienefokussierte Reinigung für Küchen, Servicebereiche und Gasträume.",
    includeTitle: "Was enthalten ist",
    include: ["Entfettung und Reinigung der Küche", "Reinigung von Speise- und Gästebereichen", "Abfallmanagement und fachgerechte Entsorgung", "Hygiene-Checkliste und Unterstützung bei Abläufen"],
    suitableTitle: "Geeignet für",
    suitable: "Kleine Restaurants, Cafés, Bars und Catering-Küchen.",
    cta: "Angebot anfordern",
  },
  en: {
    title: "Restaurant Cleaning",
    intro: "Hygiene-focused cleaning for kitchens, service areas and guest rooms.",
    includeTitle: "What we include",
    include: ["Kitchen degreasing and sanitation", "Dining and guest area cleaning", "Waste handling and proper disposal", "Hygiene checklist and process support"],
    suitableTitle: "Suitable for",
    suitable: "Small restaurants, cafes, bars and catering kitchens.",
    cta: "Request an Offer",
  },
};

export default function RestaurantCleaning() {
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);
  const c = copy[locale];
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-12">
      <Seo title={locale === "de" ? "Restaurantreinigung – PutzELF" : "Restaurant Cleaning – PutzELF"} description={c.intro} path={getLocalizedPath(locale, "restaurantCleaning")} lang={locale} alternates={getLocalizedAlternates(location.pathname)} xDefaultPath={getLocalizedPath("de", "restaurantCleaning")} />
      <div className="flex justify-end mb-4"><LanguageSwitcher compact /></div>
      <h1 className="text-3xl font-bold">{c.title}</h1>
      <p className="mt-4 text-slate-700">{c.intro}</p>

      <section className="mt-8 space-y-6">
        <div>
          <h2 className="text-xl font-semibold">{c.includeTitle}</h2>
          <ul className="mt-2 list-disc pl-5 text-slate-600">
            {c.include.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{c.suitableTitle}</h2>
          <p className="mt-2 text-slate-600">{c.suitable}</p>
        </div>

        <div className="mt-4">
          <Link to={getLocalizedPath(locale, "getPartners")} className="inline-block rounded bg-[#0097b2] px-5 py-3 text-white font-semibold">{c.cta}</Link>
        </div>
      </section>
      </main>
    </>
  );
}
