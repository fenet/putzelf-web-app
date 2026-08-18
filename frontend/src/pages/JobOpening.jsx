import React from "react";
import { useLocation } from "react-router-dom";
import Seo from "../components/Seo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import Navbar from "../components/Navbar";
import { getLocalizedAlternates, getLocalizedPath, getLocaleFromPathname } from "../lib/localeRoutes";

const copy = {
  de: {
    title: "Aktuelle Jobangebote",
    description: "Offene Stellen bei PutzELF: Call Center Agents, Reinigungskräfte in Graz und mehr.",
    roles: [
      {
        title: "Call Center Agents",
        body: "Bearbeitung von Kundenanfragen, Terminvereinbarungen und Unterstützung unseres Buchungsprozesses. Gute Deutschkenntnisse und freundliches Auftreten erforderlich.",
        subject: "Bewerbung - Call Center",
        cta: "Bewerben / Kontakt",
      },
      {
        title: "Reinigungskräfte - Graz",
        body: "Wir suchen Reinigungskräfte in Graz. Erfahrung von Vorteil, aber nicht erforderlich. Flexible Arbeitszeiten und faire Bezahlung.",
        subject: "Bewerbung - Reinigung Graz",
        cta: "Bewerben / Kontakt",
      },
    ],
  },
  en: {
    title: "Current Job Openings",
    description: "Open roles at PutzELF: call center agents, cleaners in Graz and more.",
    roles: [
      {
        title: "Call Center Agents",
        body: "Handling customer inquiries, scheduling appointments, and supporting our booking process. Good German skills and a friendly attitude are required.",
        subject: "Application - Call Center",
        cta: "Apply / Contact",
      },
      {
        title: "Cleaners - Graz",
        body: "We are looking for cleaners in Graz. Experience is a plus, but not required. Flexible hours and fair pay.",
        subject: "Application - Cleaner Graz",
        cta: "Apply / Contact",
      },
    ],
  },
};

export default function JobOpening() {
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);
  const c = copy[locale];
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <Seo
        title={locale === "de" ? "Jobangebote – PutzELF" : "Job Openings – PutzELF"}
        description={c.description}
        path={getLocalizedPath(locale, "jobOpening")}
        lang={locale}
        alternates={getLocalizedAlternates(location.pathname)}
        xDefaultPath={getLocalizedPath("de", "jobOpening")}
      />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex justify-end mb-4"><LanguageSwitcher compact /></div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{c.title}</h1>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold">{c.roles[0].title}</h2>
          <p className="text-gray-600 mt-2">{c.roles[0].body}</p>
          <div className="mt-4">
            <a href={`mailto:office@putzelf.com?subject=${encodeURIComponent(c.roles[0].subject)}`} className="inline-block bg-[#0097b2] text-white px-4 py-2 rounded-md">{c.roles[0].cta}</a>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">{c.roles[1].title}</h2>
          <p className="text-gray-600 mt-2">{c.roles[1].body}</p>
          <div className="mt-4">
            <a href={`mailto:office@putzelf.com?subject=${encodeURIComponent(c.roles[1].subject)}`} className="inline-block bg-[#0097b2] text-white px-4 py-2 rounded-md">{c.roles[1].cta}</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
