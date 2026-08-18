import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import Navbar from "../components/Navbar";
import { getLocalizedAlternates, getLocalizedPath, getLocaleFromPathname } from "../lib/localeRoutes";
import { useLocation } from "react-router-dom";

const content = {
  de: {
    title: "Unsere Services",
    subtitle: "Entdecken Sie unsere Reinigungsleistungen für Unternehmen und Privatkunden. Wählen Sie eine Leistung, um Details zu sehen oder ein Angebot anzufordern.",
    cards: [
      { title: "Büroreinigung", desc: "Regelmäßige und tiefgehende Reinigung für Büros und Coworking-Flächen.", key: "officeCleaning" },
      { title: "Tiefenreinigung", desc: "Gründliche Einmalreinigung nach Renovierung oder für saisonale Anforderungen.", key: "deepCleaning" },
      { title: "Restaurantreinigung", desc: "Hygienefokussierte Reinigung für Küchen und Gästebereiche.", key: "restaurantCleaning" },
      { title: "Einmalreinigung", desc: "Einzeltermine für Wohnungen, Häuser oder Veranstaltungen.", key: "oneTimeCleaning" },
      { title: "Regelmäßige Reinigung", desc: "Laufende Reinigungspläne für private Haushalte und Betriebe.", key: "permanentCleaning" },
    ],
  },
  en: {
    title: "Our Services",
    subtitle: "Explore our business and private cleaning services. Choose a service to learn more and request an offer.",
    cards: [
      { title: "Office Cleaning", desc: "Regular and deep cleaning for offices and coworking spaces.", key: "officeCleaning" },
      { title: "Deep Cleaning", desc: "Thorough one-off deep cleans for post-renovation or seasonal needs.", key: "deepCleaning" },
      { title: "Restaurant Cleaning", desc: "Hygiene-focused cleaning for kitchens and guest areas.", key: "restaurantCleaning" },
      { title: "One-time Cleaning", desc: "Single visits for homes, flats or events.", key: "oneTimeCleaning" },
      { title: "Permanent Cleaning", desc: "Recurring plans for private households and businesses.", key: "permanentCleaning" },
    ],
  },
};

export default function ServicesOverview() {
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);
  const c = content[locale];
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-12">
      <Seo
        title={locale === "de" ? "Unsere Services – PutzELF" : "Our Services – PutzELF"}
        description={locale === "de" ? "Reinigungsservices für Unternehmen und Privatkunden bei PutzELF." : "Cleaning services for businesses and private customers at PutzELF."}
        path={getLocalizedPath(locale, "servicesOverview")}
        lang={locale}
        alternates={getLocalizedAlternates(location.pathname)}
        xDefaultPath={getLocalizedPath("de", "servicesOverview")}
      />
      <div className="flex justify-end mb-4"><LanguageSwitcher compact /></div>
      <h1 className="text-3xl font-bold">{c.title}</h1>
      <p className="mt-4 text-slate-700">{c.subtitle}</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {c.cards.map((card) => (
          <Link key={card.key} to={getLocalizedPath(locale, card.key)} className="rounded-xl border bg-white p-6 hover:shadow-lg">
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{card.desc}</p>
          </Link>
        ))}
      </div>
      </main>
    </>
  );
}
