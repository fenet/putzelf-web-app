import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Seo from "../components/Seo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import Navbar from "../components/Navbar";
import { getLocalizedAlternates, getLocalizedPath, getLocaleFromPathname } from "../lib/localeRoutes";

const copy = {
  de: {
    title: "Regelmäßige Reinigung",
    intro: "Wiederkehrende Reinigungspläne, abgestimmt auf Ihren Bedarf und Zeitplan.",
    optionsTitle: "Planoptionen",
    options: ["Wöchentliche Termine", "Zweiwöchentliche Termine", "Individuelle Frequenz und Teamgröße"],
    cta: "Angebot anfordern",
  },
  en: {
    title: "Permanent Cleaning",
    intro: "Recurring cleaning plans tailored to your needs and schedule.",
    optionsTitle: "Plan options",
    options: ["Weekly visits", "Bi-weekly visits", "Custom frequency and staffing"],
    cta: "Request an Offer",
  },
};

export default function PermanentCleaning() {
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);
  const c = copy[locale];
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-12">
      <Seo title={locale === "de" ? "Regelmäßige Reinigung – PutzELF" : "Permanent Cleaning – PutzELF"} description={c.intro} path={getLocalizedPath(locale, "permanentCleaning")} lang={locale} alternates={getLocalizedAlternates(location.pathname)} xDefaultPath={getLocalizedPath("de", "permanentCleaning")} />
      <div className="flex justify-end mb-4"><LanguageSwitcher compact /></div>
      <h1 className="text-3xl font-bold">{c.title}</h1>
      <p className="mt-4 text-slate-700">{c.intro}</p>

      <section className="mt-8 space-y-6">
        <div>
          <h2 className="text-xl font-semibold">{c.optionsTitle}</h2>
          <ul className="mt-2 list-disc pl-5 text-slate-600">
            {c.options.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        <div className="mt-4">
          <Link to={getLocalizedPath(locale, "getPartners")} className="inline-block rounded bg-[#0097b2] px-5 py-3 text-white font-semibold">{c.cta}</Link>
        </div>
      </section>
      </main>
    </>
  );
}
