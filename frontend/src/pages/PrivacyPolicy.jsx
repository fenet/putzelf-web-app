import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import {
  getLocaleFromPathname,
  getLocalizedAlternates,
  getLocalizedPath,
} from "../lib/localeRoutes";

const policySections = [
  { key: "overview" },
  { key: "data" },
  { key: "purposes" },
  { key: "tracking" },
  { key: "retention" },
  { key: "rights" },
  { key: "contact" },
  { key: "disclaimer" },
];

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);

  const seoTitle = locale === "de" ? "Datenschutzerklärung – PutzELF" : "Privacy Policy – PutzELF";
  const seoDescription = locale === "de"
    ? "Datenschutzerklärung der PutzELF Website: Hinweise zu Cookies, personenbezogenen Daten, Tracking und Ihren Rechten."
    : "PutzELF privacy notice explaining cookies, personal data handling, tracking and your rights.";

  const pageTitle = t("privacyPolicy.title");

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      <Seo
        title={seoTitle}
        description={seoDescription}
        path={getLocalizedPath(locale, "privacy")}
        lang={locale}
        alternates={getLocalizedAlternates(location.pathname)}
        xDefaultPath={getLocalizedPath("de", "privacy")}
      />

      <Navbar />

      <main className="mx-auto w-full max-w-5xl px-4 pb-16 pt-8 md:px-6 md:pt-12">
        <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-gradient-to-r from-[#eaf9fb] via-white to-[#f5fbfd] px-5 py-8 md:px-10 md:py-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0097b2]">
              {t("privacyPolicy.lastUpdated", { defaultValue: "Stand" })} — 27.08.2026
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
              {pageTitle}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
              {t("privacyPolicy.intro")}
            </p>
          </div>

          <div className="space-y-8 px-5 py-8 md:px-10 md:py-10">
            {policySections.map(({ key }, index) => (
              <section key={key} className="border-b border-slate-100 pb-6 last:border-b-0 last:pb-0">
                <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
                  {index + 1}. {t(`privacyPolicy.sections.${key}.title`)}
                </h2>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  {t(`privacyPolicy.sections.${key}.body`)}
                </p>
              </section>
            ))}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
