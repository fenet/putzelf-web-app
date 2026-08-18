import React from "react";
import { useLocation } from "react-router-dom";
import Seo from "../components/Seo";
import ServiceCard from "../components/ServiceCard";
import LanguageSwitcher from "../components/LanguageSwitcher";
import Navbar from "../components/Navbar";
import { getLocalizedAlternates, getLocalizedPath, getLocaleFromPathname } from "../lib/localeRoutes";
import { serviceCatalog } from "../data/servicesData";
import StructuredData from "../components/StructuredData";

export default function ServicesGraz() {
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);
  const services = serviceCatalog[locale].graz;
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  const serviceJsonLd = services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.desc,
    provider: {
      "@type": "LocalBusiness",
      name: "PutzELF",
      url: origin || undefined,
    },
  }));
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <Seo
        title={locale === "de" ? "Reinigungsservices Graz – PutzELF" : "Cleaning Services Graz – PutzELF"}
        description={locale === "de" ? "Unsere Reinigungsdienstleistungen in Graz: Haushalt, Wohnung, Büro und Gastronomie." : "Our cleaning services in Graz: home, apartment, office and hospitality."}
        path={getLocalizedPath(locale, "servicesGraz")}
        lang={locale}
        alternates={getLocalizedAlternates(location.pathname)}
        xDefaultPath={getLocalizedPath("de", "servicesGraz")}
      />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-end mb-4"><LanguageSwitcher compact /></div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{locale === "de" ? "Unsere Services in Graz" : "Our Services in Graz"}</h1>
        <p className="text-gray-600 mb-8">{locale === "de" ? "Lokal verfügbar in Graz – vereinbaren Sie Ihren Termin vor Ort." : "Available locally in Graz — book your appointment on site."}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.slug} id={s.slug} title={s.title} desc={s.desc} ctaText={locale === "de" ? "Angebot anfordern" : "Request an Offer"} />
          ))}
        </div>
      </main>
      {/* Structured data for services displayed on this page (only Service objects) */}
      <StructuredData json={serviceJsonLd} id="services-graz-jsonld" />
    </div>
  );
}
