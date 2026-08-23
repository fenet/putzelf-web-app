import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Seo from "../components/Seo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import Navbar from "../components/Navbar";
import GoogleReviewsCarousel from "../components/GoogleReviewsCarousel";
import { getLocalizedAlternates, getLocalizedPath, getLocaleFromPathname } from "../lib/localeRoutes";

const copy = {
  de: {
    title: "Einmalreinigung",
    intro: "Flexible Einmalreinigung für Wohnungen, Häuser, Events oder besondere Anlässe.",
    metaTitle: "Einmalreinigung Wien | Flexible Reinigung für Events & Wohnungen – PutzELF",
    metaDescription: "Einmalreinigung in Wien: individuelle Reinigungsbesuche für Events, Umzüge oder saisonale Reinigung. Angebot nach Bedarf.",
    includesTitle: "Worum es geht",
    body: "Maßgeschneiderter Besuch mit Fokus auf die Bereiche, die Ihnen wichtig sind. Ideal für Frühjahrsputz oder Event-Vorbereitung.",
    cta: "Angebot anfordern",
  },
  en: {
    title: "One-time Cleaning",
    intro: "Flexible one-off cleaning for homes, events or special occasions.",
    metaTitle: "One-time Cleaning Vienna | Event & Move Cleaning – PutzELF",
    metaDescription: "One-time cleaning in Vienna for events, move-in/out and seasonal deep cleans. Tailored visits and transparent quotes.",
    includesTitle: "What it includes",
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
      <Seo title={c.metaTitle || `${c.title} – PutzELF`} description={c.metaDescription || c.intro} path={getLocalizedPath(locale, "oneTimeCleaning")} lang={locale} alternates={getLocalizedAlternates(location.pathname)} xDefaultPath={getLocalizedPath("de", "oneTimeCleaning")} />
      <div className="flex justify-end mb-4"><LanguageSwitcher compact /></div>
      <h1 className="text-3xl font-bold">{c.title} {locale === 'de' ? 'Wien' : 'Vienna'}</h1>
      <p className="mt-4 text-slate-700">{c.intro}</p>

      <div className="mt-6">
        <div className="w-full h-56 bg-slate-100 border border-dashed border-slate-200 rounded flex items-center justify-center text-slate-500">[IMAGE PLACEHOLDER: {c.title}]</div>
      </div>

      <section className="mt-8 space-y-6">
        <div>
          <h2 className="text-xl font-semibold">{c.includesTitle}</h2>
          <p className="mt-2 text-slate-600">{c.body}</p>
        </div>

        <div className="mt-10">
          <GoogleReviewsCarousel />
        </div>

        <div className="mt-4">
          <Link to={getLocalizedPath(locale, "getPartners")} className="inline-block rounded bg-[#0097b2] px-5 py-3 text-white font-semibold">{c.cta}</Link>
        </div>
      </section>
      </main>
    </>
  );
}
