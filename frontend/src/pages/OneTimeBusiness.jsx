import React from "react";
import { Link, useLocation } from "react-router-dom";
import Seo from "../components/Seo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { getLocalizedAlternates, getLocalizedPath, getLocaleFromPathname } from "../lib/localeRoutes";

const copy = {
  de: {
    title: "Einmalreinigung (Gewerbe)",
    intro: "Professionelle Einmalreinigung für Geschäftsräume — schnell, diskret und effizient.",
    body: "Einsatz bei Events, Ladenumbauten oder punktuellen Reinigungsanforderungen in gewerblichen Objekten.",
    cta: "Angebot anfordern",
  },
  en: {
    title: "One-time Cleaning (Business)",
    intro: "Professional one-off cleaning for business premises — fast, discreet and efficient.",
    body: "Service for events, shop refits or targeted cleaning needs in commercial properties.",
    cta: "Request an Offer",
  },
};

export default function OneTimeBusiness() {
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);
  const c = copy[locale] || copy.de;

  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Seo title={`${c.title} – PutzELF`} description={c.intro} path={getLocalizedPath(locale, "businessOneTime")} lang={locale} alternates={getLocalizedAlternates(location.pathname)} xDefaultPath={getLocalizedPath("de", "businessOneTime")} />

        <div className="flex justify-end mb-4"><LanguageSwitcher compact /></div>

        <h1 className="text-3xl font-bold">{c.title}</h1>
        <p className="mt-4 text-slate-700">{c.intro}</p>

        <section className="mt-8 space-y-6">
          <div>
            <h2 className="text-xl font-semibold">{locale === "de" ? "Worum es geht" : "What it includes"}</h2>
            <p className="mt-2 text-slate-600">{c.body}</p>
          </div>

          <div className="mt-4">
            <Link to={getLocalizedPath(locale, "booking")} className="inline-block rounded bg-[#0097b2] px-5 py-3 text-white font-semibold">{c.cta}</Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
