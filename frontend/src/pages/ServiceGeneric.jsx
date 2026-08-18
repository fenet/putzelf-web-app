import React from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Seo from "../components/Seo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StructuredData from "../components/StructuredData";
import { getRouteKeyFromPathname, getLocalizedPath, getLocalizedAlternates, getLocaleFromPathname } from "../lib/localeRoutes";

export default function ServiceGeneric() {
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);
  const { t } = useTranslation();

  const match = getRouteKeyFromPathname(location.pathname);
  const key = match?.key || null;

  // Map route keys to translation path segments
  const translationMap = {
    // private
    privateMaintenance: ["services", "private", "maintenance"],
    privateDeep: ["services", "private", "deep"],
    privateResidential: ["services", "private", "residential"],
    privateConstruction: ["services", "private", "construction"],
    privateWindow: ["services", "private", "window"],
    privateIndustrial: ["services", "private", "industrial"],
    // business
    businessMaintenance: ["services", "business", "maintenance"],
    businessDeep: ["services", "business", "deep"],
    businessStaircase: ["services", "business", "staircase"],
    businessConstruction: ["services", "business", "construction"],
    businessWindow: ["services", "business", "window"],
    businessIndustrial: ["services", "business", "industrial"],
  };

  const pathSegments = translationMap[key] || ["services", "private", "maintenance"];
  const tBase = pathSegments.join(".");

  const title = t(`${tBase}.title`);
  const description = t(`${tBase}.description`);
  const features = t(`${tBase}.features`, { returnObjects: true }) || [];

  const canonical = getLocalizedPath(locale, key);
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const canonicalUrl = origin ? `${origin}${canonical}` : canonical;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description: description || undefined,
    provider: {
      "@type": "LocalBusiness",
      name: "PutzELF",
      url: origin || undefined,
    },
    url: canonicalUrl,
    inLanguage: locale,
  };

  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Seo title={`${title} – PutzELF`} description={description} path={canonical} lang={locale} alternates={getLocalizedAlternates(location.pathname)} xDefaultPath={getLocalizedPath("de", key)} />

        <div className="flex justify-end mb-4" />
        <h1 className="text-3xl font-bold">{title}</h1>
        {description ? <p className="mt-4 text-slate-700">{description}</p> : null}

        <section className="mt-8">
          <h2 className="text-xl font-semibold">{t("services.whatWeOffer", { defaultValue: locale === "de" ? "Was wir anbieten" : "What we offer" })}</h2>
          <ul className="mt-2 list-disc pl-5 text-slate-600">
            {Array.isArray(features) ? features.map((f) => <li key={f}>{f}</li>) : null}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">{t("services.benefitsTitle", { defaultValue: locale === "de" ? "Vorteile" : "Benefits" })}</h2>
          <ul className="mt-2 list-disc pl-5 text-slate-600">
            <li>{t("services.benefit1", { defaultValue: locale === "de" ? "Geprüfte Reinigungskräfte" : "Vetted cleaning professionals" })}</li>
            <li>{t("services.benefit2", { defaultValue: locale === "de" ? "Flexible Terminplanung" : "Flexible scheduling" })}</li>
            <li>{t("services.benefit3", { defaultValue: locale === "de" ? "Transparente Preise" : "Transparent pricing" })}</li>
          </ul>
        </section>

        <div className="mt-8">
          <a href={getLocalizedPath(locale, "booking")} className="inline-block rounded bg-[#0097b2] px-5 py-3 text-white font-semibold">{t("services.cta", { defaultValue: locale === "de" ? "Angebot anfordern" : "Request an Offer" })}</a>
        </div>
      </main>

      <StructuredData json={serviceJsonLd} id={`service-jsonld-${key || "unknown"}`} />

      <Footer />
    </>
  );
}
