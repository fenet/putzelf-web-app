import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react";

import { trackEvent } from "../lib/analytics";
import Seo from "../components/Seo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  getLocalizedAlternates,
  getLocalizedPath,
  getLocaleFromPathname,
} from "../lib/localeRoutes";

export default function Imprint() {
  const { t } = useTranslation();
  const location = useLocation();

  const locale = getLocaleFromPathname(location.pathname);

  useEffect(() => {
    // Ensure navigation lands at the top
    try {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    } catch (_) {
      window.scrollTo(0, 0);
    }
  }, []);

  // Cookie consent is handled globally by `CookieConsent` mounted in App.jsx

  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0 bg-gray-50">

      {/* =========================================================
          SEO
      ========================================================== */}
      <Seo
        title={t("imprint.title")}
        description={t("imprint.seoDescription")}
        path={getLocalizedPath(locale, "imprint")}
        lang={locale}
        alternates={getLocalizedAlternates(location.pathname)}
        xDefaultPath={getLocalizedPath("de", "imprint")}
      />

      {/* =========================================================
          SHARED NAVBAR
      ========================================================== */}
      <Navbar />

      {/* =========================================================
          PAGE CONTENT
      ========================================================== */}
      <main className="flex-1 container mx-auto px-6 pt-10 md:pt-12 pb-24">

        <h1 className="text-3xl md:text-4xl font-bold text-[#000000] mb-6">
          {t("imprint.title")}
        </h1>

        <div className="bg-white rounded-2xl shadow p-6 md:p-10 space-y-6">

          <p>{t("imprint.legalIntro")}</p>

          {/* Media owner and service provider */}
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">{t("imprint.providerTitle")}</h2>
            <p><strong>{t("imprint.nameLabel")}:</strong> {t("imprint.nameValue")}</p>
            <p><strong>{t("imprint.businessNameLabel")}:</strong> {t("imprint.businessNameValue")}</p>
            <p><strong>{t("imprint.businessPurposeLabel")}:</strong> {t("imprint.businessPurposeValue")}</p>
            <p><strong>{t("imprint.addressLabel")}:</strong> {t("imprint.hqValue")}</p>
            <p><strong>{t("imprint.serviceAreaLabel")}:</strong> {t("imprint.serviceAreaValue")}</p>
          </section>

          {/* Contact */}
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">{t("imprint.contactTitle")}</h2>
            <p><strong>{t("imprint.phoneLabel")}:</strong> {t("imprint.phoneValue")}</p>
            <p><strong>{t("imprint.emailLabel")}:</strong> {t("imprint.emailValue")}</p>
            <p><strong>{t("imprint.grazEmailLabel")}:</strong> {t("imprint.grazEmailValue")}</p>
          </section>

          {/* Company details */}
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">{t("imprint.companyDetailsTitle")}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <h3 className="font-semibold">{t("imprint.vatTitle")}</h3>
                <p>{t("imprint.vatValue")}</p>
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold">{t("imprint.gisaTitle")}</h3>
                <p>{t("imprint.gisaValue")}</p>
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold">{t("imprint.authorityTitle")}</h3>
                <p>{t("imprint.authorityValue")}</p>
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold">{t("imprint.membershipTitle")}</h3>
                <p>{t("imprint.membershipValue")}</p>
              </div>
              <div className="space-y-1 md:col-span-2">
                <h3 className="font-semibold">{t("imprint.associationsTitle")}</h3>
                <p>{t("imprint.associationsValue")}</p>
              </div>
              <div className="space-y-1 md:col-span-2">
                <h3 className="font-semibold">{t("imprint.lawTitle")}</h3>
                <p>
                  {t("imprint.lawBeforeLink")} <a href="https://www.ris.bka.gv.at/" className="text-[#0097b2] underline">{t("imprint.lawLinkText")}</a>{t("imprint.lawAfterLink")}
                </p>
              </div>
            </div>
          </section>

          {/* Consumer dispute resolution */}
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">{t("imprint.disputeTitle")}</h2>
            <p>{t("imprint.disputeBody")}</p>
            <p>
              {t("imprint.generalInfoLabel")} <a href="https://www.verbraucherschlichtung.at/" className="text-[#0097b2] underline">{t("imprint.arbitrationLinkText")}</a>
            </p>
          </section>

          {/* Disclosure pursuant to Section 25 of the Media Act */}
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">{t("imprint.disclosureTitle")}</h2>
            <p>{t("imprint.disclosureBody")}</p>
          </section>

        </div>
      </main>

      {/* No BreadcrumbList injected: Imprint has no visible breadcrumb navigation. */}

      <Footer />

      {/* Cookie consent is centralized in `CookieConsent` (mounted in App.jsx) */}

    </div>
  );
}
