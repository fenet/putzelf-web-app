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
import {
  getLocalizedAlternates,
  getLocalizedPath,
  getLocaleFromPathname,
} from "../lib/localeRoutes";

export default function Imprint() {
  const { t } = useTranslation();
  const location = useLocation();

  const locale = getLocaleFromPathname(location.pathname);

  const [showBanner, setShowBanner] = useState(false);

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

    const storedConsent = localStorage.getItem("cookieConsent");
    const storedTime = localStorage.getItem("cookieConsentTime");

    if (!storedConsent || !storedTime) {
      setShowBanner(true);
      return;
    }

    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (now - parseInt(storedTime, 10) > oneDay) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    localStorage.setItem(
      "cookieConsentTime",
      Date.now().toString()
    );

    setShowBanner(false);

    window.dispatchEvent(
      new CustomEvent("consentChanged", {
        detail: { consent: true },
      })
    );
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "false");
    localStorage.setItem(
      "cookieConsentTime",
      Date.now().toString()
    );

    setShowBanner(false);

    window.dispatchEvent(
      new CustomEvent("consentChanged", {
        detail: { consent: false },
      })
    );
  };

  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0 bg-gray-50">

      {/* =========================================================
          SEO
      ========================================================== */}
      <Seo
        title="Impressum"
        description="Impressum und Kontaktinformationen von PutzELF (Wien)."
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

          {/* Company */}
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">
              {t("imprint.companyNameTitle")}
            </h2>

            <p>
              {t("imprint.companyNameLine1")}
            </p>

            <p>
              {t("imprint.companyNameLine2")}
            </p>
          </section>

          {/* Founder */}
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">
              {t("imprint.founderTitle")}
            </h2>

            <p>
              {t("imprint.founderName")}
            </p>
          </section>

          {/* Purpose */}
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">
              {t("imprint.purposeTitle")}
            </h2>

            <p>
              {t("imprint.purposeBody")}
            </p>
          </section>

          {/* Company details */}
          <section className="grid md:grid-cols-2 gap-6">

            <div className="space-y-1">
              <h3 className="font-semibold">
                {t("imprint.vatTitle")}
              </h3>

              <p>
                {t("imprint.vatValue")}
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="font-semibold">
                {t("imprint.regNoTitle")}
              </h3>

              <p>
                {t("imprint.regNoValue")}
              </p>
            </div>

            <div className="space-y-1 md:col-span-2">
              <h3 className="font-semibold">
                {t("imprint.courtTitle")}
              </h3>

              <p>
                {t("imprint.courtValue")}
              </p>
            </div>

            <div className="space-y-1 md:col-span-2">
              <h3 className="font-semibold">
                {t("imprint.hqTitle")}
              </h3>

              <p>
                {t("imprint.hqValue")}
              </p>
            </div>

          </section>

          {/* Contact */}
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">
              {t("imprint.contactTitle")}
            </h2>

            <p>
              {t("imprint.phoneLabel")}:{" "}
              {t("imprint.phoneValue")}
            </p>

            <p>
              {t("imprint.emailLabel")}:{" "}
              {t("imprint.emailValue")}
            </p>
          </section>

          {/* Membership */}
          <section className="space-y-2">
            <p>
              {t("imprint.membership")}
            </p>
          </section>

        </div>
      </main>

      {/* No BreadcrumbList injected: Imprint has no visible breadcrumb navigation. */}

      {/* =========================================================
          FOOTER
      ========================================================== */}
      <footer className="bg-white text-gray-700 mt-auto border-t border-gray-200">

        <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* =====================================================
              STAFF
          ====================================================== */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">
              {t("footer.staff.title")}
            </h4>

            <ul className="space-y-2 text-sm">

              <li>
                <a
                  href="/files/Datenschutzblat.pdf"
                  download
                  className="hover:text-gray-900 transition-colors"
                >
                  {t("footer.staff.links.privacySheet")}
                </a>
              </li>

              <li>
                <a
                  href="/files/Dienstliste.pdf"
                  download
                  className="hover:text-gray-900 transition-colors"
                >
                  {t("footer.staff.links.dutyRoster")}
                </a>
              </li>

              <li>
                <a
                  href="/files/Stammdatenblatt.pdf"
                  download
                  className="hover:text-gray-900 transition-colors"
                >
                  {t("footer.staff.links.masterData")}
                </a>
              </li>

              <li>
                <a
                  href="/files/Urlaubsschein_Zeitausgleich.pdf"
                  download
                  className="hover:text-gray-900 transition-colors"
                >
                  {t("footer.staff.links.leaveForm")}
                </a>
              </li>

            </ul>
          </div>

          {/* =====================================================
              PARTNERS
          ====================================================== */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">
              {t("footer.partners.title")}
            </h4>

            <ul className="space-y-2 text-sm">

              <li>
                <a
                  href="/files/Partnerantrag.pdf"
                  download
                  className="hover:text-gray-900 transition-colors"
                >
                  {t("footer.partners.links.partnerApplication")}
                </a>
              </li>

              <li>
                <a
                  href="/files/Dienstleistungsvertrag.pdf"
                  download
                  className="hover:text-gray-900 transition-colors"
                >
                  {t("footer.partners.links.serviceContract")}
                </a>
              </li>

              <li>
                <a
                  href="/files/Subvertrag.pdf"
                  download
                  className="hover:text-gray-900 transition-colors"
                >
                  {t("footer.partners.links.subcontract")}
                </a>
              </li>

            </ul>
          </div>

          {/* =====================================================
              CUSTOMERS
          ====================================================== */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">
              {t("footer.customers.title")}
            </h4>

            <ul className="space-y-2 text-sm">

              <li>
                <a
                  href="/files/Dienstleistungsvertrag1.pdf"
                  download
                  className="hover:text-gray-900 transition-colors"
                >
                  {t("footer.customers.links.cleaningStandards")}
                </a>
              </li>

              <li>
                <a
                  href="/files/Pricelist.pdf"
                  download
                  className="hover:text-gray-900 transition-colors"
                >
                  {t("footer.customers.links.priceList")}
                </a>
              </li>

              <li>
                <a
                  href="/files/Contract.pdf"
                  download
                  className="hover:text-gray-900 transition-colors"
                >
                  {t("footer.customers.links.serviceContract")}
                </a>
              </li>

            </ul>
          </div>

          {/* =====================================================
              CONNECT
          ====================================================== */}
          <div>

            <h4 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">
              {t("footer.connect.title")}
            </h4>

            {/* Social media */}
            <div className="flex space-x-4 mb-6">

              <a
                href="https://www.instagram.com/putzelf11/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61580613673114"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>

              <a
                href="https://www.linkedin.com/in/putz-elf-wien1110/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>

            </div>

            <div className="flex flex-col space-y-2 text-sm">

              <ul className="space-y-2 text-sm">

                <li>
                  <a
                    href="/files/Allgemeine_Geschäftsbedingungen_ Neu.pdf"
                    download
                    className="hover:text-gray-900 transition-colors"
                  >
                    {t("footer.connect.links.terms")}
                  </a>
                </li>

                <li>
                  <a
                    href="/files/Datenschutzbestimmungen.pdf"
                    download
                    className="hover:text-gray-900 transition-colors"
                  >
                    {t("footer.connect.links.privacy")}
                  </a>
                </li>

              </ul>

              <Link
                to={getLocalizedPath(locale, "imprint")}
                className="hover:text-gray-900 transition-colors"
              >
                {t("footer.connect.links.imprint")}
              </Link>

            </div>

          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Putzelf — Alle Rechte vorbehalten.
        </div>

      </footer>

      {/* =========================================================
          COOKIE BANNER
      ========================================================== */}
      {showBanner && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md text-center space-y-4">

            <p className="text-gray-700">

              {t("cookies.msg")}

              <Link
                to={getLocalizedPath(locale, "privacy")}
                className="underline text-[#5be3e3]"
              >
                {t("cookies.privacyPolicy")}
              </Link>

              .
            </p>

            <div className="flex justify-center gap-4">

              {/* Decline */}
              <button
                onClick={() => {
                  declineCookies();

                  trackEvent(
                    "Cookie_Decline_Click",
                    {
                      consent: false,
                      source: "banner",
                    }
                  );
                }}
                className="bg-gray-300 text-black px-6 py-2 rounded-md font-semibold hover:opacity-90 transition"
              >
                {t("cookies.decline")}
              </button>

              {/* Accept */}
              <button
                onClick={() => {
                  acceptCookies();

                  trackEvent(
                    "Cookie_Accept_Click",
                    {
                      consent: true,
                      source: "banner",
                    }
                  );
                }}
                className="bg-[#5be3e3] text-black px-6 py-2 rounded-md font-semibold hover:opacity-90 transition"
              >
                {t("cookies.accept")}
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}