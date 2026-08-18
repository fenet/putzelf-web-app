import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Seo from "../components/Seo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import Navbar from "../components/Navbar";
import { getLocalizedAlternates, getLocalizedPath, getLocaleFromPathname } from "../lib/localeRoutes";

const copy = {
  de: {
    title: "Einmalreinigung",
    intro: "Flexible Einmalreinigung für Wohnungen, Häuser, Events oder besondere Anlässe.",
    body: "Maßgeschneiderter Besuch mit Fokus auf die Bereiche, die Ihnen wichtig sind. Ideal für Frühjahrsputz oder Event-Vorbereitung.",
    cta: "Angebot anfordern",
  },
  en: {
    title: "One-time Cleaning",
    intro: "Flexible one-off cleaning for homes, events or special occasions.",
    body: "Tailored visits focused on the areas that matter most to you. Ideal for spring cleaning or event prep.",
    cta: "Request an Offer",
  },
};

export default function OneTimeCleaning() {
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);
  const c = copy[locale];
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-12">
      <Seo title={locale === "de" ? "Einmalreinigung – PutzELF" : "One-time Cleaning – PutzELF"} description={c.intro} path={getLocalizedPath(locale, "oneTimeCleaning")} lang={locale} alternates={getLocalizedAlternates(location.pathname)} xDefaultPath={getLocalizedPath("de", "oneTimeCleaning")} />
      <div className="flex justify-end mb-4"><LanguageSwitcher compact /></div>
      <h1 className="text-3xl font-bold">{c.title}</h1>
      <p className="mt-4 text-slate-700">{c.intro}</p>

      <section className="mt-8 space-y-6">
        <div>
          <h2 className="text-xl font-semibold">{locale === "de" ? "Worum es geht" : "What it includes"}</h2>
          <p className="mt-2 text-slate-600">{c.body}</p>
        </div>

        <div className="mt-4">
          <Link to={getLocalizedPath(locale, "getPartners")} className="inline-block rounded bg-[#0097b2] px-5 py-3 text-white font-semibold">{c.cta}</Link>
        </div>
      </section>
      </main>
    </>
  );
}
