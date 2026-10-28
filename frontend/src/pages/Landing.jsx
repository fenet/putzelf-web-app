import { useState, useEffect } from "react";
import { trackEvent } from "../lib/analytics";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, Instagram, Facebook, Linkedin, UserCheck, DollarSign, CalendarDays } from "lucide-react";
import logo from "../assets/logo.png";
import cover from "../assets/cover.svg";
import homeImg from "../assets/home.jpg";
import officeImg from "../assets/office.jpg";
import Seo from "../components/Seo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import Footer from "../components/Footer";
import { getLocalizedAlternates, getLocalizedPath, getLocaleFromPathname } from "../lib/localeRoutes";
// Cookie consent is centralized in CookieConsent component / lib/consent

export default function Landing() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);
  const seoTitle = locale === "de"
    ? "Reinigungsfirma Wien & Graz – Putzfrau & Reinigungskraft buchen"
    : "Cleaning Company Vienna & Graz – Book a Cleaner Online";
  const seoDescription = locale === "de"
    ? "Reinigung in Wien und Graz: Putzfrau und Reinigungskraft online buchen – für Haushalt und Büro."
    : "Cleaning in Vienna and Graz: book a cleaner online for home or office cleaning with flexible scheduling.";

  // Cookie consent is handled globally by `CookieConsent` mounted in App.jsx

  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0">
            <Seo
              title={seoTitle}
              to={getLocalizedPath(locale, "booking")}
              description={seoDescription}
              path={getLocalizedPath(locale, "landingAlt")}
              lang={locale}
              alternates={getLocalizedAlternates(location.pathname)}
              xDefaultPath={getLocalizedPath("de", "landingAlt")}
            />
      <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-3 md:space-x-6 min-w-0">
            <img src={logo} alt={t("alt.logo")} className="h-12 md:h-20 w-auto shrink-0" />
            <a
              href="tel:+436766300167"
              className="flex flex-col items-center text-[#0097b2] font-semibold hover:underline"
              aria-label="Call us"
              onClick={() => trackEvent("Contact_Phone_Click", { contact_method: "phone", source: "navbar" })}
            >
              <Phone size={24} className="mb-0.5 md:mb-1 md:size-[32px]" />
              <span className="hidden md:inline text-base text-gray-700">+43 676 6300167</span>
            </a>
            <a
              href="mailto:office@putzelf.com"
              className="flex flex-col items-center text-[#5be3e3] font-semibold hover:underline"
              aria-label="Email us"
              onClick={() => trackEvent("Contact_Email_Click", { contact_method: "email", source: "navbar" })}
            >
              <Mail size={24} className="mb-0.5 md:mb-1 md:size-[32px]" />
              <span className="hidden md:inline text-base text-gray-700">office@putzelf.com</span>
            </a>
          </div>

          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <Link
              to={getLocalizedPath(locale, "booking")}
              className="hidden md:block bg-[#0097b2] text-white px-4 py-2 md:px-6 md:py-3 rounded-lg text-sm md:text-lg font-semibold shadow-md animate-pulse-button whitespace-nowrap"
              onClick={() => trackEvent("Navbar_Book_Click", { source: "navbar_desktop" })}
            >
              {t("nav.bookNow")}
            </Link>
            <LanguageSwitcher compact />
          </div>

          <div className="w-full flex justify-center mt-2 md:hidden">
            <Link
              to={getLocalizedPath(locale, "booking")}
              className="bg-[#0097b2] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md animate-pulse-button whitespace-nowrap"
              onClick={() => trackEvent("Navbar_Book_Click", { source: "navbar_mobile" })}
            >
              {t("nav.bookNow")}
            </Link>
          </div>
        </div>
      </nav>

      <section className="flex flex-col items-center justify-center text-center px-6 pt-32 md:pt-40 pb-24 bg-gray-50">
        <h1 className="text-4xl md:text-6xl font-bold text-[#000000] mb-6">
          {i18n.language?.startsWith("de") ? (
            <>
              Professionelle Reinigung:
              <br />
              Putzfrau in Wien oder Graz gesucht? PutzELF gefunden
            </>
          ) : (
            t("hero.title")
          )}
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mb-8">{t("hero.subtitle")}</p>
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to={getLocalizedPath(locale, "booking")}
              className="bg-[#0097b2] text-white px-10 py-4 rounded-xl text-xl font-semibold hover:shadow-lg hover:scale-105 transition"
              onClick={() => trackEvent("Landing_CTA_Click", { cta: "hero_book_here" })}
            >
              {t("hero.cta")}
            </Link>
            <Link
              to={getLocalizedPath(locale, "order", { id: "request" })}
              className="px-10 py-4 rounded-xl text-xl font-semibold bg-gradient-to-r from-[#facc15] via-[#f97316] to-[#fb923c] text-black shadow-md hover:shadow-lg hover:scale-105 transition"
              onClick={() => trackEvent("Landing_Job_CTA_Click", { cta: "hero_offer_request" })}
            >
              {t("home.flow.inquiry")}
            </Link>
          </div>
        </div>
      </section>

      <section
        className="relative h-[70vh] bg-fixed bg-center bg-cover"
        style={{ backgroundImage: `url(${cover})` }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 space-y-12">
        <div className="grid sm:grid-cols-3 gap-8">
          <Link
            to={getLocalizedPath(locale, "privateMaintenance")}
            className="bg-gradient-to-r from-[#5be3e3] to-[#0097b2] text-black font-semibold rounded-2xl p-8 text-center hover:scale-105 hover:shadow-xl transition"
            onClick={() => trackEvent("Service_Standard_Click", { service_type: "Standard", source: "landing_grid" })}
          >
            <h4 className="text-2xl font-bold mb-2">{t("services.standard.title")}</h4>
            <p>{t("services.standard.desc")}</p>
          </Link>
          <Link
            to={getLocalizedPath(locale, "privateDeep")}
            className="bg-gradient-to-r from-[#48c6ef] to-[#006994] text-white font-semibold rounded-2xl p-8 text-center hover:scale-105 hover:shadow-xl transition"
            onClick={() => trackEvent("Service_Deep_Click", { service_type: "Deep", source: "landing_grid" })}
          >
            <h4 className="text-2xl font-bold mb-2">{t("services.deep.title")}</h4>
            <p>{t("services.deep.desc")}</p>
          </Link>
          <Link
            to={getLocalizedPath(locale, "businessMaintenance")}
            className="bg-gradient-to-r from-[#3acfd5] to-[#3a7bd5] text-black font-semibold rounded-2xl p-8 text-center hover:scale-105 hover:shadow-xl transition"
            onClick={() => trackEvent("Service_Office_Click", { service_type: "Office", source: "landing_grid" })}
          >
            <h4 className="text-2xl font-bold mb-2">{t("services.office.title")}</h4>
            <p>{t("services.office.desc")}</p>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition flex flex-col items-center">
            <UserCheck size={48} className="text-[#5be3e3] mb-4" />
            <h3 className="text-xl font-bold text-[#000000] mb-2">{t("services.reliable")}</h3>
            <p className="text-gray-600">{t("services.reliableLine")}</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition flex flex-col items-center">
            <DollarSign size={48} className="text-[#0097b2] mb-4" />
            <h3 className="text-xl font-bold text-[#000000] mb-2">{t("services.pricing")}</h3>
            <p className="text-gray-600">{t("services.pricingLine")}</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition flex flex-col items-center">
            <CalendarDays size={48} className="text-[#f59e0b] mb-4" />
            <h3 className="text-xl font-bold text-[#000000] mb-2">{t("services.schedule")}</h3>
            <p className="text-gray-600">{t("services.scheduleLine")}</p>
          </div>
        </div>
      </section>

        <Footer />

      {/* Cookie consent is centralized in `CookieConsent` (mounted in App.jsx) */}
    </div>
  );
}
