import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Seo from "../components/Seo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import Navbar from "../components/Navbar";
import { getLocalizedAlternates, getLocalizedPath, getLocaleFromPathname } from "../lib/localeRoutes";

const copy = {
  de: {
    title: "Büroreinigung",
    intro: "Professionelle Büroreinigung für saubere, repräsentative und produktive Arbeitsplätze.",
    includeTitle: "Was enthalten ist",
    include: ["Reinigung und Desinfektion von Tischen und Oberflächen", "Reinigung von Besprechungsräumen", "Küche und Pausenbereiche", "Müllentsorgung und Recycling", "Regelmäßige Tiefenpflege nach Plan"],
    suitableTitle: "Geeignet für",
    suitable: "Kleine und mittlere Büros, Coworking-Spaces und professionelle Dienstleister.",
    frequencyTitle: "Rhythmus und Optionen",
    frequency: "Einmalig, wöchentlich, zweiwöchentlich oder monatlich. Individuelle Pläne sind möglich.",
    whyTitle: "Warum PutzELF",
    why: "Geprüfte Teams, klare Checklisten, verlässliche Termine und transparente Preise.",
    areaTitle: "Einsatzgebiet",
    area: "Verfügbar in Wien und Graz. Verfügbarkeit bitte bei der Buchung prüfen.",
    cta: "Angebot anfordern",
  },
  en: {
    title: "Office Cleaning",
    intro: "Professional office cleaning for clean, presentable and productive workplaces.",
    includeTitle: "What we include",
    include: ["Desk and surface cleaning and disinfection", "Meeting room cleaning", "Kitchen and break areas", "Trash removal and recycling", "Scheduled deep-care maintenance"],
    suitableTitle: "Suitable for",
    suitable: "Small and mid-sized offices, coworking spaces, and professional service firms.",
    frequencyTitle: "Frequency & options",
    frequency: "One-time, weekly, bi-weekly or monthly. Custom plans are available.",
    whyTitle: "Why PutzELF",
    why: "Vetted teams, clear checklists, reliable scheduling and transparent pricing.",
    areaTitle: "Service area",
    area: "Available in Vienna and Graz. Please confirm availability during booking.",
    cta: "Request an Offer",
  },
};

export default function OfficeCleaning() {
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);
  const c = copy[locale];
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-12">
      <Seo title={locale === "de" ? "Büroreinigung – PutzELF" : "Office Cleaning – PutzELF"} description={c.intro} path={getLocalizedPath(locale, "officeCleaning")} lang={locale} alternates={getLocalizedAlternates(location.pathname)} xDefaultPath={getLocalizedPath("de", "officeCleaning")} />
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

        <div>
          <h2 className="text-xl font-semibold">{c.frequencyTitle}</h2>
          <p className="mt-2 text-slate-600">{c.frequency}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{c.whyTitle}</h2>
          <p className="mt-2 text-slate-600">{c.why}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{c.areaTitle}</h2>
          <p className="mt-2 text-slate-600">{c.area}</p>
        </div>

        <div className="mt-4">
          <Link to={getLocalizedPath(locale, "getPartners")} className="inline-block rounded bg-[#0097b2] px-5 py-3 text-white font-semibold">{c.cta}</Link>
        </div>
      </section>
      </main>
    </>
  );
}
