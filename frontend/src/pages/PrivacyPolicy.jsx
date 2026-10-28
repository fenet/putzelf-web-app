import { useLocation } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import {
  getLocaleFromPathname,
  getLocalizedAlternates,
  getLocalizedPath,
} from "../lib/localeRoutes";

const policySections = [
  { key: "controller", paragraphs: ["identity", "address", "phone", "email"], germanParagraphs: ["identity", "address", "phone", "email"] },
  { key: "generalPrinciples", paragraphs: ["body"], germanParagraphs: ["processing"] },
  { key: "hosting", paragraphs: ["body"], germanParagraphs: ["hosting"] },
  { key: "appointments", paragraphs: ["data", "purpose", "retention"], germanParagraphs: ["appointmentData", "appointmentPurpose", "appointmentRetention"] },
  { key: "contact", paragraphs: ["body"], germanParagraphs: ["contact"] },
  { key: "serviceDelivery", paragraphs: ["body"], germanParagraphs: ["serviceDelivery"] },
  { key: "applications", paragraphs: ["body"], germanParagraphs: ["applications"] },
  { key: "partners", paragraphs: ["body"], germanParagraphs: ["partners"] },
  { key: "cookies", paragraphs: ["necessary", "optional"], germanParagraphs: ["necessaryCookies", "optionalServices"] },
  { key: "googleAds", paragraphs: ["service", "legalBasis", "moreInfo"], germanParagraphs: ["googleAds", "googleAdsLegalBasis", "googleAdsMoreInfo"] },
  { key: "analytics", paragraphs: ["service", "legalBasis", "moreInfo"], germanParagraphs: ["googleAnalytics", "googleAnalyticsLegalBasis", "googleAnalyticsMoreInfo"] },
  { key: "leadinfo", paragraphs: ["service", "cookies", "legalBasis", "moreInfo"], germanParagraphs: ["leadinfo", "leadinfoCookies", "leadinfoLegalBasis", "leadinfoMoreInfo"] },
  { key: "maps", paragraphs: ["body"], germanParagraphs: ["maps"] },
  { key: "socialMedia", paragraphs: ["body"], germanParagraphs: ["socialLinks"] },
  { key: "recipients", paragraphs: ["body"], germanParagraphs: ["recipients"] },
  { key: "rights", paragraphs: ["body", "complaint"], germanParagraphs: ["rights", "complaint"] },
  { key: "security", paragraphs: ["body"], germanParagraphs: ["security"] },
  { key: "updates", paragraphs: ["body"], germanParagraphs: ["updates"] },
];

const policyLinks = {
  googlePrivacy: <a href="https://policies.google.com/privacy?hl=de" className="text-[#0097b2] underline" />,
  googlePartnerSites: <a href="https://policies.google.com/technologies/partner-sites?hl=de" className="text-[#0097b2] underline" />,
  leadinfoPrivacy: <a href="https://www.leadinfo.com/de/rechtliches/datenschutz/" className="text-[#0097b2] underline" />,
  leadinfoOptOut: <a href="https://www.leadinfo.com/de/rechtliches/opt-out/" className="text-[#0097b2] underline" />,
  maps: <a href="https://maps.google.com/" className="text-[#0097b2] underline" />,
  supervisoryAuthority: <a href="https://www.dsb.gv.at/" className="text-[#0097b2] underline" />,
};

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  const location = useLocation();
  const locale = getLocaleFromPathname(location.pathname);

  const seoTitle = t("privacyPolicy.seoTitle");
  const seoDescription = t("privacyPolicy.seoDescription");

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
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
              {pageTitle}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
              {t("privacyPolicy.intro")}
            </p>
          </div>

          <div className="space-y-8 px-5 py-8 md:px-10 md:py-10">
            {policySections.map(({ key, paragraphs, germanParagraphs }, index) => (
              <section key={key} className="border-b border-slate-100 pb-6 last:border-b-0 last:pb-0">
                <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
                  {index + 1}. {t(`privacyPolicy.sections.${key}.title`)}
                </h2>
                {paragraphs.map((paragraph, paragraphIndex) => {
                  const localizedParagraph = locale === "de" ? germanParagraphs[paragraphIndex] : paragraph;
                  const translationKey = locale === "de"
                    ? `privacyPolicy.exactGerman.${localizedParagraph}`
                    : `privacyPolicy.sections.${key}.${localizedParagraph}`;

                  return (
                    <p key={localizedParagraph} className="mt-3 text-base leading-7 text-slate-700">
                      <Trans i18nKey={translationKey} components={policyLinks} />
                    </p>
                  );
                })}
              </section>
            ))}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
