import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Seo from "../components/Seo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import Navbar from "../components/Navbar";
import { getLocalizedAlternates, getLocalizedPath, getLocaleFromPathname } from "../lib/localeRoutes";

const copy = {
  de: {
    title: "Tiefenreinigung",
    intro: "Gründliche Tiefenreinigung für Büros, Wohnungen und Gewerbeflächen.",
    pointsTitle: "Was enthalten ist",
    points: ["Entfernung von Staub an schwer erreichbaren Stellen", "Intensivreinigung von Küche und Sanitärbereichen", "Teppich- und Fleckenbehandlung", "Desinfektion von Kontaktflächen"],
    whenTitle: "Wann sinnvoll",
    when: "Nach Renovierungen, vor Ein- oder Auszug oder saisonal für einen gründlichen Neustart.",
    pricingTitle: "Buchung & Preis",
    pricing: "Der Preis hängt von Größe und Umfang ab. Fotos oder ein Vor-Ort-Termin helfen bei einem genauen Angebot.",
    cta: "Angebot anfordern",
  },
  en: {
    title: "Deep Cleaning",
    intro: "Thorough deep cleaning for offices, homes and commercial spaces.",
    pointsTitle: "What we include",
    points: ["Removal of dust from hard-to-reach areas", "Intensive kitchen and sanitation cleaning", "Carpet and stain treatment", "Disinfection of high-touch surfaces"],
    whenTitle: "When to choose it",
    when: "After renovations, before move-ins/outs, or seasonally for a fresh reset.",
    pricingTitle: "Booking & pricing",
    pricing: "Pricing depends on size and scope. Photos or an on-site visit help us provide an accurate quote.",
    cta: "Request an Offer",
  },
};

export default function DeepCleaning() {
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);
  const c = copy[locale];
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-12">
      <Seo title={locale === "de" ? "Tiefenreinigung – PutzELF" : "Deep Cleaning – PutzELF"} description={c.intro} path={getLocalizedPath(locale, "deepCleaning")} lang={locale} alternates={getLocalizedAlternates(location.pathname)} xDefaultPath={getLocalizedPath("de", "deepCleaning")} />
      
      <h1 className="text-3xl font-bold">{c.title}</h1>
      <p className="mt-4 text-slate-700">{c.intro}</p>

      <section className="mt-8 space-y-6">
        <div>
          <h2 className="text-xl font-semibold">{c.pointsTitle}</h2>
          <ul className="mt-2 list-disc pl-5 text-slate-600">
            {c.points.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{c.whenTitle}</h2>
          <p className="mt-2 text-slate-600">{c.when}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{c.pricingTitle}</h2>
          <p className="mt-2 text-slate-600">{c.pricing}</p>
        </div>

        <div className="mt-4">
          <Link to={getLocalizedPath(locale, "getPartners")} className="inline-block rounded bg-[#0097b2] px-5 py-3 text-white font-semibold">{c.cta}</Link>
        </div>
      </section>
      </main>
    </>
  );
}
