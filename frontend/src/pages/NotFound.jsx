import React from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Seo from "../components/Seo";
import {
  getLocalizedPath,
  getLocalizedAlternates,
  getLocaleFromPathname,
} from "../lib/localeRoutes";

const copy = {
  de: {
    title: "Ups! Hier ist nichts zu putzen. 🧹",
    message:
      "Diese Seite hat sich wohl irgendwo versteckt. Aber keine Sorge – wir bringen dich wieder zurück.",
    home: "Zur Startseite",
    back: "Oder starte deine Suche neu",
  },
  en: {
    title: "Oops! Nothing to clean here. 🧹",
    message:
      "Looks like this page has gone missing. Don't worry – we'll get you back on track.",
    home: "Back to home",
    back: "Or start your search again",
  },
};

export default function NotFound() {
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);
  const c = copy[locale] || copy.de;

  return (
    <>
      <Navbar />

      <Seo
        title={`${c.title} – PutzELF`}
        description={c.message}
        path={getLocalizedPath(locale, "home")}
        lang={locale}
        alternates={getLocalizedAlternates(location.pathname)}
        xDefaultPath={getLocalizedPath("de", "home")}
      />

      <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-16 bg-gradient-to-b from-white via-slate-50 to-[#eaf9fc]">
        <div className="max-w-2xl w-full text-center">

          {/* Fun illustration */}
          <div className="relative mx-auto mb-8 w-48 h-48 flex items-center justify-center">

            {/* Soft circle */}
            <div className="absolute inset-0 rounded-full bg-[#dff6fa]" />

            {/* 404 */}
            <div className="relative z-10">
              <div className="text-6xl font-black tracking-tight text-[#0097b2]">
                404
              </div>

              {/* Small sparkle */}
              <span className="absolute -top-5 -right-7 text-2xl animate-bounce">
                ✨
              </span>

              {/* Cleaning bubbles */}
              <span className="absolute -bottom-3 -left-8 text-xl">
                🫧
              </span>
            </div>

            {/* Floating sponge */}
            <div className="absolute -right-2 top-5 text-4xl rotate-12">
              🧽
            </div>

            {/* Broom */}
            <div className="absolute -left-3 bottom-3 text-4xl -rotate-12">
              🧹
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            {c.title}
          </h1>

          <p className="text-lg text-slate-600 max-w-lg mx-auto leading-relaxed mb-8">
            {c.message}
          </p>

          <Link
            to={getLocalizedPath(locale, "home")}
            className="inline-flex items-center gap-2 bg-[#0097b2] hover:bg-[#007f96] text-white font-semibold px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
          >
            <span>←</span>
            {c.home}
          </Link>

          <p className="mt-6 text-sm text-slate-500">
            {c.back}
          </p>

        </div>
      </main>
    </>
  );
}