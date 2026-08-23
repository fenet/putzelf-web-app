import React from "react";
import { Link, useLocation } from "react-router-dom";
import Seo from "../components/Seo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { getLocalizedAlternates, getLocalizedPath, getLocaleFromPathname } from "../lib/localeRoutes";

const copy = {
  de: {
    title: "Einmalreinigung (Privat)",
    intro: "Flexible Einmalreinigung für Privathaushalte — ideal für Frühjahrsputz oder besondere Anlässe.",
    body: "Einzelbesuch mit Fokus auf die Bereiche, die Ihnen am wichtigsten sind: Küche, Bad, Fenster und mehr.",
    includesTitle: "Worum es geht",
    cta: "Angebot anfordern",
  },
  en: {
    title: "One-time Cleaning (Private)",
    intro: "Flexible one-off cleaning for private homes — ideal for spring cleaning or special occasions.",
    body: "Tailored visits focusing on the areas that matter most to you: kitchen, bathroom, windows and more.",
    includesTitle: "What it includes",
    cta: "Request an Offer",
  },
};

export default function OneTimePrivate() {
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);
  const c = copy[locale] || copy.de;

  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Seo title={`${c.title} – PutzELF`} description={c.intro} path={getLocalizedPath(locale, "privateOneTime")} lang={locale} alternates={getLocalizedAlternates(location.pathname)} xDefaultPath={getLocalizedPath("de", "privateOneTime")} />

        <div className="flex justify-end mb-4"><LanguageSwitcher compact /></div>

        <h1 className="text-3xl font-bold">{c.title}</h1>
        <p className="mt-4 text-slate-700">{c.intro}</p>

        <section className="mt-8 space-y-6">
          <div>
            <h2 className="text-xl font-semibold">{c.includesTitle}</h2>
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
